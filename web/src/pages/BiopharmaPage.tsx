import { Section } from '../components/Section'
import { HeroStats } from '../components/shared/HeroStats'
import { AxisCompare } from '../components/shared/AxisCompare'
import { UpdateBadge } from '../components/UpdateBadge'

type Data = {
  updatedAt: string
  meta: { title: string; tagline: string }
  heroStats: {
    label: string
    value: string
    unit: string
    tone: 'cyan' | 'amber' | 'slate' | 'violet' | 'emerald'
    note?: string
  }[]
  compareAxes: { axis: string; us: string; cn: string; edge?: string }[]
  hotTracks: { name: string; us: string; cn: string }[]
  roadmap: {
    us: { phase: string; title: string; items: string[] }[]
    cn: { phase: string; title: string; items: string[] }[]
  }
  milestones: { date: string; side: string; title: string; desc: string }[]
}

export function BiopharmaPage({ data }: { data: Data }) {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-10">
      <section className="pt-6 sm:pt-10 pb-4">
        <p className="font-display text-xs tracking-[0.28em] text-emerald-400 uppercase font-semibold">
          BIOPHARMA
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">{data.meta.title}</h1>
        <p className="mt-2 text-base sm:text-xl text-slate-200">{data.meta.tagline}</p>
      </section>
      <UpdateBadge updatedAt={data.updatedAt} />
      <Section eyebrow="01" title="关键色块" desc="">
        <HeroStats items={data.heroStats} />
      </Section>
      <Section eyebrow="02" title="五维对表" desc="原研、临床、监管、支付、国际化。">
        <AxisCompare rows={data.compareAxes} />
      </Section>
      <Section eyebrow="03" title="热点赛道" desc="ADC、细胞基因、代谢、器械 AI。">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.hotTracks.map((t) => (
            <div key={t.name} className="rounded-xl border border-emerald-500/30 overflow-hidden">
              <div className="bg-emerald-500 text-void px-4 py-2.5 font-display font-bold text-lg">
                {t.name}
              </div>
              <div className="grid grid-cols-1 divide-y divide-slate-700">
                <div className="p-3 bg-cyan-500/10">
                  <p className="text-xs text-cyan-400 mb-1">美国</p>
                  <p className="text-sm sm:text-base text-slate-100">{t.us}</p>
                </div>
                <div className="p-3 bg-amber-500/10">
                  <p className="text-xs text-amber-400 mb-1">中国</p>
                  <p className="text-sm sm:text-base text-slate-100">{t.cn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="04" title="路线图" desc="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SimpleRoad title="美国" tone="cyan" stages={data.roadmap.us} />
          <SimpleRoad title="中国" tone="amber" stages={data.roadmap.cn} />
        </div>
      </Section>
      <Section eyebrow="05" title="关键节点" desc="">
        <ol className="space-y-3">
          {data.milestones.map((m) => (
            <li key={m.title} className="rounded-xl border border-slate-700 p-4 bg-black/20">
              <p className="font-mono-num text-sm text-slate-400">{m.date}</p>
              <p className="text-lg font-bold text-white mt-1">{m.title}</p>
              <p className="text-sm sm:text-base text-slate-300 mt-1">{m.desc}</p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  )
}

function SimpleRoad({
  title,
  tone,
  stages,
}: {
  title: string
  tone: 'cyan' | 'amber'
  stages: { phase: string; title: string; items: string[] }[]
}) {
  const head = tone === 'cyan' ? 'bg-cyan-500 text-void' : 'bg-amber-400 text-void'
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className={`${head} px-4 py-3 font-display font-bold text-lg`}>{title}</div>
      <ol className="p-4 space-y-3">
        {stages.map((s) => (
          <li key={s.phase}>
            <p className="font-semibold text-white">
              <span className="font-mono-num text-emerald-400 mr-2">{s.phase}</span>
              {s.title}
            </p>
            <ul className="mt-1 ml-1">
              {s.items.map((i) => (
                <li key={i} className="text-sm text-slate-300">
                  • {i}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
