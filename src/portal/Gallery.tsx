import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  FileText,
  Layers,
  LockKeyhole,
  Search,
} from 'lucide-react';
import content from './content.json';
import { GALLERY_OPEN } from './availability';
import { CopyButton } from './Models';
import { Plot } from '../components/ResearchUI';

type ResearchCase = (typeof content.cases)[number];
export function CaseVisual({ item, compact = false }: { item: ResearchCase; compact?: boolean }) {
  return (
    <div className={'case-visual case-' + item.id + (compact ? ' compact' : '')}>
      <img src={'/assets/' + item.image} alt="" loading="lazy" />
      <div className="case-artifact">
        <div className="artifact-top">
          <FileText size={12} />
          <span>{item.artifact}</span>
          <span className="artifact-type">{item.artifact.split('.').pop()?.toUpperCase()}</span>
        </div>
        {item.id === 'figure-studio' ? (
          <div className="artifact-plot">
            <Plot revised />
            <small>Figure study · 示例图件</small>
          </div>
        ) : item.artifact.endsWith('.csv') ? (
          <div className="artifact-matrix">
            <div>
              <b>
                {item.id === 'reading-landscape'
                  ? '研究问题'
                  : item.id === 'review-response'
                    ? '审稿意见'
                    : '运行记录'}
              </b>
              <b>材料与依据</b>
              <b>下一步</b>
            </div>
            {['01', '02', '03', '04'].map((n, i) => (
              <div key={n}>
                <span>
                  {
                    (item.id === 'experiment-trace'
                      ? [
                          'run_001 / baseline',
                          'run_002 / ablation',
                          'run_003 / seed_42',
                          'run_004 / repeat',
                        ]
                      : item.id === 'review-response'
                        ? [
                            'R1.1 / 实验对照',
                            'R1.2 / 评价方式',
                            'R2.1 / 方法说明',
                            'R2.2 / 图表标注',
                          ]
                        : ['比较关键假设', '对齐评价方式', '记录已知差异', '核对证据来源'])[i]
                  }
                </span>
                <span>
                  {
                    (item.id === 'experiment-trace'
                      ? ['config.yaml', 'metrics.csv', 'config.diff', 'run.log']
                      : item.id === 'review-response'
                        ? ['Table 2', 'Section 4.2', 'Section 3', 'Figure 3']
                        : ['Source / A', 'Source / B', 'Source / C', 'Source / D'])[i]
                  }
                </span>
                <span className="artifact-check">{i < 2 ? '已整理' : '待核对'}</span>
              </div>
            ))}
            <p>
              Research notes <span>材料 → 比较 → 判断</span>
            </p>
          </div>
        ) : (
          <div className="artifact-notes">
            <span>RESEARCH / WORKING NOTE</span>
            <h3>{item.artifactName}</h3>
            {[item.input, item.action, item.output].map((text, i) => (
              <p key={i}>
                <b>0{i + 1}</b>
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function ArtifactPreview({ item }: { item: ResearchCase }) {
  const [text, setText] = useState(''),
    [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    fetch('/downloads/examples/' + item.artifact)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then((t) => {
        if (active) setText(t);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [item.artifact]);
  return (
    <details className="artifact-preview">
      <summary>
        <FileText size={16} />
        预览模板内容<span>展开 +</span>
      </summary>
      {error ? (
        <p>预览暂时无法加载，可使用下载按钮获取模板。</p>
      ) : !text ? (
        <p>正在读取模板…</p>
      ) : (
        <pre>{text}</pre>
      )}
    </details>
  );
}
export function Skills({ id }: { id?: string }) {
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('全部');
  const skill = content.skills.find((s) => s.id === id);
  if (id)
    return (
      <div className="portal-page case-detail skill-detail">
        <a className="p-text-link" href="#/skills">
          <ArrowLeft size={15} />
          所有 Skills
        </a>
        {!skill ? (
          <div className="p-empty">
            <h1>没有找到这个 Skill</h1>
          </div>
        ) : (
          <>
            <div className="case-detail-heading">
              <span className="p-eyebrow">RESEARCH SKILLS / {skill.en.toUpperCase()}</span>
              <h1>{skill.name}</h1>
              <p>{skill.description}</p>
              <a className="p-primary" href={'/downloads/skills/' + skill.id + '.zip'} download>
                <Download size={16} />
                下载 Skill
              </a>
            </div>
            <div className="skill-io">
              <div>
                <small>准备材料</small>
                <h2>带上这些输入</h2>
                {skill.inputs.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
              <div>
                <small>预期产物</small>
                <h2>完成后得到什么</h2>
                {skill.outputs.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
            </div>
            <div className="skill-steps">
              <span className="p-eyebrow">THE METHOD</span>
              <h2>怎样一步步展开</h2>
              {skill.steps.map((s, i) => (
                <div key={s}>
                  <b>0{i + 1}</b>
                  <p>{s}</p>
                </div>
              ))}
            </div>
            <div className="case-prompt">
              <div>
                <span>从这句话开始</span>
                <CopyButton value={skill.prompt} label="复制 Skill 任务" />
              </div>
              <p>{skill.prompt}</p>
            </div>
            <a className="p-text-link" href={'#/gallery/' + skill.case}>
              {GALLERY_OPEN ? '看看完整的工作流' : '科研展柜 · 筹备中'} <ArrowRight size={15} />
            </a>
          </>
        )}
      </div>
    );
  const skills = content.skills.filter(
    (s) =>
      (category === '全部' || s.category === category) && (s.name + s.description).includes(query),
  );
  return (
    <div className="portal-page skills-page">
      <div className="p-heading">
        <div>
          <span className="p-eyebrow">THE METHOD LIBRARY</span>
          <h1>让好方法，可以重用。</h1>
          <p>八个科研 Skills，从材料整理到研究交接。</p>
        </div>
        <a className="p-primary" href="/downloads/token-research-skills.zip" download>
          <Download size={16} />
          下载完整合集
        </a>
      </div>
      <div className="gallery-tools">
        <div className="p-filter-tabs">
          {['全部', ...new Set(content.skills.map((s) => s.category))].map((c) => (
            <button
              className={c === category ? 'active' : ''}
              aria-pressed={c === category}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="p-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索 Skill"
            aria-label="搜索 Skill"
          />
        </label>
      </div>
      <div className="skill-grid">
        {skills.map((s, i) => (
          <motion.a
            className="skill-tile"
            href={'#/skills/' + s.id}
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div>
              <Layers size={22} />
              <span>{s.category}</span>
              <ArrowUpRight size={17} />
            </div>
            <small>{s.en}</small>
            <h2>{s.name}</h2>
            <p>{s.description}</p>
            <footer>
              {s.outputs[0]}
              <ArrowRight size={15} />
            </footer>
          </motion.a>
        ))}
      </div>
      {!skills.length && <div className="p-empty">没有找到对应的 Skill</div>}
    </div>
  );
}
export default function Gallery({ id }: { id?: string }) {
  if (GALLERY_OPEN) return <GalleryContent id={id} />;
  return (
    <div className="portal-page gallery-pending-page">
      <motion.div
        className="app-coming"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="product-status">
          <LockKeyhole size={12} />
          科研展柜 · 筹备中
        </span>
        <p className="p-eyebrow">RESEARCH GALLERY / COMING SOON</p>
        <h1>好研究，值得好好呈现。</h1>
        <p className="app-coming-lead">
          用 AI 开展科研的案例正在整理。
          <br />
          准备好后，我们会在这里分享方法、过程与成果。
        </p>
        <div className="app-coming-actions">
          <a className="p-primary" href="#/docs">
            先看看工具文档 <ArrowRight size={15} />
          </a>
          <a className="p-text-link" href="#/models">
            浏览模型广场 <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
function GalleryContent({ id }: { id?: string }) {
  const [category, setCategory] = useState('全部案例');
  const item = content.cases.find((c) => c.id === id),
    feature = content.cases[0];
  if (id) {
    if (!item)
      return (
        <div className="portal-page p-empty">
          <h1>这个案例不存在</h1>
          <a href="#/gallery">返回科研展柜 →</a>
        </div>
      );
    const skill = content.skills.find((s) => s.id === item.skill)!;
    return (
      <div className="portal-page case-detail">
        <a className="p-text-link" href="#/gallery">
          <ArrowLeft size={15} />
          返回科研展柜
        </a>
        <div className="case-detail-heading">
          <span className="p-eyebrow">{item.category} / WORKFLOW STUDY</span>
          <h1>{item.title}</h1>
          <p>{item.subtitle}</p>
          <div className="case-tags">
            {item.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <CaseVisual item={item} />
        <div className="case-body">
          <aside>
            <span className="p-eyebrow">IN THIS STUDY</span>
            <span>{item.category}</span>
            <a href={'#/skills/' + skill.id}>
              {skill.name} Skill <ArrowUpRight size={14} />
            </a>
            <a href={'/downloads/examples/' + item.artifact} download>
              <Download size={15} />
              下载{item.artifactName}
            </a>
          </aside>
          <article>
            <p className="case-intro">{item.intro}</p>
            <div className="case-stages">
              {[
                ['INPUT', '从什么材料开始', item.input],
                ['PROCESS', '让 AI 展开哪些工作', item.action],
                ['OUTPUT', '留下什么产物', item.output],
              ].map(([label, title, description], i) => (
                <section key={label}>
                  <span>0{i + 1}</span>
                  <div>
                    <small>{label}</small>
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </div>
                </section>
              ))}
            </div>
            <div className="case-judgment">
              <span>留给研究者的判断</span>
              <h2>{item.decision}</h2>
            </div>
            <div className="case-prompt">
              <div>
                <span>从这句话开始</span>
                <CopyButton value={skill.prompt} label="复制研究任务" />
              </div>
              <p>{skill.prompt}</p>
            </div>
            <ArtifactPreview item={item} />
            <div className="case-downloads">
              <a className="p-primary" href={'/downloads/examples/' + item.artifact} download>
                <Download size={16} />
                下载模板
              </a>
              <a
                className="button outline"
                href={'/downloads/skills/' + skill.id + '.zip'}
                download
              >
                下载 {skill.name} Skill <ArrowDown size={15} />
              </a>
            </div>
          </article>
        </div>
        <div className="gallery-section-heading">
          <h2>下一件值得展开的工作</h2>
          <a href="#/gallery">
            所有案例 <ArrowRight size={15} />
          </a>
        </div>
        <div className="gallery-grid related-cases">
          {content.cases
            .filter((c) => c.id !== id)
            .slice(0, 3)
            .map((c) => (
              <a className="case-tile" href={'#/gallery/' + c.id} key={c.id}>
                <CaseVisual item={c} compact />
                <small>{c.category}</small>
                <h3>
                  {c.short}
                  <ArrowUpRight size={16} />
                </h3>
                <p>{c.subtitle}</p>
              </a>
            ))}
        </div>
      </div>
    );
  }
  const cases = content.cases.filter((c) => category === '全部案例' || c.category === category);
  return (
    <div className="portal-page gallery-page">
      <div className="p-heading">
        <div>
          <span className="p-eyebrow">GALLERY / RESEARCH IN PRACTICE</span>
          <h1>研究，怎样向前一步。</h1>
          <p>看材料如何变成线索、实验与表达。把适合你的方法带回自己的研究。</p>
        </div>
        <a className="p-text-link" href="#/skills">
          探索科研 Skills <ArrowUpRight size={16} />
        </a>
      </div>
      <motion.a
        className="gallery-feature"
        href={'#/gallery/' + feature.id}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="gallery-feature-copy">
          <span className="p-eyebrow">FEATURED WORKFLOW / 01</span>
          <h2>
            从论文堆，
            <br />
            到研究地图。
          </h2>
          <p>
            把问题、假设与证据放在同一张表里。
            <br />
            让下一篇值得读的论文浮现出来。
          </p>
          <span className="p-feature-link">
            展开这次研究 <ArrowUpRight size={17} />
          </span>
          <small>文献研究 · 文献地图 Skill · CSV 模板</small>
        </div>
        <CaseVisual item={feature} />
      </motion.a>
      <div className="gallery-tools">
        <div className="p-filter-tabs">
          {['全部案例', ...new Set(content.cases.map((c) => c.category))].map((c) => (
            <button
              className={category === c ? 'active' : ''}
              aria-pressed={category === c}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="p-muted">{cases.length} 个工作流示例</span>
      </div>
      <div className="gallery-grid">
        {cases.map((c, i) => (
          <motion.a
            className="case-tile"
            href={'#/gallery/' + c.id}
            key={c.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.055 }}
          >
            <CaseVisual item={c} compact />
            <div className="case-tile-meta">
              <small>{c.category}</small>
              <span>0{content.cases.indexOf(c) + 1}</span>
            </div>
            <h3>
              {c.short}
              <ArrowUpRight size={17} />
            </h3>
            <p>{c.subtitle}</p>
            <div className="case-tile-tags">
              {c.tags.slice(0, 2).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
      <div className="gallery-skills-cta">
        <BookOpen size={27} />
        <div>
          <h2>把流程，变成你自己的方法。</h2>
          <p>下载 Skill，带上材料，从一个具体的问题开始。</p>
        </div>
        <a className="button light" href="#/skills">
          浏览 8 个 Skills <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
