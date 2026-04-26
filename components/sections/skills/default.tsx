import { Badge } from "../../ui/badge"
import { Section } from "../../ui/section"

interface SkillCard {
  name: string
  description: string
  tags: string[]
  version: string
}

interface SkillsProps {
  title?: string
  description?: string
  skills?: SkillCard[] | false
  className?: string
}

export default function Skills({
  title = "Academic skills already in the library",
  description = "These cards translate research know-how into reusable procedures. The grid is intentionally expandable, so new skills, screenshots, or category tags can be added later without redesigning the page.",
  skills = [
    {
      name: "ml-paper-writing",
      description:
        "Write publication-ready ML and AI papers from research notes, experiments, and outlines.",
      tags: ["Academic Writing", "NeurIPS", "ICML"],
      version: "v1.2.0",
    },
    {
      name: "ml-training-recipes",
      description:
        "Battle-tested PyTorch training recipes for LLMs, vision, diffusion, and applied science workloads.",
      tags: ["PyTorch", "Training", "Optimization"],
      version: "v1.0.0",
    },
    {
      name: "brainstorming-research-ideas",
      description:
        "Guided ideation workflows for problem discovery, framing, and candidate research directions.",
      tags: ["Research Ideation", "Brainstorming", "Problem Discovery"],
      version: "v1.0.0",
    },
    {
      name: "weights-and-biases",
      description:
        "Track experiments, visualize training runs, and keep research operations observable in real time.",
      tags: ["MLOps", "Weights & Biases", "WandB"],
      version: "v1.0.0",
    },
    {
      name: "academic-plotting",
      description:
        "Generate publication-quality charts and paper figures from notebooks, logs, and result tables.",
      tags: ["Academic Writing", "Visualization", "Matplotlib"],
      version: "v1.0.0",
    },
    {
      name: "pytorch-lightning",
      description:
        "Structure distributed training, trainer loops, and scalable experiments with Lightning patterns.",
      tags: ["PyTorch Lightning", "Training Framework", "Distributed Training"],
      version: "v1.0.0",
    },
    {
      name: "grpo-rl-training",
      description:
        "Expert guidance for GRPO and RL fine-tuning workflows across reasoning-heavy tasks.",
      tags: ["Post-Training", "Reinforcement Learning", "GRPO"],
      version: "v1.0.0",
    },
    {
      name: "creative-thinking-for-research",
      description:
        "Apply cognitive-science frameworks to analogical reasoning and research ideation.",
      tags: ["Creative Thinking", "Research Ideation", "Analogical Reasoning"],
      version: "v1.0.0",
    },
    {
      name: "instructor",
      description:
        "Extract structured outputs from LLMs with validation, retries, and schema-backed reasoning.",
      tags: ["Prompt Engineering", "Instructor", "Structured Output"],
      version: "v1.0.0",
    },
    {
      name: "langchain",
      description:
        "Build agentic research workflows with tools, chains, and retrieval-augmented pipelines.",
      tags: ["Agents", "LangChain", "RAG"],
      version: "v1.0.0",
    },
    {
      name: "transformer-lens-interpretability",
      description:
        "Support mechanistic interpretability workflows with activation patching and representation analysis.",
      tags: [
        "Mechanistic Interpretability",
        "TransformerLens",
        "Activation Patching",
      ],
      version: "v1.0.0",
    },
    {
      name: "peft-fine-tuning",
      description:
        "Parameter-efficient fine-tuning playbooks for LoRA, QLoRA, and adjacent adaptation methods.",
      tags: ["Fine-Tuning", "PEFT", "LoRA"],
      version: "v1.0.0",
    },
  ],
  className,
}: SkillsProps) {
  return (
    <Section id="skills" className={className}>
      <div className="mx-auto max-w-container space-y-8">
        <div className="space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-brand/30 bg-brand/10 text-brand"
          >
            Skill library
          </Badge>
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-[820px] text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        {skills !== false && skills.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((skill) => (
              <article
                key={skill.name}
                className="group rounded-[2rem] border border-border/60 bg-card/72 p-5 shadow-lg shadow-black/10 transition-transform duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="outline"
                    className="border-brand/25 bg-brand/10 text-brand"
                  >
                    Official
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {skill.version}
                  </span>
                </div>
                <h3 className="mt-5 text-xl leading-tight font-semibold text-balance">
                  {skill.name}
                </h3>
                <p className="mt-4 min-h-[96px] text-sm leading-7 text-muted-foreground">
                  {skill.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={`${skill.name}-${tag}`}
                      className="rounded-full border border-border/60 bg-background/75 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <article className="rounded-[2rem] border border-dashed border-brand/35 bg-background/35 p-5">
              <Badge
                variant="outline"
                className="border-brand/25 bg-brand/10 text-brand"
              >
                Placeholder
              </Badge>
              <h3 className="mt-5 text-xl leading-tight font-semibold">
                Next academic skill
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Leave this card for the next research workflow, benchmark pack,
                or domain-specific SOP that you want to surface publicly.
              </p>
              <div className="mt-5 rounded-[1.25rem] border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Add future skill name, one-line summary, tags, and version here.
              </div>
            </article>
          </div>
        )}
      </div>
    </Section>
  )
}
