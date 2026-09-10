import { useEffect, useRef, useState, useId } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  FileText,
  FlaskConical,
  Folder,
  Globe2,
  Image,
  Layers,
  LoaderCircle,
  Maximize2,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Play,
  Plus,
  Search,
  Server,
  Settings2,
  Sparkles,
  Terminal,
  Users,
  X,
} from 'lucide-react';

export const taskNames = [
  'Electrolyte interface review',
  'Figure 2 — transport analysis',
  'Replication experiment',
  'Manuscript revision',
];
export const researchSteps = [
  ['search', 'Search literature across three sources', '4.6s'],
  ['web', 'Read the methods and supplementary files', '3.1s'],
  ['code', 'Compare transport measurements', '16s'],
  ['file', 'Prepare results_notes.tex', '+58'],
] as const;
export function WindowDots() {
  return (
    <span className="window-dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
export function AgentMark() {
  return (
    <span className="agent-mark">
      <Sparkles size={18} />
    </span>
  );
}
export function Status({ children = 'Running' }: { children?: ReactNode }) {
  return (
    <span className="run-status">
      <i />
      {children}
    </span>
  );
}
export function SurfaceHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="surface-header">
      <span>
        <WindowDots />
        {title}
      </span>
      <div className="surface-controls">
        {children || (
          <>
            <MoreHorizontal size={15} />
            <Maximize2 size={13} />
          </>
        )}
      </div>
    </div>
  );
}
const stepIcons = { search: Search, web: Globe2, code: Terminal, file: FileText };
export function StepRows({
  progress = 4,
  compact = false,
}: {
  progress?: number;
  compact?: boolean;
}) {
  return (
    <div className={'step-rows ' + (compact ? 'compact' : '')}>
      {researchSteps.map(([type, text, time], i) => {
        const Icon = stepIcons[type];
        return (
          <motion.div
            key={text}
            className={i < progress ? 'step-done' : 'step-waiting'}
            animate={{ opacity: i < progress ? 1 : 0.35 }}
          >
            <Icon size={14} />
            <span>{text}</span>
            <small className={time.startsWith('+') ? 'green' : ''}>
              {i === progress - 1 && progress < 4 ? (
                <LoaderCircle size={12} className="spin" />
              ) : (
                time
              )}
            </small>
          </motion.div>
        );
      })}
    </div>
  );
}
export function FileCard({
  onOpen,
  compact = false,
  name = 'Interface review — research notes',
}: {
  onOpen?: () => void;
  compact?: boolean;
  name?: string;
}) {
  return (
    <button onClick={onOpen} className={'file-card ' + (compact ? 'compact' : '')}>
      <span className="pdf-icon">
        <FileText size={24} />
        <small>PDF</small>
      </span>
      <span>
        <strong>{name}</strong>
        <small>research_notes.pdf</small>
      </span>
      <span className="file-open">Open</span>
    </button>
  );
}
export function Composer({
  onSubmit,
  compact = false,
}: {
  onSubmit?: (text: string) => void;
  compact?: boolean;
}) {
  const [text, setText] = useState('');
  const inputId = useId();
  return (
    <form
      className={'composer ' + (compact ? 'compact' : '')}
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) {
          onSubmit?.(text.trim());
          setText('');
        }
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        Describe a research task
      </label>
      <textarea
        id={inputId}
        aria-label="Describe a research task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question, / for tools and skills, @ for project files"
        rows={2}
      />
      <div>
        <span>
          <button
            type="button"
            aria-label="Insert example research task"
            onClick={() =>
              setText('Compare recent electrolyte interface studies and organize their methods.')
            }
          >
            <Plus size={16} />
          </button>
          <span>
            Token Research · Demo <ChevronDown size={12} />
          </span>
          <small>High</small>
        </span>
        <button className="send-task" aria-label="Run example task" disabled={!text.trim()}>
          <ArrowUp size={15} />
        </button>
      </div>
    </form>
  );
}
export function Workspace({
  onOpen,
  onFigure,
  onExpand,
  interactive = true,
  paused = false,
}: {
  onOpen: () => void;
  onFigure?: () => void;
  onExpand?: () => void;
  interactive?: boolean;
  paused?: boolean;
}) {
  const [active, setActive] = useState(0),
    [customTask, setCustomTask] = useState(''),
    [step, setStep] = useState(4);
  const ref = useRef<HTMLDivElement>(null),
    view = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!view || paused || reduced) return;
    let count = 0;
    const tick = setInterval(() => {
      count++;
      setStep(count % 13 < 3 ? Math.min(4, (count % 13) + 1) : 4);
    }, 2000);
    return () => clearInterval(tick);
  }, [view, paused, reduced, customTask, active]);
  const tasks = [
    'Compare recent studies of electrolyte interfaces, organize the methods, and draft a concise evidence review.',
    'Plot the transport measurements with confidence intervals and prepare an editable publication figure.',
    'Set up a reproducible baseline and keep the configuration, logs and results together.',
    'Review the manuscript against its evidence table and suggest revisions with sources.',
  ];
  return (
    <div className="research-workspace" ref={ref}>
      <aside className="workspace-sidebar">
        <WindowDots />
        <div className="lab-selector">
          <FlaskConical size={17} />
          <strong>Materials Lab</strong>
          <b>Pro</b>
          <ChevronDown size={12} />
        </div>
        <div className="workspace-actions">
          {[
            [Plus, 'New task'],
            [Server, 'Host Management'],
            [Sparkles, 'Agent'],
            [Users, 'Team & Subscription'],
            [Layers, 'Skill Market'],
            [FileText, 'Examples & tutorials'],
            [Search, 'Search'],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Plus;
            return !['New task', 'Skill Market', 'Examples & tutorials'].includes(String(label)) ? (
              <div className="workspace-static-action" key={String(label)}>
                <I size={16} />
                {String(label)}
              </div>
            ) : (
              <button
                key={String(label)}
                tabIndex={interactive ? 0 : -1}
                onClick={() => {
                  if (label === 'New task') {
                    setCustomTask('Start a new research question. Add your task below.');
                    setStep(0);
                    onExpand?.();
                  } else if (label === 'Skill Market') window.location.href = '#/skills';
                  else if (label === 'Examples & tutorials') window.location.href = '#/gallery';
                }}
              >
                <I size={16} />
                {String(label)}
              </button>
            );
          })}
        </div>
        <small className="sidebar-caption">
          Pinned tasks <ChevronDown size={10} />
        </small>
        <button
          className={'task-row ' + (active === 0 ? 'active' : '')}
          onClick={() => {
            setActive(0);
            setCustomTask('');
          }}
        >
          <LoaderCircle size={14} />
          <span>
            Electrolyte interface review
            <small>
              2h ago <span>Cloud host</span>
            </small>
          </span>
        </button>
        <small className="sidebar-caption">
          Projects <ChevronDown size={10} />
        </small>
        <div className="project-row">
          <Folder size={15} />
          <span>
            New project<small>One place for your research</small>
          </span>
        </div>
        <button
          className="task-row"
          onClick={() => {
            setActive(2);
            setCustomTask('');
          }}
        >
          <Folder size={14} />
          <span>
            Materials benchmark
            <small>
              3d ago <span>Cloud host</span>
            </small>
          </span>
        </button>
        <button
          className="task-row"
          onClick={() => {
            setActive(3);
            setCustomTask('');
          }}
        >
          <Folder size={14} />
          <span>
            Research notebook
            <small>
              1w ago <span>My workstation</span>
            </small>
          </span>
        </button>
        <small className="sidebar-caption">
          Tasks <ChevronDown size={10} />
        </small>
        {taskNames.slice(1).map((name, i) => (
          <button
            key={name}
            className={'task-row ' + (active === i + 1 ? 'active' : '')}
            onClick={() => {
              setActive(i + 1);
              setCustomTask('');
            }}
          >
            <MessageSquare size={13} />
            <span>
              {name}
              <small>
                {['4h ago', 'Yesterday', '2d ago'][i]} <span>Cloud host</span>
              </small>
            </span>
          </button>
        ))}
        <div className="sidebar-person">
          <span>R</span>
          <strong>Research workspace</strong>
          <MoreHorizontal size={16} />
        </div>
      </aside>
      <div className="workspace-center">
        <div className="workspace-topbar">
          <PanelLeft size={16} />
          <div className="workspace-tabs">
            {taskNames.slice(0, 2).map((name, i) => (
              <button
                key={name}
                className={active === i ? 'active' : ''}
                onClick={() => {
                  setActive(i);
                  setCustomTask('');
                }}
              >
                <LoaderCircle size={13} />
                {name}
              </button>
            ))}
          </div>
          {onExpand && (
            <button onClick={onExpand} aria-label="Expand research workspace">
              <Maximize2 size={14} />
            </button>
          )}
        </div>
        <div className="conversation">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + customTask}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="user-bubble">{customTask || tasks[active]}</div>
              <div className="agent-heading">
                <AgentMark />
                <span>Token Research · Demo</span>
              </div>
              <p className="agent-response">
                I'll start with the sources, compare the evidence, and keep the analysis in your
                project.
              </p>
              <button className="work-summary" onClick={() => setStep(step === 4 ? 0 : 4)}>
                <Sparkles size={14} />
                Completed {step + 8} research steps <ChevronRight size={13} />
              </button>
              <StepRows progress={step} />
              <div className="draft-lines">
                <i />
                <i />
                <i />
              </div>
              <FileCard onOpen={onOpen} />
              <button className="figure-file" onClick={onFigure || onOpen}>
                <Image size={14} /> transport_comparison.png <span>PNG</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="workspace-composer">
          <div className="host-state">
            <Server size={12} />
            <span>Cloud host · interface-review</span>
            <Status>{step === 4 ? 'Review ready' : 'Working through the evidence'}</Status>
            <small>{step + 2}/6</small>
          </div>
          <Composer
            onSubmit={(text) => {
              setCustomTask(text);
              setStep(1);
            }}
          />
          <p className="demo-notice">Interactive research preview · example content</p>
        </div>
      </div>
      <aside className="workspace-plan">
        <div>
          <Layers size={14} /> Overview
        </div>
        <small>Steps</small>
        {[
          'Locate relevant studies',
          'Compare experimental methods',
          'Analyze the measurements',
          'Prepare research notes',
          'Export the figures',
        ].map((s, i) => (
          <p key={s} className={i <= step ? 'done' : ''}>
            <Check size={12} />
            {s}
          </p>
        ))}
        <div className="plan-lines">
          <i />
          <i />
          <i />
        </div>
        <span className="plan-foot">PROJECT CONTEXT</span>
        <p>
          <Folder size={12} />
          interface-review/
        </p>
        <p>
          <FileText size={12} />
          evidence.csv
        </p>
      </aside>
    </div>
  );
}

export function SmallConversation({
  variant = 'task',
}: {
  variant?: 'task' | 'browser' | 'gpu' | 'figure';
}) {
  const messages = {
    task: 'Map the latest open research datasets and compare two baseline methods.',
    browser: 'Find interface studies and extract the experimental methods into a table.',
    gpu: 'Run the baseline on the lab GPU and save the best checkpoint to this project.',
    figure: 'Place the legend above the plot and increase the marker size.',
  };
  const steps = {
    task: ['Find sources', 'Inspect data', 'Run comparison', 'Prepare figures', 'Check references'],
    browser: [
      'Start the research browser',
      'Search academic sources',
      'Filter publication dates',
      'Read the selected article',
      'Extract the methods',
    ],
    gpu: [
      'Connect to lab-compute',
      'Inspect GPU and environment',
      'Transfer project files',
      'Run the training script',
      'Save the best checkpoint',
    ],
    figure: [
      'Open transport.figure',
      'Read the revision list',
      'Move the legend',
      'Increase marker size',
      'Export revision 2',
    ],
  };
  return (
    <div className={'small-conversation ' + variant}>
      <div className="user-bubble">{messages[variant]}</div>
      <div className="agent-heading">
        <AgentMark />
        Token Research · Demo<small>{variant === 'gpu' ? '18 min' : '2 h 14 m'}</small>
      </div>
      <p>I'll organize the work and keep each result connected to its source.</p>
      <div className="small-step-list">
        {steps[variant].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0.2, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.16, duration: 0.4 }}
          >
            <Check size={12} />
            <span>{s}</span>
            {i === steps[variant].length - 1 && <span className="work-dot" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export function TraceCard({ playing = true }: { playing?: boolean }) {
  const [progress, setProgress] = useState(25);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 550);
    return () => clearInterval(timer);
  }, [playing]);
  return (
    <div className="trace-demo">
      <span>
        <Sparkles size={15} /> Completed 9 steps
      </span>
      <StepRows />
      <pre>
        <b>$ python compare.py --trials 36</b>
        {'\n\n'}loaded 36 runs · 4 configurations{'\n'}fitting transport model… done{'\n\n'}
        validation split: consistent{'\n'}saved results/comparison.json
      </pre>
      <div className="trace-player">
        <Play size={12} />
        <span>4:18 / 25:40</span>
        <div>
          <i style={{ width: progress + '%' }} />
        </div>
        <span>1×</span>
      </div>
    </div>
  );
}
export function PhoneDemo() {
  return (
    <div className="phone-demo">
      <div className="phone-camera" />
      <div className="phone-status">
        14:02<span>▱</span>
      </div>
      <h4>Tasks</h4>
      <small>In progress</small>
      {['Materials benchmark', 'Source comparison'].map((s, i) => (
        <div className="phone-task" key={s}>
          <LoaderCircle size={13} />
          <span>
            {s}
            <small>Cloud host · {i + 2} h 12 m</small>
          </span>
        </div>
      ))}
      <small>Recent work</small>
      {['Method comparison notes', 'Manuscript revisions', 'Experiment plan'].map((s) => (
        <p key={s}>
          {s}
          <small>Updated today</small>
        </p>
      ))}
      <div className="phone-bottom">
        <Status>Cloud host</Status>
        <Plus size={15} />
      </div>
      <div className="phone-home" />
    </div>
  );
}

export function Plot({
  revised = false,
  white = true,
  large = false,
  mode = 'transport',
}: {
  revised?: boolean;
  white?: boolean;
  large?: boolean;
  mode?: 'transport' | 'signals';
}) {
  return (
    <svg
      className={'science-plot ' + (white ? 'on-white' : '') + (large ? ' large' : '')}
      viewBox="0 0 520 340"
      role="img"
      aria-label={
        mode === 'signals'
          ? 'Illustrative normalized index chart with two comparison series'
          : 'Illustrative transport measurement chart with two comparison series'
      }
    >
      <rect width="520" height="340" fill={white ? '#fff' : '#141414'} />
      <g stroke={white ? '#e8e8e8' : '#303030'} strokeWidth="1">
        {[60, 110, 160, 210, 260].map((y) => (
          <line key={y} x1="67" x2="472" y1={y} y2={y} />
        ))}
        {[70, 170, 270, 370, 470].map((x) => (
          <line key={x} x1={x} x2={x} y1="45" y2="267" />
        ))}
      </g>
      <g fill={white ? '#777' : '#999'} fontFamily="Inter, sans-serif" fontSize="11">
        <text x="18" y="67">
          1.2
        </text>
        <text x="18" y="117">
          1.0
        </text>
        <text x="18" y="167">
          0.8
        </text>
        <text x="18" y="217">
          0.6
        </text>
        <text x="18" y="267">
          0.4
        </text>
        {(mode === 'signals'
          ? ['Jan', 'Mar', 'May', 'Jul', 'Sep']
          : ['20', '40', '60', '80', '100']
        ).map((s, i) => (
          <text key={s} x={62 + i * 100} y="288">
            {s}
          </text>
        ))}
        <text x="213" y="320">
          {mode === 'signals' ? 'Period / month' : 'Temperature / °C'}
        </text>
        <text x="24" y="28">
          {mode === 'signals' ? 'Normalized index' : 'Conductivity / a.u.'}
        </text>
      </g>
      <path
        d="M70 213 Q130 192 170 166 T270 120 T370 82 T470 57"
        fill="none"
        stroke="#337eb3"
        strokeWidth="2.5"
      />
      <path
        d="M70 251 Q130 240 170 214 T270 184 T370 146 T470 112"
        fill="none"
        stroke="#d38d40"
        strokeWidth="2.5"
      />
      {[70, 170, 270, 370, 470].map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            x2={x}
            y1={[203, 155, 109, 71, 46][i]}
            y2={[223, 177, 131, 93, 68][i]}
            stroke="#337eb3"
          />
          <circle cx={x} cy={[213, 166, 120, 82, 57][i]} r={revised ? 5 : 3} fill="#337eb3" />
          <circle cx={x} cy={[251, 214, 184, 146, 112][i]} r={revised ? 5 : 3} fill="#d38d40" />
        </g>
      ))}
      <g transform={revised ? 'translate(315 16)' : 'translate(87 74)'}>
        <rect
          x="-7"
          y="-8"
          width="137"
          height="48"
          rx="3"
          fill={white ? '#ffffffee' : '#141414ee'}
        />
        <line x1="0" x2="20" y1="3" y2="3" stroke="#337eb3" strokeWidth="2" />
        <text x="26" y="7" fontSize="10" fill={white ? '#555' : '#aaa'}>
          {mode === 'signals' ? 'Series A' : 'Configuration A'}
        </text>
        <line x1="0" x2="20" y1="23" y2="23" stroke="#d38d40" strokeWidth="2" />
        <text x="26" y="27" fontSize="10" fill={white ? '#555' : '#aaa'}>
          {mode === 'signals' ? 'Series B' : 'Configuration B'}
        </text>
      </g>
    </svg>
  );
}
export function Paper({ type = 'report' }: { type?: 'report' | 'paper' | 'review' }) {
  return (
    <div className={'paper-page ' + type}>
      <div className="paper-running-head">
        RESEARCH NOTEBOOK <span>SEPTEMBER 2026</span>
      </div>
      <h4>
        {type === 'review'
          ? 'Evidence, experiments and interface transport'
          : type === 'paper'
            ? 'Transport behavior across candidate solid electrolytes'
            : 'Electrolyte interfaces: a comparative review'}
      </h4>
      <p className="paper-subtitle">An illustrative research document · Methods and analysis</p>
      <div className="paper-rule" />
      <h5>{type === 'review' ? 'Study profile' : 'Abstract'}</h5>
      <p>
        We examine how material preparation and measurement conditions affect observed transport
        behavior. The comparison organizes reported methods, identifies shared assumptions and
        records the evidence needed for the next experiment.
      </p>
      <h5>1. Experimental methods</h5>
      <p>
        Measurements are grouped by preparation protocol and evaluated under comparable conditions.
        Each observation remains linked to its original source and configuration.
      </p>
      <table>
        <thead>
          <tr>
            <th>Configuration</th>
            <th>Temperature</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample A</td>
            <td>25 °C</td>
            <td>Impedance</td>
          </tr>
          <tr>
            <td>Sample B</td>
            <td>40 °C</td>
            <td>Impedance</td>
          </tr>
          <tr>
            <td>Reference</td>
            <td>25 °C</td>
            <td>Baseline</td>
          </tr>
        </tbody>
      </table>
      <h5>2. Results and interpretation</h5>
      <Plot />
      <p className="paper-caption">
        Figure 1. Illustrative comparison of two experimental configurations.
      </p>
      <h5>3. Open questions</h5>
      <p>
        The next stage isolates the contribution of interface preparation. Repeated runs, consistent
        calibration and a predefined comparison will support that evaluation.
      </p>
      <div className="paper-foot">
        Project archive · Methods, code and sources included <span>01</span>
      </div>
    </div>
  );
}
export function BrowserDemo() {
  return (
    <div className="split-workspace browser-workspace">
      <div className="demo-chat">
        <SurfaceHeader title="Interface methods review" />
        <SmallConversation variant="browser" />
        <div className="mini-composer">
          Continue the research… <ArrowUp size={12} />
        </div>
      </div>
      <div className="demo-browser">
        <SurfaceHeader title="Research browser">
          <span>
            <Globe2 size={13} /> Browser session
          </span>
        </SurfaceHeader>
        <div className="browser-address">
          <ChevronRight size={13} />
          <span>Research index / electrolyte interfaces</span>
          <Settings2 size={13} />
        </div>
        <div className="browser-paper">
          <h4>
            Research<span>Index</span>
          </h4>
          <div className="fake-search">
            <Search size={12} />
            solid electrolyte interface
          </div>
          <small>Recent publications · sorted by date</small>
          {[
            'Mapping interface resistance in solid electrolytes',
            'Resolving transport pathways under repeated cycling',
            'Surface preparation and measurement protocols',
          ].map((s, i) => (
            <article key={s}>
              <h5>{s}</h5>
              <span>Materials research · {2026 - i}</span>
              <p>
                A comparison of experimental preparation, measurement conditions and observed
                interface behavior…
              </p>
              <b>Open access</b>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
const codeLines = [
  ['12', '\\section{Results}'],
  ['13', 'We compare transport under consistent'],
  ['14', 'measurement conditions~\\cite{study2026}.'],
  ['15', ''],
  ['16', '\\subsection{Conductivity}'],
  ['17', 'Configuration A retains a higher response'],
  ['18', 'across the measured temperature range.'],
  ['19', 'The results motivate a controlled test.'],
  ['20', ''],
  ['21', '\\begin{figure}[t]'],
  ['22', '  \\includegraphics{transport.figure}'],
  ['23', '  \\caption{Transport measurements}'],
  ['24', '\\end{figure}'],
  ['25', ''],
  ['26', '\\subsection{Interface effects}'],
  ['27', 'The next experiment isolates the role'],
  ['28', 'of preparation and contact resistance.'],
  ['29', ''],
];
export function LatexDemo() {
  const [tab, setTab] = useState('split');
  return (
    <div className="latex-workspace">
      <SurfaceHeader title="LaTeX · manuscript.tex">
        <div className="tiny-tabs">
          {['source', 'split', 'pdf'].map((s) => (
            <button key={s} onClick={() => setTab(s)} aria-pressed={tab === s}>
              {s === 'pdf' ? 'PDF' : s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </SurfaceHeader>
      <div className={'latex-body ' + tab}>
        {tab !== 'pdf' && (
          <div className="code-editor">
            {codeLines.map(([n, s]) => (
              <div key={n}>
                <span>{n}</span>
                <code className={s.includes('\\') ? 'code-accent' : ''}>{s || ' '}</code>
              </div>
            ))}
            <span className="editor-caret" />
          </div>
        )}
        {tab !== 'source' && (
          <div className="latex-preview">
            <div>
              <Status>Compiled</Status>
              <span>XeLaTeX</span>
            </div>
            <Paper type="paper" />
          </div>
        )}
      </div>
    </div>
  );
}
export function FigureDemo() {
  const [version, setVersion] = useState(1),
    [tab, setTab] = useState('Figure');
  return (
    <div className="figure-workspace">
      <SurfaceHeader title="transport.figure">
        <div className="tiny-tabs">
          {['Figure', 'Code', 'Environment'].map((s) => (
            <button key={s} onClick={() => setTab(s)} aria-pressed={tab === s}>
              {s}
            </button>
          ))}
        </div>
      </SurfaceHeader>
      <div className="figure-body">
        <div className="figure-main">
          {tab === 'Figure' ? (
            <>
              <Plot revised={version === 2} />
              {version === 1 && (
                <div className="figure-annotation">
                  <span>Move legend away from data</span>
                  <i />
                </div>
              )}
            </>
          ) : (
            <pre className="figure-code">
              {tab === 'Code'
                ? `# Reproducible figure source\nimport matplotlib.pyplot as plt\n\nfig, ax = plt.subplots()\nax.errorbar(temperature, sample_a, yerr=error)\nax.plot(temperature, sample_b)\nax.set_xlabel('Temperature / °C')\nax.legend(loc='${version === 2 ? 'upper right' : 'upper left'}')\nfig.savefig('transport.pdf')`
                : 'Python 3.12\nmatplotlib 3.9\nnumpy 2.1\n\nInput: measurements.csv\nOutput: transport.pdf\nStyle: publication.mplstyle\n\nEvery revision has its source.'}
            </pre>
          )}
          <div className="figure-versions">
            {[1, 2].map((v) => (
              <button key={v} onClick={() => setVersion(v)} aria-pressed={version === v}>
                v{v}
              </button>
            ))}
            <button
              className="mobile-revision"
              onClick={() => {
                setVersion(version === 1 ? 2 : 1);
                setTab('Figure');
              }}
            >
              {version === 1 ? 'Apply revision' : 'Show original'}
            </button>
            <span>Illustrative measurements</span>
          </div>
        </div>
        <aside className="revision-panel">
          <h5>Revision list</h5>
          <p>Keep each change in view</p>
          {[
            'Move legend to top-right',
            'Make markers easier to see',
            'Preserve editable source',
          ].map((s, i) => (
            <div key={s}>
              {version === 2 ? <Check size={12} /> : <span>{i + 1}</span>}
              {s}
            </div>
          ))}
          <button
            className="revision-button"
            onClick={() => {
              setVersion(version === 1 ? 2 : 1);
              setTab('Figure');
            }}
          >
            <Sparkles size={13} />
            {version === 1 ? 'Apply revision' : 'Show original'}
          </button>
        </aside>
      </div>
    </div>
  );
}
export function GpuDemo({ paused = false }: { paused?: boolean }) {
  const [running, setRunning] = useState(true),
    [epoch, setEpoch] = useState(26);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null),
    visible = useInView(ref);
  useEffect(() => {
    if (!running || !visible || reduced || paused) return;
    const id = setInterval(() => setEpoch((e) => (e >= 40 ? 26 : e + 1)), 2400);
    return () => clearInterval(id);
  }, [running, visible, reduced, paused]);
  return (
    <div ref={ref} className="split-workspace gpu-workspace">
      <div className="demo-chat">
        <SurfaceHeader title="Baseline experiment" />
        <SmallConversation variant="gpu" />
        <div className="gpu-host">
          <small>HOST</small>
          <p>
            <Status>lab-compute · GPU ×2</Status>
          </p>
          <p>GPU {78 + (epoch % 8)}% · 36.8 / 80 GB</p>
          <p>checkpoint-{String(epoch).padStart(3, '0')}.pt · syncing</p>
        </div>
      </div>
      <div className="terminal-workspace">
        <SurfaceHeader title="lab-compute · remote session">
          <button className="terminal-pause" onClick={() => setRunning(!running)}>
            {running ? 'Pause demo' : 'Resume demo'}
          </button>
        </SurfaceHeader>
        <div className="terminal-path">
          <Terminal size={12} />
          ssh lab-compute · ~/research/baseline
        </div>
        <pre>
          <b>$ ssh lab-compute</b>
          {'\n'}
          <span>connected · linux · research environment</span>
          {'\n\n'}
          <b>$ nvidia-smi</b>
          {'\n'}NVIDIA A100 · 80 GB{'\n\n'}
          <b>$ python train.py --epochs 40</b>
          {'\n'}dataset ready · 40 epochs planned{'\n\n'}[epoch {epoch - 2}/40] loss=
          {(4 / (epoch - 2)).toFixed(3)}
          {'\n'}[epoch {epoch - 1}/40] loss={(4 / (epoch - 1)).toFixed(3)}
          {'\n'}
          <em>
            [epoch {epoch}/40] loss={(4 / epoch).toFixed(3)}
          </em>
          {'\n\n'}checkpoint saved · model-{epoch}.pt{'\n'}
          <span>sync → project/runs/baseline/</span>
          <i className="terminal-caret" />
        </pre>
        <div className="terminal-bottom">
          <Status>{running ? 'Running' : 'Paused'}</Status>
          <span>epoch {epoch} / 40</span>
        </div>
      </div>
    </div>
  );
}
export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="close-button" onClick={onClick} aria-label="Close preview">
      <X size={20} />
    </button>
  );
}
