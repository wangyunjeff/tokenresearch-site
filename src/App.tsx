import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './styles/tutorial.css';
import './styles/portal.css';
import './styles/tutorial-refinement.css';
const Models = lazy(() => import('./portal/Models'));
const Docs = lazy(() => import('./portal/Docs'));
const Gallery = lazy(() => import('./portal/Gallery'));
const Skills = lazy(() => import('./portal/Gallery').then((m) => ({ default: m.Skills })));
import { GALLERY_OPEN } from './portal/availability';
import ResearchApp, { ProductEntries, RELAY_URL } from './portal/Products';
const Admin = lazy(() => import('./portal/Admin'));

import LandingSections, { MatrixReport } from './components/LandingSections';
import { motion, useScroll, useTransform, useReducedMotion, MotionConfig } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Workspace, Paper, Plot, CloseButton } from './components/ResearchUI';

type Preview =
  | 'workspace'
  | 'document'
  | 'paper'
  | 'figure'
  | 'academic'
  | 'consulting'
  | 'policy'
  | 'finance'
  | 'engineering'
  | 'market'
  | null;
function PreviewModal({
  kind,
  onClose,
  onDocument,
  onFigure,
}: {
  kind: Preview;
  onClose: () => void;
  onDocument: () => void;
  onFigure: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (kind) {
      if (!el.open) el.showModal();
      document.body.style.overflow = 'hidden';
    } else if (el.open) {
      el.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [kind]);
  return (
    <dialog
      ref={ref}
      className={'preview-modal ' + (kind === 'workspace' ? 'wide' : 'document-modal')}
      aria-label={
        kind === 'workspace' ? 'Interactive research workspace' : 'Research document preview'
      }
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-top">
        <span>
          {kind === 'workspace' ? '研究工作台 · 交互演示' : 'Research notes · document preview'}
        </span>
        <CloseButton onClick={onClose} />
      </div>
      {kind === 'workspace' ? (
        <Workspace onOpen={onDocument} onFigure={onFigure} />
      ) : kind ? (
        <div className="modal-paper">
          {kind === 'figure' || kind === 'finance' ? (
            <div className="modal-figure">
              <h2>
                {kind === 'finance'
                  ? 'Comparing the underlying signals'
                  : 'Transport analysis · Figure 02'}
              </h2>
              <Plot revised mode={kind === 'finance' ? 'signals' : 'transport'} />
            </div>
          ) : ['consulting', 'policy', 'engineering', 'market'].includes(kind) ? (
            <MatrixReport
              kind={
                kind === 'consulting' ? 'strategy' : (kind as 'policy' | 'engineering' | 'market')
              }
            />
          ) : (
            <Paper type={kind === 'paper' ? 'paper' : kind === 'academic' ? 'review' : 'report'} />
          )}
          <p>
            Illustrative document. The chart and research examples are created for this interface
            preview.
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
function Hero({ open, paused }: { open: (kind: Preview) => void; paused: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotateZ = useTransform(scrollYProgress, [0, 0.7], [-9, -3]);
  const rotateY = useTransform(scrollYProgress, [0, 0.7], [0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 115]);
  return (
    <section className="hero" ref={ref}>
      <div className="hero-copy page-width">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          少一点工具的摩擦，多一点研究的自由。
          <br />
          从第一个问题，到你的下一次发现。
        </motion.h1>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <a className="button light" href={RELAY_URL} target="_blank" rel="noreferrer">
            进入 API 中转站 <ArrowUpRight size={15} />
          </a>
          <a className="button quiet" href="#/app">
            网页 App · 开发中 <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
      <div className="hero-scene">
        <div className="hero-halo" />
        <motion.div
          className="hero-stage"
          style={reduced || paused ? { rotateZ: -9, rotateY: 0 } : { rotateZ, rotateY, y }}
          initial={{ opacity: 0, translateY: 90 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Workspace
            onOpen={() => open('document')}
            onFigure={() => open('figure')}
            onExpand={() => open('workspace')}
            paused={paused}
          />
        </motion.div>
        <div className="hero-fade" />
      </div>
    </section>
  );
}
export default function App() {
  const [preview, setPreview] = useState<Preview>(null),
    [paused, setPaused] = useState(false);
  const [route, setRoute] = useState(() =>
    location.hash.startsWith('#/') ? location.hash.slice(2) : '',
  );
  const [page, subpage] = route.split('/');
  const isPortal = ['models', 'docs', 'gallery', 'skills', 'admin', 'app'].includes(page);
  useEffect(() => {
    function navigate() {
      const next = location.hash.startsWith('#/') ? location.hash.slice(2) : '';
      if (
        next &&
        !['models', 'docs', 'gallery', 'skills', 'admin', 'app'].includes(next.split('/')[0])
      ) {
        location.replace('/legacy.html' + location.hash);
        return;
      }
      setRoute(next);
      setPreview(null);
      if (location.hash.startsWith('#/') || location.hash === '#top')
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    document.title =
      ({
        models: '模型广场',
        docs: '文档',
        gallery: GALLERY_OPEN ? '科研展柜' : '科研展柜 · 筹备中',
        skills: '科研 Skills',
        admin: '模型管理',
        app: '网页 App · 开发中',
      }[page] || '让研究向前一步') + ' · 词元智研';
  }, [page]);
  return (
    <MotionConfig reducedMotion={paused ? 'always' : 'user'}>
      <div className={'site ' + (paused ? 'motion-paused' : '')}>
        <a
          className="skip-link"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector<HTMLElement>('main')?.focus();
          }}
        >
          跳到主要内容
        </a>
        <header className={'site-header ' + (isPortal ? 'portal-header' : '')}>
          <div className="header-inner page-width">
            <a className="wordmark" href="#top" aria-label="词元智研首页">
              词元智研
            </a>
            <nav className="portal-navigation" aria-label="页面导航">
              {[
                ['', '首页'],
                ['models', '模型广场'],
                ['docs', '文档'],
                ['gallery', '科研展柜'],
              ].map(([key, label]) => (
                <a
                  key={key}
                  href={key ? '#/' + key : '#top'}
                  className={key === page || (!key && !isPortal) ? 'active' : ''}
                  aria-current={key === page ? 'page' : undefined}
                >
                  {label}
                  {key === 'gallery' && !GALLERY_OPEN && (
                    <small className="nav-coming-badge">筹备中</small>
                  )}
                </a>
              ))}
            </nav>
            <nav aria-label="Main navigation">
              <a className="button outline" href={RELAY_URL} target="_blank" rel="noreferrer">
                API 中转站 ↗
              </a>
              <a className="button outline app-nav" href="#/app">
                网页 App <small>开发中</small>
              </a>
            </nav>
          </div>
        </header>
        <main id="top" tabIndex={-1}>
          {isPortal ? (
            <Suspense fallback={<div className="portal-page p-loading">正在打开页面…</div>}>
              {page === 'models' ? (
                <Models />
              ) : page === 'docs' ? (
                <Docs id={subpage || 'overview'} key={subpage || 'overview'} />
              ) : page === 'gallery' ? (
                <Gallery id={subpage} key={subpage || 'gallery'} />
              ) : page === 'skills' ? (
                <Skills id={subpage} key={subpage || 'skills'} />
              ) : page === 'app' ? (
                <ResearchApp />
              ) : (
                <Admin />
              )}
            </Suspense>
          ) : (
            <>
              <Hero open={setPreview} paused={paused} />
              <ProductEntries />
              <LandingSections
                paused={paused}
                toggleMotion={() => setPaused(!paused)}
                openDocument={(kind) => setPreview((kind || 'document') as Preview)}
                openWorkspace={() => setPreview('workspace')}
              />
            </>
          )}
        </main>
        {isPortal && (
          <footer className="portal-footer">
            <a href="#top">词元智研</a>
            <nav>
              <a href="#/models">模型广场</a>
              <a href="#/docs">文档</a>
              <a href="#/gallery">
                科研展柜{!GALLERY_OPEN && <small className="nav-coming-badge">筹备中</small>}
              </a>
              <a href="#/skills">Skills</a>
            </nav>
            <span>把注意力，留给研究。</span>
            <a href="#/admin">管理</a>
          </footer>
        )}
        <PreviewModal
          kind={preview}
          onClose={() => setPreview(null)}
          onDocument={() => setPreview('document')}
          onFigure={() => setPreview('figure')}
        />
      </div>
    </MotionConfig>
  );
}
