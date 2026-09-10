import {SKILLS} from '../public/research-data.js';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const principles={
 'literature-map':'记录论文标题、作者、年份以及 DOI 或可访问链接。比较结论前对齐数据、评价指标与实验条件。无法从原文确认的内容标为待核对；综合推断与论文陈述分别记录。',
 'paper-to-protocol':'将每个关键模块关联到原文位置与实际代码入口。对论文没有说明的超参数列出选项与依据，不把猜测写成原设置。运行代码前确认所需数据和计算预算已在本次任务范围内。',
 'experiment-design':'把每项实验与一项假设相连。评价集与训练过程分开，控制数据划分与随机性。新增实验必须提供能够区分不同解释的信息。不要把尚未执行的实验写成结果。',
 'experiment-ledger':'从实际日志读取结果，保留原始文件。每条记录包括运行标识、代码版本、配置、数据划分、种子、指标定义和产物路径；缺失字段如实留空。中断运行与完整运行分别标记。',
 'research-figures':'保留用户原始数值、曲线、比较对象和误差定义。使用绘图工具生成精确图件；生成式图片只用于非数据性的插图。沿用用户提供的配色与版式要求，按最终尺寸核对字形、单位、图例和遮挡。',
 'manuscript-polish':'保留用户指定的结构与实验结果。以具体词汇和明确主语改善可读性，避免堆叠形容词。所有新增论断需要已有证据支持，需作者确认的推理或数学条件单独提出。',
 'review-response':'保留审稿编号与问题原意。将已完成修改、拟补充实验和解释性答复区分。回复中出现的数字和修改位置应与稿件一致，缺失信息先标注待填写。',
 'lab-handoff':'依据项目现状写交接，不生成未经验证的运行结果。把个人凭据与公开说明分开；外部服务地址可以记录，凭据只说明取得方式。最小运行的验收条件与执行步骤放在一起。'
};
for(const s of SKILLS){const folder='skill-pack/'+s.id;await mkdir(folder,{recursive:true});const body=`---\nname: ${s.id}\ndescription: ${s.description} 适用于${s.inputs.join('、')}相关的科研任务。\n---\n\n# ${s.name}\n\n${s.description}\n\n## 使用范围\n围绕用户当前研究任务工作，沿用用户已确定的研究目标、材料范围、实验结果和表达要求。先利用已有材料推进；缺少会影响判断的关键材料时再指出具体缺项。\n\n## 需要的材料\n${s.inputs.map(x=>'- '+x).join('\n')}\n\n## 工作顺序\n${s.steps.map((x,i)=>(i+1)+'. '+x).join('\n')}\n\n## 任务中的判断准则\n${principles[s.id]}\n\n## 交付\n${s.outputs.map(x=>'- '+x).join('\n')}\n\n交付内容应能让研究者接着修改或开展下一步。用清楚的文件名与材料位置说明来路，按本次请求决定输出格式。\n\n## 任务示例\n${s.prompt}\n`;await writeFile(folder+'/SKILL.md',body);}
await mkdir('public/downloads/skills',{recursive:true});await mkdir('public/downloads/examples',{recursive:true});
const examples={
 'literature-matrix.csv':'论文标题,作者与年份,DOI或链接,原文位置,研究问题,关键假设,方法,数据与评价设置,主要结论,证据与分歧,待核对项\n',
 'experiment-ledger.csv':'运行ID,研究问题,代码版本,配置路径,数据划分,随机种子,指标定义,结果值,运行状态,产物位置,下一步\n',
 'review-matrix.csv':'审稿人,意见编号,原始意见,核心问题,回应依据,已完成修改,稿件位置,待完成事项,处理状态\n',
 'figure-brief.md':'# 科研图表需求清单\n\n## 核心比较\n- 这张图回答什么问题？\n- 读者应先看见哪一种关系？\n\n## 数据与口径\n- 原始数据位置：\n- 评价指标与单位：\n- 误差条或置信区间定义：\n- 需要保留的比较对象：\n\n## 最终版面\n- 单栏或双栏宽度：\n- 字体与字号：\n- 既有配色与模板：\n- 导出格式：PDF / SVG / PNG\n\n## 交付检查\n- 数值与原始数据一致\n- 图例、单位与标注完整\n- 最终尺寸下可读\n- 代码与数据引用可继续使用\n',
 'reproduction-checklist.md':'# 论文复现清单\n\n## 目标\n- 论文与来源：\n- 目标表格或结论：\n- 预期评价口径：\n\n## 方法到实现\n| 方法组成 | 原文位置 | 代码入口 | 关键设置 | 待确认项 |\n| --- | --- | --- | --- | --- |\n| 数据处理 | | | | |\n| 模型 | | | | |\n| 目标函数 | | | | |\n| 优化 | | | | |\n| 评价 | | | | |\n\n## 最小验证\n- 环境与依赖：\n- 输入样本：\n- 运行命令：\n- 预期产物：\n- 验收条件：\n\n## 运行记录\n- 代码版本：\n- 配置路径与随机种子：\n- 结果与日志位置：\n',
 'experiment-plan.md':'# 实验设计模板\n\n## 要验证的假设\n\n## 与现有解释的区别\n\n## 实验矩阵\n| 问题 | 自变量 | 控制变量 | 对照 | 指标 | 支持假设的条件 | 否定假设的条件 |\n| --- | --- | --- | --- | --- | --- | --- |\n| | | | | | | |\n\n## 数据与划分\n\n## 计算预算与优先级\n\n## 停止条件\n\n## 结果记录与下一步\n'
};
for(const [name,body]of Object.entries(examples))await writeFile('public/downloads/examples/'+name,name.endsWith('.csv')?'\uFEFF'+body:body);
const zip=spawnSync('python3',['-c',`import pathlib,zipfile\nroot=pathlib.Path('skill-pack')\nfor folder in root.iterdir():\n if folder.is_dir():\n  with zipfile.ZipFile('public/downloads/skills/'+folder.name+'.zip','w',zipfile.ZIP_DEFLATED) as z:\n   z.write(folder/'SKILL.md',folder.name+'/SKILL.md')\nwith zipfile.ZipFile('public/downloads/token-research-skills.zip','w',zipfile.ZIP_DEFLATED) as z:\n for f in root.glob('*/SKILL.md'): z.write(f,str(f.relative_to(root)))`],{stdio:'inherit'});if(zip.status!==0)throw new Error('Skill packaging failed');
console.log('Generated 8 complete Skills, individual/all archives, and 6 research templates.');
