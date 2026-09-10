import { GALLERY_OPEN } from '../portal/availability';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  Pause,
  Play,
  Sparkles,
  Check,
  FileText,
  Search,
  Terminal,
  ChevronRight,
  Globe2,
  Braces,
} from 'lucide-react';
import {
  SmallConversation,
  TraceCard,
  PhoneDemo,
  BrowserDemo,
  LatexDemo,
  FigureDemo,
  GpuDemo,
  Paper,
  Plot,
  FileCard,
  WindowDots,
  AgentMark,
} from './ResearchUI';

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
const universities = [
  ['mit', 'MIT'],
  ['stanford', 'Stanford'],
  ['tsinghua', 'Tsinghua'],
  ['harvard', 'Harvard'],
  ['princeton', 'Princeton'],
  ['eth-zurich', 'ETH Zürich'],
  ['u-tokyo', 'The University of Tokyo'],
  ['caltech', 'Caltech'],
  ['berkeley', 'Berkeley'],
  ['yale', 'Yale'],
];
function Community() {
  return (
    <section className="community page-width" aria-label="Research community">
      <Reveal>
        <h2>Across the research community.</h2>
      </Reveal>
      <div className="logo-window">
        <div className="logo-track">
          {[0, 1].map((copy) => (
            <div className="logo-group" key={copy} aria-hidden={copy === 1}>
              {universities.map(([file, name]) => (
                <img
                  key={file}
                  src={'/brand-logos/' + file + '.svg'}
                  alt={name}
                  loading="lazy"
                  width="130"
                  height="32"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities({ paused }: { paused: boolean }) {
  const reduced = useReducedMotion();
  return (
    <section className="capabilities page-width" id="features">
      <Reveal>
        <h2 className="section-heading">Keep your research moving.</h2>
      </Reveal>
      <div className="capability-grid">
        <Reveal className="capability-card" delay={0.04}>
          <div className="capability-copy">
            <h3>One task. A connected workflow.</h3>
            <p>
              Bring papers, code and analysis into the same conversation. Follow the work from
              question to result.
            </p>
          </div>
          <div className="capability-visual blue">
            <div className="mini-task-window">
              <div className="mini-window-bar">
                <WindowDots />
                <span>Research workspace</span>
                <Sparkles size={11} />
              </div>
              <SmallConversation />
              <div className="mini-context">
                <Check size={12} />
                <span>Sources and results stay together</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="capability-card" delay={0.12}>
          <div className="capability-copy">
            <h3>See how the work gets done.</h3>
            <p>
              Inspect each step, revisit the evidence, and pick up the thread exactly where you left
              it.
            </p>
          </div>
          <div className="capability-visual ochre">
            <div className="mini-trace-window">
              <div className="mini-window-bar">
                <WindowDots />
                <span>Activity</span>
                <span>↗</span>
              </div>
              <TraceCard playing={!paused && !reduced} />
            </div>
          </div>
        </Reveal>
        <Reveal className="capability-card" delay={0.2}>
          <div className="capability-copy">
            <h3>Your workspace goes with you.</h3>
            <p>
              Let a long run continue in the cloud. Review progress and return to your research from
              any device.
            </p>
          </div>
          <div className="capability-visual green">
            <PhoneDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const modelOptions = [
  {
    name: 'GPT-6 Astra',
    provider: 'OpenAI',
    icon: 'openai',
    description: 'Explore a question, reason through the evidence, and work across research files.',
  },
  {
    name: 'Claude Opus 5',
    provider: 'Anthropic',
    icon: 'anthropic',
    description: 'Read closely, work through difficult code, and develop an argument in detail.',
  },
  {
    name: 'Claude Fable 5.1',
    provider: 'Anthropic',
    icon: 'anthropic',
    description: 'Move comfortably between literature, analysis and scientific writing.',
  },
];
function Models() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="models-section page-width" id="models">
      <Reveal>
        <h2 className="section-heading">Choose the intelligence behind your work.</h2>
        <p className="section-description">
          A familiar research environment, with a choice of models. <br />
          Move between ideas, analysis and writing without rebuilding your workspace.
        </p>
      </Reveal>
      <Reveal className="model-options">
        {modelOptions.map((model, i) => (
          <button
            className={'model-option ' + (selected === i ? 'selected' : '')}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            key={model.name}
          >
            {model.icon === 'openai' ? (
              <span className="model-symbol openai-symbol">
                <Sparkles size={27} />
              </span>
            ) : (
              <span className="model-symbol anthropic-symbol" aria-hidden="true">
                ✳
              </span>
            )}
            <span>
              <strong>{model.name}</strong>
              <small>{model.provider}</small>
            </span>
            {selected === i && (
              <span className="model-check">
                <Check size={11} />
              </span>
            )}
          </button>
        ))}
      </Reveal>
      <p className="model-description" aria-live="polite">
        {modelOptions[selected].description}
      </p>
    </section>
  );
}

const activityRows = [
  ['Read the research question', '00:02'],
  ['Search the literature', '00:08'],
  ['Review abstracts and methods', '00:24'],
  ['Open supplementary information', '00:42'],
  ['Build an evidence table', '01:16'],
  ['Inspect the dataset', '01:42'],
  ['Compare measurement conditions', '02:08'],
  ['Run the analysis script', '03:14'],
  ['Check the baseline results', '04:02'],
  ['Generate comparison figures', '04:36'],
  ['Write the research notes', '05:10'],
  ['Link sources and project files', '05:38'],
];
function Workflow({ openDocument }: { openDocument: (kind?: string) => void }) {
  return (
    <section className="workflow page-width" id="workflow">
      <Reveal>
        <h2 className="section-heading">A question becomes a body of work.</h2>
        <p className="section-description">
          Start with what you want to understand. <br />
          Keep the reasoning, the process and the result in one place.
        </p>
      </Reveal>
      <div className="timeline">
        <Reveal className="timeline-entry">
          <div className="timeline-label">
            <span className="timeline-dot" />
            <small>01</small>
            <h3>Set the direction.</h3>
            <p>
              Your question. <br />
              Your research context.
            </p>
          </div>
          <div className="timeline-content">
            <div className="timeline-prompt">
              Compare recent solid electrolyte studies. Map the experimental methods and identify a
              useful next experiment.<span>↵</span>
            </div>
            <div className="timeline-attachment">
              <FileText size={12} /> project_brief.md <small>Added to context</small>
            </div>
          </div>
        </Reveal>
        <Reveal className="timeline-entry">
          <div className="timeline-label">
            <span className="timeline-dot" />
            <small>02</small>
            <h3>Follow the process.</h3>
            <p>
              Every step stays visible. <br />
              Change direction as you go.
            </p>
          </div>
          <div className="timeline-content timeline-activity">
            <div className="activity-header">
              <AgentMark />
              <span>Working through the evidence</span>
              <span className="work-dot" />
            </div>
            <div className="activity-mask">
              <div className="activity-track">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1}>
                    {activityRows.map(([label, time], i) => (
                      <div className="activity-row" key={label}>
                        {i % 3 === 0 ? (
                          <Search size={12} />
                        ) : i % 3 === 1 ? (
                          <Globe2 size={12} />
                        ) : (
                          <Terminal size={12} />
                        )}
                        <span>{label}</span>
                        <small>{time}</small>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="activity-status">
              <span>Evidence → analysis → writing</span>
              <i />
            </div>
          </div>
        </Reveal>
        <Reveal className="timeline-entry last">
          <div className="timeline-label">
            <span className="timeline-dot" />
            <small>03</small>
            <h3>Take the work forward.</h3>
            <p>
              Open the files. <br />
              Build on the result.
            </p>
          </div>
          <div className="timeline-content">
            <FileCard onOpen={() => openDocument()} />
            <div className="timeline-result">
              <Check size={12} /> Notes, figures and editable source files
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Showcase({
  title,
  body,
  color,
  reverse = false,
  children,
  id,
  action,
}: {
  title: ReactNode;
  body: string;
  color: string;
  reverse?: boolean;
  children: ReactNode;
  id: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className={'showcase ' + (reverse ? 'reverse' : '')}>
      <section id={id} className="showcase-inner">
        <div className="showcase-copy">
          <h2>{title}</h2>
          <p>{body}</p>
          {action}
        </div>
        <div className={'showcase-visual ' + color}>{children}</div>
      </section>
    </Reveal>
  );
}
function Workspaces({ paused }: { paused: boolean }) {
  return (
    <div className="showcases page-width">
      <Showcase
        id="research-browser"
        color="blue"
        title={
          <>
            Research with <br />
            the sources in view.
          </>
        }
        body="Open papers, follow references and compare what matters. The browser works alongside your research, keeping the evidence close to the conversation."
      >
        <BrowserDemo />
      </Showcase>
      <Showcase
        id="latex"
        reverse
        color="ochre"
        title={
          <>
            From an idea <br />
            to a working paper.
          </>
        }
        body="Write in LaTeX with the source and the page side by side. Shape the argument, check the references and see each revision take form."
      >
        <LatexDemo />
      </Showcase>
      <Showcase
        id="figures"
        color="rose"
        title={
          <>
            Make the figure <br />
            say what you mean.
          </>
        }
        body="Point to the change you want. Adjust the legend, refine the layout and keep an editable source for every version."
        action={
          <span className="demo-hint">
            Try applying a revision <ArrowRight size={13} />
          </span>
        }
      >
        <FigureDemo />
      </Showcase>
      <Showcase
        id="compute"
        reverse
        color="green"
        title={
          <>
            Your research. <br />
            Your compute.
          </>
        }
        body="Connect an experiment to the machine it needs. Follow the run, review the logs and keep checkpoints and results with the rest of the project."
      >
        <GpuDemo paused={paused} />
      </Showcase>
    </div>
  );
}

function Deliverables({ openDocument }: { openDocument: (kind?: string) => void }) {
  return (
    <section className="deliverables page-width" id="deliverables">
      <Reveal>
        <h2 className="section-heading">Real files. Ready for the next step.</h2>
      </Reveal>
      <div className="deliverables-grid">
        {[
          {
            title: 'Research reports',
            copy: 'A clear view of the evidence, with the sources close at hand.',
            type: 'report',
          },
          {
            title: 'Scientific manuscripts',
            copy: 'A working draft with the structure and source to keep writing.',
            type: 'paper',
          },
          {
            title: 'Publication figures',
            copy: 'Readable results, editable code and room for the next revision.',
            type: 'figure',
          },
        ].map((item, i) => (
          <Reveal key={item.title} className="deliverable-card" delay={i * 0.08}>
            <button
              className={'deliverable-preview ' + ['blue', 'ochre', 'green'][i]}
              onClick={() => openDocument(item.type === 'report' ? 'document' : item.type)}
              aria-label={'Preview ' + item.title}
            >
              {item.type === 'figure' ? (
                <div className="deliverable-chart">
                  <div className="chart-running-head">
                    TRANSPORT ANALYSIS <span>FIGURE 02</span>
                  </div>
                  <Plot revised />
                  <p>Two configurations, one comparable measurement.</p>
                </div>
              ) : (
                <Paper type={item.type as 'paper' | 'report'} />
              )}
              <span className="preview-arrow">
                <ArrowUpRight size={16} />
              </span>
            </button>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function MatrixReport({
  kind = 'strategy',
}: {
  kind?: 'strategy' | 'policy' | 'engineering' | 'market';
}) {
  const rows =
    kind === 'engineering'
      ? ['Parameter stability', 'Baseline comparison', 'Reproducibility', 'Next experiment']
      : kind === 'market'
        ? ['Open-source tools', 'Scientific platforms', 'Research software', 'Infrastructure']
        : kind === 'policy'
          ? ['Research context', 'Evidence quality', 'Areas of agreement', 'Open questions']
          : ['Research question', 'Evidence landscape', 'Comparison framework', 'Next steps'];
  return (
    <div className={'matrix-report ' + kind}>
      <div className="paper-running-head">
        RESEARCH BRIEF <span>WORKING DOCUMENT</span>
      </div>
      <h4>
        {kind === 'engineering'
          ? 'A reproducible experiment'
          : kind === 'market'
            ? 'A view of the landscape'
            : kind === 'policy'
              ? 'Making sense of the evidence'
              : 'From evidence to a clear decision'}
      </h4>
      <p>
        Organize the sources. Compare the assumptions. <br />
        See where to look next.
      </p>
      <div className="report-section-label">COMPARISON FRAMEWORK</div>
      <table>
        <thead>
          <tr>
            <th>Research area</th>
            <th>Sources</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r}>
              <td>{r}</td>
              <td>{[12, 8, 16, 9][i]}</td>
              <td>
                <span>{i === 3 ? 'Open' : 'Reviewed'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="report-section-label">EVIDENCE COVERAGE</div>
      <div className="report-bars">
        {[74, 49, 87, 63].map((v, i) => (
          <div key={i}>
            <small>{['Methods', 'Data', 'Results', 'Context'][i]}</small>
            <span>
              <i style={{ width: v + '%' }} />
            </span>
          </div>
        ))}
      </div>
      <p className="report-note">Illustrative example · source-linked research workflow</p>
    </div>
  );
}
function UseCases({ openDocument }: { openDocument: (kind?: string) => void }) {
  return (
    <section className="use-cases page-width" id="use-cases">
      <Reveal>
        <h2 className="section-heading">For the questions worth going deeper on.</h2>
      </Reveal>
      <div className="use-case-grid">
        <Reveal className="use-case academic">
          <button
            className="use-case-click"
            aria-label="Open academic research example"
            onClick={() => openDocument('academic')}
          >
            <div className="use-case-copy">
              <h3>Academic research</h3>
              <p>Connect the literature, the experiment and the paper.</p>
            </div>
            <div className="academic-canvas">
              <div className="academic-background-paper">
                <Paper type="paper" />
              </div>
              <div className="academic-front-paper">
                <Paper type="review" />
              </div>
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
        <Reveal className="use-case consulting">
          <button
            className="use-case-click"
            aria-label="Open consulting research example"
            onClick={() => openDocument('consulting')}
          >
            <div className="use-case-copy">
              <h3>Consulting & strategy</h3>
              <p>Build a point of view on a foundation of evidence.</p>
            </div>
            <div className="small-report-wrap">
              <MatrixReport />
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
        <Reveal className="use-case policy">
          <button
            className="use-case-click"
            aria-label="Open policy research example"
            onClick={() => openDocument('policy')}
          >
            <div className="use-case-copy">
              <h3>Policy & public research</h3>
              <p>Read across sources. Understand the trade-offs.</p>
            </div>
            <div className="small-report-wrap">
              <MatrixReport kind="policy" />
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
        <Reveal className="use-case finance">
          <button
            className="use-case-click"
            aria-label="Open financial research example"
            onClick={() => openDocument('finance')}
          >
            <div className="use-case-copy">
              <h3>Financial research</h3>
              <p>Trace a thesis back to the data behind it.</p>
            </div>
            <div className="small-report-wrap">
              <div className="finance-report">
                <div className="paper-running-head">
                  RESEARCH NOTE <span>ILLUSTRATIVE DATA</span>
                </div>
                <h4>Comparing the underlying signals</h4>
                <Plot mode="signals" />
                <table>
                  <tbody>
                    <tr>
                      <td>Series A</td>
                      <td>Source reviewed</td>
                    </tr>
                    <tr>
                      <td>Series B</td>
                      <td>Source reviewed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
        <Reveal className="use-case engineering">
          <button
            className="use-case-click"
            aria-label="Open engineering research example"
            onClick={() => openDocument('engineering')}
          >
            <div className="use-case-copy">
              <h3>Engineering & R&D</h3>
              <p>Move from a technical question to a testable next step.</p>
            </div>
            <div className="small-report-wrap">
              <MatrixReport kind="engineering" />
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
        <Reveal className="use-case market">
          <button
            className="use-case-click"
            aria-label="Open market research example"
            onClick={() => openDocument('market')}
          >
            <div className="use-case-copy">
              <h3>Market intelligence</h3>
              <p>Map a changing field and the questions it leaves open.</p>
            </div>
            <div className="small-report-wrap">
              <MatrixReport kind="market" />
            </div>
            <ArrowUpRight className="use-case-arrow" size={17} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="team-section page-width" id="about">
      <Reveal className="team-copy">
        <h2>
          Good research begins <br />
          with a question. <br /> <br />
          We’re building a place <br />
          to follow it further.
        </h2>
        <a href="#/gallery">
          {GALLERY_OPEN ? '探索科研工作流' : '科研展柜 · 筹备中'} <ArrowUpRight size={14} />
        </a>
      </Reveal>
      <Reveal className="team-image">
        <img
          src="/assets/observatory.webp"
          alt="An observatory beneath a clear, star-filled night sky"
          loading="lazy"
          width="800"
          height="1000"
        />
        <span className="photo-caption">A wider view.</span>
      </Reveal>
    </section>
  );
}
function Footer({
  paused,
  toggleMotion,
  openWorkspace,
}: {
  paused: boolean;
  toggleMotion: () => void;
  openWorkspace: () => void;
}) {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark" href="#top">
              词元智研
            </a>
            <p>
              A space for the work <br />
              behind discovery.
            </p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#features">Features</a>
            <a href="#workflow">Research workflow</a>
            <a href="#use-cases">Use cases</a>
            <button onClick={openWorkspace}>
              工作台交互演示 <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="footer-column">
            <h3>Workspaces</h3>
            <a href="#research-browser">Research browser</a>
            <a href="#latex">LaTeX editor</a>
            <a href="#figures">Scientific figures</a>
            <a href="#compute">Remote compute</a>
          </div>
          <div className="footer-column">
            <h3>词元智研</h3>
            <a href="#/docs">
              文档中心 <ArrowUpRight size={11} />
            </a>
            <a href="#/models">
              模型广场 <ArrowUpRight size={11} />
            </a>
            <a href="#/gallery">
              {GALLERY_OPEN ? 'Research Gallery' : '科研展柜 · 筹备中'} <ArrowUpRight size={11} />
            </a>
            <a href="#/admin">
              模型管理 <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 词元智研 · Token Research</span>
          <a href="https://tokenresearch.com.cn/" target="_blank" rel="noreferrer">
            API 中转站 <ArrowUpRight size={11} />
          </a>
          <button className="motion-toggle" onClick={toggleMotion} aria-pressed={paused}>
            {paused ? <Play size={11} /> : <Pause size={11} />}{' '}
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
          <a className="back-top" href="#top" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingSections({
  paused,
  toggleMotion,
  openDocument,
  openWorkspace,
}: {
  paused: boolean;
  toggleMotion: () => void;
  openDocument: (kind?: string) => void;
  openWorkspace: () => void;
}) {
  return (
    <>
      <Community />
      <Capabilities paused={paused} />
      <Models />
      <Workflow openDocument={openDocument} />
      <Workspaces paused={paused} />
      <Deliverables openDocument={openDocument} />
      <UseCases openDocument={openDocument} />
      <Team />
      <Footer paused={paused} toggleMotion={toggleMotion} openWorkspace={openWorkspace} />
    </>
  );
}
