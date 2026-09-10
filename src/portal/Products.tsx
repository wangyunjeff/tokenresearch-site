import { ArrowRight, ArrowUpRight, Terminal, Layers, Sparkles } from 'lucide-react';
import { GALLERY_OPEN } from './availability';
import { motion } from 'motion/react';
export const RELAY_URL = 'https://tokenresearch.com.cn/';
export function ProductEntries() {
  return (
    <section className="product-entries page-width" aria-label="词元智研产品入口">
      <div className="product-section-heading">
        <span className="p-eyebrow">THE TOKEN RESEARCH ECOSYSTEM</span>
        <h2>从工具，到你的研究。</h2>
        <p>连接模型，组织工作，把时间留给值得追问的问题。</p>
      </div>
      <div className="product-entry-grid">
        <motion.a
          href={RELAY_URL}
          target="_blank"
          rel="noreferrer"
          className="product-entry product-live"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="product-entry-top">
            <Terminal size={23} />
            <span className="product-status live">
              <i />
              已上线
            </span>
          </div>
          <span className="p-eyebrow">01 / API GATEWAY</span>
          <h3>一个入口，连接多种模型。</h3>
          <p>在熟悉的 Agent 工具中使用模型。管理密钥、查看用量，从这里开始。</p>
          <div className="product-entry-bottom">
            <span>
              进入 API 中转站 <ArrowUpRight size={16} />
            </span>
            <small>tokenresearch.com.cn</small>
          </div>
        </motion.a>
        <motion.a
          href="#/app"
          className="product-entry"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="product-entry-top">
            <Layers size={23} />
            <span className="product-status">开发中</span>
          </div>
          <span className="p-eyebrow">02 / RESEARCH APP</span>
          <h3>让研究工作，连贯起来。</h3>
          <p>我们正在构建网页 App，让材料、思路与研究过程有一个共同的落点。</p>
          <div className="product-entry-bottom">
            <span>
              了解网页 App <ArrowRight size={16} />
            </span>
            <small>COMING SOON</small>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
export default function ResearchApp() {
  return (
    <div className="portal-page research-app-page">
      <motion.div
        className="app-coming"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="product-status">
          <i />
          网页 App · 开发中
        </span>
        <p className="p-eyebrow">A LITTLE LESS FRICTION. MORE ROOM FOR RESEARCH.</p>
        <h1>
          让工具退后一步。
          <br />
          <span>让研究向前一步。</span>
        </h1>
        <p className="app-coming-lead">
          从散落的材料，到逐渐清晰的想法。
          <br />
          词元智研网页 App 正在开发中，期待与你的下一个问题相遇。
        </p>
        <div className="app-coming-actions">
          <a className="p-primary" href={RELAY_URL} target="_blank" rel="noreferrer">
            先使用 API 中转站 <ArrowUpRight size={16} />
          </a>
          <a className="p-text-link" href="#/gallery">
            {GALLERY_OPEN ? '看看科研展柜' : '科研展柜 · 筹备中'} <ArrowRight size={16} />
          </a>
        </div>
        <div className="app-intent">
          <Sparkles size={18} />
          <p>把判断留给你，把使用工具的摩擦交给我们。</p>
        </div>
      </motion.div>
      <div className="app-resource-row">
        <a href="#/models">
          <span>01</span>
          <div>
            <h3>找到合适的模型</h3>
            <p>按分组查看人民币价格</p>
          </div>
          <ArrowUpRight size={19} />
        </a>
        <a href="#/docs">
          <span>02</span>
          <div>
            <h3>连接你的 Agent</h3>
            <p>从 Codex 安装与配置开始</p>
          </div>
          <ArrowUpRight size={19} />
        </a>
        <a href="#/skills">
          <span>03</span>
          <div>
            <h3>带走一套工作方法</h3>
            <p>探索可复用的科研 Skills</p>
          </div>
          <ArrowUpRight size={19} />
        </a>
      </div>
    </div>
  );
}
