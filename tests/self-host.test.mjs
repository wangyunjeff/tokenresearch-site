import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createApplication } from '../server/self-host.mjs';
import { localD1 } from '../scripts/local-d1.mjs';
import { readCatalog } from '../server/catalog.js';

test('self-hosted server protects administration and persists the catalog', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'research-server-test-'));
  const databasePath = join(directory, 'catalog.sqlite');
  const password = 'test-only-administrator-password';
  const server = createApplication({ databasePath, adminUser: 'owner', adminPassword: password });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const authorization = 'Basic ' + Buffer.from('owner:' + password).toString('base64');
  try {
    let response = await fetch(origin + '/');
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<div id="root"><\/div>/);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const script = html.match(/src="([^"]+\.js)"/)[1];
    response = await fetch(origin + script);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /javascript/);
    assert.match(response.headers.get('cache-control'), /immutable/);
    assert.ok((await response.text()).length > 10000);
    response = await fetch(origin + '/assets/observatory.webp');
    assert.equal(response.status, 200);
    const photo = Buffer.from(await response.arrayBuffer());
    assert.equal(photo.toString('ascii', 0, 4), 'RIFF');
    response = await fetch(origin + '/downloads/codex-config.zip');
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-disposition'), /attachment/);
    assert.equal((await fetch(origin + '/.env')).status, 404);
    assert.equal((await fetch(origin + '/healthz')).status, 200);

    response = await fetch(origin + '/api/admin/catalog', {
      headers: {
        'oai-authenticated-user-id': 'attacker',
        'oai-authenticated-user-email': 'admin@self-host.invalid',
      },
    });
    assert.equal(response.status, 401);
    response = await fetch(origin + '/api/session', {
      headers: {
        'oai-authenticated-user-id': 'attacker',
        'oai-authenticated-user-email': 'admin@self-host.invalid',
      },
    });
    assert.deepEqual(await response.json(), { isAdmin: false, signedIn: false });
    assert.equal((await fetch(origin + '/admin', { redirect: 'manual' })).status, 401);
    response = await fetch(origin + '/admin', { headers: { authorization }, redirect: 'manual' });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), '/legacy.html#/admin');

    response = await fetch(origin + '/api/admin/catalog', { headers: { authorization } });
    assert.equal(response.status, 200);
    const snapshot = await response.json();
    const next = structuredClone(snapshot.data);
    next.groups.push({
      id: 'self-host-qa',
      name: 'QA group',
      multiplier: 1.5,
      description: 'Persistence check',
      enabled: true,
      modelIds: [next.models[0].id],
    });
    const body = JSON.stringify({ revision: snapshot.revision, data: next });
    response = await fetch(origin + '/api/admin/catalog', {
      method: 'PUT',
      headers: {
        authorization,
        'content-type': 'application/json',
        origin: 'https://different.example',
      },
      body,
    });
    assert.equal(response.status, 403);
    response = await fetch(origin + '/api/admin/catalog', {
      method: 'PUT',
      headers: { authorization, 'content-type': 'application/json', origin },
      body,
    });
    assert.equal(response.status, 200);
    const saved = await response.json();
    assert.equal(saved.revision, 1);
    response = await fetch(origin + '/api/admin/catalog', {
      method: 'PUT',
      headers: { authorization, 'content-type': 'application/json', origin },
      body,
    });
    assert.equal(response.status, 409);
    response = await fetch(origin + '/api/catalog');
    const visible = await response.json();
    assert.equal(visible.data.groups.find((g) => g.id === 'self-host-qa').multiplier, 1.5);
    assert.equal(visible.data.divisor, 35);
    assert.ok((await readFile(databasePath)).byteLength > 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
  try {
    const reopened = localD1(databasePath);
    const persisted = await readCatalog(reopened);
    assert.equal(persisted.revision, 1);
    assert.equal(persisted.data.groups.find((g) => g.id === 'self-host-qa').multiplier, 1.5);
    reopened.close();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
