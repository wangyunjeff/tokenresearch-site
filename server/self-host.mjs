import { createServer } from 'node:http';
import { createHash, timingSafeEqual } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { localD1 } from '../scripts/local-d1.mjs';
import { handleAPI } from './catalog.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.zip': 'application/zip',
  '.md': 'text/markdown; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.toml': 'text/plain; charset=utf-8',
};
const digest = (value) => createHash('sha256').update(value).digest();
const equal = (a, b) => timingSafeEqual(digest(a), digest(b));
const challenge = { 'WWW-Authenticate': 'Basic realm="Research administration", charset="UTF-8"' };
const MAX_BODY = 1_000_000;

export function createApplication(options = {}) {
  const publicDir = resolve(options.publicDir || resolve(projectRoot, 'dist/client'));
  const database = localD1(
    options.databasePath ||
      resolve(process.env.DATA_DIR || resolve(projectRoot, 'data'), 'catalog.sqlite'),
  );
  const adminUser = options.adminUser ?? process.env.ADMIN_USER ?? 'admin';
  const adminPassword = options.adminPassword ?? process.env.ADMIN_PASSWORD ?? '';
  const publicOrigin = options.publicOrigin ?? process.env.PUBLIC_ORIGIN ?? '';
  if (adminPassword && adminPassword.length < 16)
    throw new Error('ADMIN_PASSWORD must contain at least 16 characters.');
  if (publicOrigin) {
    const u = new URL(publicOrigin);
    if (!['http:', 'https:'].includes(u.protocol) || u.origin !== publicOrigin)
      throw new Error('PUBLIC_ORIGIN must be an HTTP(S) origin without a trailing slash.');
  }

  function authenticated(req) {
    if (!adminPassword) return false;
    const value = req.headers.authorization;
    if (!value?.startsWith('Basic ')) return false;
    const decoded = Buffer.from(value.slice(6), 'base64').toString('utf8');
    const colon = decoded.indexOf(':');
    return (
      colon >= 0 &&
      equal(decoded.slice(0, colon), adminUser) &&
      equal(decoded.slice(colon + 1), adminPassword)
    );
  }
  function sendJSON(res, status, value, headers = {}) {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    });
    res.end(JSON.stringify(value));
  }

  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    try {
      const url = new URL(
        req.url || '/',
        publicOrigin || `http://${req.headers.host || 'localhost'}`,
      );
      const admin = authenticated(req);
      if (url.pathname === '/healthz') {
        sendJSON(res, 200, { status: 'ok' });
        return;
      }
      if (url.pathname === '/admin') {
        if (!adminPassword) {
          sendJSON(res, 503, { error: '请在服务器 .env 中设置 ADMIN_PASSWORD 后重启服务。' });
          return;
        }
        if (!admin) {
          sendJSON(res, 401, { error: '请输入管理员账号和密码。' }, challenge);
          return;
        }
        res.writeHead(302, { Location: '/legacy.html#/admin', 'Cache-Control': 'no-store' });
        res.end();
        return;
      }
      if (url.pathname.startsWith('/api/')) {
        if (url.pathname.startsWith('/api/admin/') && !admin) {
          sendJSON(
            res,
            401,
            {
              error: adminPassword
                ? '请先登录管理后台。'
                : '请在服务器设置 ADMIN_PASSWORD 后启用模型管理。',
            },
            adminPassword ? challenge : {},
          );
          return;
        }
        if (Number(req.headers['content-length']) > MAX_BODY) {
          sendJSON(res, 413, { error: '目录数据过大' });
          req.resume();
          return;
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
          // Only the server may attach an administrator identity.
          if (
            value &&
            !key.startsWith('oai-authenticated-user-') &&
            ![
              'authorization',
              'host',
              'connection',
              'content-length',
              'transfer-encoding',
            ].includes(key)
          )
            headers.set(key, Array.isArray(value) ? value.join(',') : value);
        }
        if (admin) {
          headers.set('oai-authenticated-user-id', 'self-host-owner');
          headers.set('oai-authenticated-user-email', 'admin@self-host.invalid');
        }
        const chunks = [];
        let length = 0;
        for await (const chunk of req) {
          length += chunk.length;
          if (length > MAX_BODY) {
            sendJSON(res, 413, { error: '目录数据过大' });
            return;
          }
          chunks.push(chunk);
        }
        const method = req.method || 'GET';
        const request = new Request(url, {
          method,
          headers,
          body: ['GET', 'HEAD'].includes(method) ? undefined : Buffer.concat(chunks),
        });
        const response = await handleAPI(request, {
          DB: database,
          ADMIN_EMAIL: 'admin@self-host.invalid',
        });
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer()));
        return;
      }
      if (!['GET', 'HEAD'].includes(req.method || '')) {
        sendJSON(res, 405, { error: 'Method not allowed' }, { Allow: 'GET, HEAD' });
        return;
      }
      let pathname;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        sendJSON(res, 400, { error: 'Invalid path' });
        return;
      }
      const file = resolve(publicDir, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(publicDir + sep)) {
        sendJSON(res, 404, { error: 'Not found' });
        return;
      }
      const metadata = await stat(file).catch(() => null);
      if (!metadata?.isFile()) {
        sendJSON(res, 404, { error: 'Not found' });
        return;
      }
      const extension = extname(file),
        type = contentTypes[extension] || 'application/octet-stream';
      const compressed =
        /gzip/.test(req.headers['accept-encoding'] || '') &&
        metadata.size > 512 &&
        /^(text\/|application\/json|image\/svg)/.test(type);
      const hashed = /\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\./.test(pathname);
      res.setHeader('Content-Type', type);
      res.setHeader(
        'Cache-Control',
        hashed
          ? 'public, max-age=31536000, immutable'
          : ['.html', '.js', '.css'].includes(extension)
            ? 'no-cache'
            : 'public, max-age=3600',
      );
      res.setHeader('Vary', 'Accept-Encoding');
      if (pathname.startsWith('/downloads/'))
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${file.split(sep).pop().replaceAll('"', '')}"`,
        );
      if (compressed) res.setHeader('Content-Encoding', 'gzip');
      else res.setHeader('Content-Length', metadata.size);
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      if (compressed) await pipeline(createReadStream(file), createGzip(), res);
      else await pipeline(createReadStream(file), res);
    } catch (error) {
      if (error.code === 'ERR_STREAM_PREMATURE_CLOSE') return;
      console.error('Request failed:', error.message);
      if (!res.headersSent) sendJSON(res, 500, { error: '服务暂时无法完成请求。' });
      else res.destroy();
    }
  });
  server.on('close', () => database.close());
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000),
    host = process.env.HOST || '0.0.0.0';
  const server = createApplication();
  server.listen(port, host, () => console.log(`Research website listening on ${host}:${port}`));
  const shutdown = () => server.close(() => process.exit(0));
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}
