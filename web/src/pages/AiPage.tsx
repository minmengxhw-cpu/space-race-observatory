import { Section } from '../components/Section'
import { HeroStats } from '../components/shared/HeroStats'
import { AxisCompare } from '../components/shared/AxisCompare'
import { UpdateBadge } from '../components/UpdateBadge'

type AiData = {
  updatedAt: string
  disclaimer: string
  meta: { title: string; titleEn: string; tagline: string }
  heroStats: {
    label: string
    value: string
    unit: string
    tone: 'cyan' | 'amber' | 'slate' | 'violet' | 'emerald'
    note?: string
  }[]
  modelArenas: {
    id: string
    name: string
    desc: string
    models: {
      id: string
      name: string
      org: string
      country: string
      tier: string
      style: string
      strengths: string[]
      weaknesses: string[]
      status: string
    }[]
  }[]
  compareAxes: { axis: string; us: string; cn: string; edge?: string }[]
  stackLayers: { layer: string; us: string[]; cn: string[] }[]
  roadmap: {
    us: { phase: string; title: string; years: string; items: string[] }[]
    cn: { phase: string; title: string; years: string; items: string[] }[]
  }
  milestones: { date: string; side: string; title: string; desc: string }[]
}

export function AiPage({ data }: { data: AiData }) {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-10">
      <section className="pt-6 sm:pt-10 pb-4">
        <p className="font-display text-xs sm:text-sm tracking-[0.28em] text-violet-400 uppercase font-semibold">
          CORE BATTLEFIELD · AI
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
          {data.meta.title}
        </h1>
        <p className="mt-2 text-base sm:text-xl text-slate-200 max-w-3xl">{data.meta.tagline}</p>
      </section>

      <UpdateBadge updatedAt={data.updatedAt} />

      <Section eyebrow="01 · SNAPSHOT" title="关键色块" desc="一眼抓住 G2 人工智能格局。">
        <HeroStats items={data.heroStats} />
      </Section>

      <Section
        eyebrow="02 · MODELS"
        title="头部模型比拼"
        desc="闭源前沿 vs 开源/高效路线。卡片标注阵营、风格与长短板。"
      >
        <div className="space-y-8">
          {data.modelArenas.map((arena) => (
            <div key={arena.id}>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">{arena.name}</h3>
              <p className="mt-1 text-sm sm:text-base text-slate-400 mb-4">{arena.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {arena.models.map((m) => {
                  const us = m.country === 'US'
                  return (
                    <article
                      key={m.id}
                      className={`rounded-xl border overflow-hidden ${
                        us
                          ? 'border-cyan-400/40 bg-cyan-500/5'
                          : 'border-amber-400/40 bg-amber-500/5'
                      }`}
                    >
                      <div
                        className={`px-4 py-3 flex items-center justify-between gap-2 ${
                          us ? 'bg-cyan-500 text-void' : 'bg-amber-400 text-void'
                        }`}
                      >
                        <div>
                          <p className="font-display text-lg sm:text-xl font-bold">{m.name}</p>
                          <p className="text-sm font-medium opacity-80">
                            {m.org} · {us ? '美国' : '中国'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 rounded-md bg-black/20 font-mono-num text-sm font-bold">
                            Tier {m.tier}
                          </span>
                          <p className="text-xs mt-1 font-semibold">{m.status}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm sm:text-base font-semibold text-slate-100">{m.style}</p>
                        <div className="mt-3 grid grid-cols-1 gap-3">
                          <div>
                            <p className="text-xs font-display text-emerald-400 mb-1">长板</p>
                            <ul className="space-y-1">
                              {m.strengths.map((s) => (
                                <li key={s} className="text-sm sm:text-base text-slate-200 flex gap-2">
                                  <span className="text-emerald-400">+</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-display text-rose-400 mb-1">约束</p>
                            <ul className="space-y-1">
                              {m.weaknesses.map((s) => (
                                <li key={s} className="text-sm sm:text-base text-slate-300 flex gap-2">
                                  <span className="text-rose-400">−</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="03 · AXES" title="五维对表" desc="能力、开源、算力、应用、监管。">
        <AxisCompare rows={data.compareAxes} />
      </Section>

      <Section eyebrow="04 · STACK" title="技术栈分层" desc="从芯片到应用的整棵 AI 树。">
        <div className="space-y-3">
          {data.stackLayers.map((layer) => (
            <div key={layer.layer} className="rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-violet-600/80 px-4 py-2.5">
                <p className="font-display text-base sm:text-lg font-bold text-white">{layer.layer}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 bg-cyan-500/10 border-b sm:border-b-0 sm:border-r border-slate-700">
                  <p className="text-xs text-cyan-400 font-display mb-2">美国</p>
                  <ul className="space-y-1">
                    {layer.us.map((x) => (
                      <li key={x} className="text-sm sm:text-base text-slate-100">
                        • {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-amber-500/10">
                  <p className="text-xs text-amber-400 font-display mb-2">中国</p>
                  <ul className="space-y-1">
                    {layer.cn.map((x) => (
                      <li key={x} className="text-sm sm:text-base text-slate-100">
                        • {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="05 · ROADMAP" title="技术路线图" desc="美方生态扩张 vs 中方开源与算力适配。">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Road col="美国 / 美资前沿" tone="cyan" stages={data.roadmap.us} />
          <Road col="中国路径" tone="amber" stages={data.roadmap.cn} />
        </div>
      </Section>

      <Section eyebrow="06 · NODES" title="关键节点" desc="从 ChatGPT 时刻到 Agent 下半场。">
        <ol className="space-y-3">
          {data.milestones.map((m) => {
            const us = m.side === 'US'
            const cn = m.side === 'CN'
            const bar = us ? 'bg-cyan-400' : cn ? 'bg-amber-400' : 'bg-violet-400'
            return (
              <li
                key={m.title}
                className="relative pl-5 border border-slate-700 rounded-xl p-4 bg-black/25"
              >
                <span className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${bar}`} />
                <p className="font-mono-num text-sm text-slate-400">{m.date}</p>
                <p className="mt-1 text-lg font-bold text-white">{m.title}</p>
                <p className="mt-1 text-sm sm:text-base text-slate-300">{m.desc}</p>
              </li>
            )
          })}
        </ol>
      </Section>

      <p className="text-sm text-slate-500 leading-relaxed">{data.disclaimer}</p>
    </main>
  )
}

function Road({
  col,
  tone,
  stages,
}: {
  col: string
  tone: 'cyan' | 'amber'
  stages: { phase: string; title: string; years: string; items: string[] }[]
}) {
  const head = tone === 'cyan' ? 'bg-cyan-500 text-void' : 'bg-amber-400 text-void'
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className={`${head} px-4 py-3`}>
        <p className="font-display text-lg font-bold">{col}</p>
      </div>
      <ol className="p-4 space-y-3">
        {stages.map((s) => (
          <li key={s.phase} className="flex gap-3">
            <span
              className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono-num font-bold text-sm ${
                tone === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
              }`}
            >
              {s.phase}
            </span>
            <div>
              <p className="font-semibold text-base text-white">
                {s.title}{' '}
                <span className="text-slate-400 font-mono-num text-sm font-normal">{s.years}</span>
              </p>
              <ul className="mt-1 space-y-0.5">
                {s.items.map((i) => (
                  <li key={i} className="text-sm text-slate-300">
                    • {i}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
