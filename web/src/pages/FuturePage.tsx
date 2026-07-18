import { Section } from '../components/Section'
import { HeroStats } from '../components/shared/HeroStats'
import { UpdateBadge } from '../components/UpdateBadge'

type Data = {
  updatedAt: string
  note: string
  meta: { title: string; tagline: string }
  heroStats: {
    label: string
    value: string
    unit: string
    tone: 'cyan' | 'amber' | 'slate' | 'violet' | 'emerald'
    note?: string
  }[]
  industries: {
    id: string
    name: string
    cn: { goal: string; tools: string[]; strength: string; gap: string }
    us: { goal: string; tools: string[]; strength: string; gap: string }
  }[]
  policyCompare: { theme: string; cn: string; us: string }[]
}

export function FuturePage({ data }: { data: Data }) {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-10">
      <section className="pt-6 sm:pt-10 pb-4">
        <p className="font-display text-xs tracking-[0.28em] text-amber-400 uppercase font-semibold">
          15TH FYP · FUTURE INDUSTRIES
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">{data.meta.title}</h1>
        <p className="mt-2 text-base sm:text-xl text-slate-200">{data.meta.tagline}</p>
        <p className="mt-2 text-sm text-slate-500">{data.note}</p>
      </section>
      <UpdateBadge updatedAt={data.updatedAt} />
      <Section eyebrow="01" title="关键色块" desc="">
        <HeroStats items={data.heroStats} />
      </Section>
      <Section
        eyebrow="02"
        title="产业逐项对照"
        desc="每个产业：目标、政策工具、长板与短板。结构与航空航天页一致。"
      >
        <div className="space-y-4">
          {data.industries.map((ind, idx) => (
            <article key={ind.id} className="rounded-2xl border border-slate-600 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-700 px-4 py-3 flex items-center gap-3">
                <span className="font-mono-num font-bold text-void text-lg">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-void">{ind.name}</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <SideBlock side="中国 · 十五五方向" tone="amber" block={ind.cn} />
                <SideBlock side="美国 · 政策与产业" tone="cyan" block={ind.us} />
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="03" title="政策逻辑对照" desc="">
        <div className="space-y-3">
          {data.policyCompare.map((p) => (
            <div key={p.theme} className="rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-800 px-4 py-2.5 font-semibold text-white text-base sm:text-lg">
                {p.theme}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 bg-amber-500/10">
                  <p className="text-xs text-amber-400 mb-1">中国</p>
                  <p className="text-sm sm:text-base text-slate-100">{p.cn}</p>
                </div>
                <div className="p-4 bg-cyan-500/10">
                  <p className="text-xs text-cyan-400 mb-1">美国</p>
                  <p className="text-sm sm:text-base text-slate-100">{p.us}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}

function SideBlock({
  side,
  tone,
  block,
}: {
  side: string
  tone: 'cyan' | 'amber'
  block: { goal: string; tools: string[]; strength: string; gap: string }
}) {
  const bg = tone === 'cyan' ? 'bg-cyan-500/10' : 'bg-amber-500/10'
  const label = tone === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
  return (
    <div className={`p-4 sm:p-5 ${bg} border-t lg:border-t-0 lg:border-l border-slate-700`}>
      <p className={`text-xs font-display tracking-wider ${label} mb-2`}>{side}</p>
      <p className="text-base sm:text-lg font-semibold text-white leading-snug">{block.goal}</p>
      <p className="mt-3 text-xs font-display text-slate-400">政策/工具</p>
      <ul className="mt-1 space-y-1">
        {block.tools.map((t) => (
          <li key={t} className="text-sm text-slate-200">
            • {t}
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
        <p>
          <span className="text-emerald-400 font-semibold">长板：</span>
          {block.strength}
        </p>
        <p>
          <span className="text-rose-400 font-semibold">短板：</span>
          {block.gap}
        </p>
      </div>
    </div>
  )
}
