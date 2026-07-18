import { Section } from '../components/Section'
import type { SectorId } from '../lib/routes'

type HubData = {
  updatedAt: string
  meta: { title: string; titleEn: string; tagline: string; positioning: string }
  disclaimer: string
  sectors: {
    id: string
    name: string
    nameEn: string
    summary: string
    usLead: string
    cnLead: string
    kpis: { label: string; value: string }[]
    accent: string
    priority: number
  }[]
  treeLayers: { id: string; name: string; nodes: string[] }[]
}

const ACCENT_BTN: Record<string, string> = {
  violet: 'from-violet-500 to-violet-800 border-violet-300/40',
  cyan: 'from-cyan-500 to-cyan-800 border-cyan-300/40',
  emerald: 'from-emerald-500 to-emerald-800 border-emerald-300/40',
  amber: 'from-amber-500 to-amber-800 border-amber-300/40',
}

export function HubPage({
  data,
  onOpen,
}: {
  data: HubData
  onOpen: (id: SectorId) => void
}) {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-10">
      <section className="pt-8 sm:pt-12 pb-6">
        <p className="font-display text-xs sm:text-sm tracking-[0.28em] text-cyan-400 uppercase font-semibold">
          G2 TECH TREE
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white leading-tight text-glow-cyan">
          {data.meta.title}
        </h1>
        <p className="mt-2 font-display text-sm sm:text-base tracking-[0.15em] text-slate-400 uppercase">
          {data.meta.titleEn}
        </p>
        <p className="mt-4 text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
          {data.meta.tagline}
        </p>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">{data.meta.positioning}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-violet-500 text-white text-sm font-bold">
            优先：人工智能
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-200 text-sm font-semibold border border-cyan-400/30">
            航空航天
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-200 text-sm font-semibold border border-emerald-400/30">
            生物医药
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-200 text-sm font-semibold border border-amber-400/30">
            十五五未来产业
          </span>
        </div>
      </section>

      <Section
        id="sectors"
        eyebrow="SECTORS"
        title="四大赛道入口"
        desc="每个赛道按「航空航天页」同构：大色块关键数、路线图、节点与中美对表。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.sectors
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onOpen(s.id as SectorId)}
                className={`text-left rounded-2xl border bg-gradient-to-br ${
                  ACCENT_BTN[s.accent] || ACCENT_BTN.cyan
                } p-5 sm:p-6 shadow-xl active:scale-[0.99] transition-transform`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-display tracking-[0.2em] uppercase opacity-80">
                      {s.nameEn}
                    </p>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                      {s.name}
                      {s.id === 'ai' && (
                        <span className="ml-2 text-sm align-middle bg-white/20 px-2 py-0.5 rounded-md">
                          核心
                        </span>
                      )}
                    </h3>
                  </div>
                  <span className="text-white/90 text-2xl">→</span>
                </div>
                <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">{s.summary}</p>
                <div className="mt-4 grid grid-cols-1 gap-1.5 text-sm">
                  <p>
                    <span className="opacity-70">美方长板：</span>
                    <span className="font-semibold">{s.usLead}</span>
                  </p>
                  <p>
                    <span className="opacity-70">中方长板：</span>
                    <span className="font-semibold">{s.cnLead}</span>
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.kpis.map((k) => (
                    <span
                      key={k.label}
                      className="text-xs sm:text-sm px-2.5 py-1 rounded-md bg-black/25 text-white/95"
                    >
                      {k.label} · {k.value}
                    </span>
                  ))}
                </div>
              </button>
            ))}
        </div>
      </Section>

      <Section
        id="tree"
        eyebrow="TECH TREE"
        title="G2 科技树分层"
        desc="从底座到场景到制度：中美竞争是「整棵树」而不是单一产品。"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.treeLayers.map((layer, i) => (
            <div
              key={layer.id}
              className="rounded-xl border border-slate-600/80 bg-panel p-4 min-h-[180px]"
            >
              <p className="font-mono-num text-cyan-400 text-sm font-bold">
                L{i + 1}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-white">{layer.name}</h3>
              <ul className="mt-3 space-y-1.5">
                {layer.nodes.map((n) => (
                  <li key={n} className="text-sm sm:text-base text-slate-200 flex gap-2">
                    <span className="text-cyan-400">•</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-sm text-slate-500 leading-relaxed pb-8">{data.disclaimer}</p>
    </main>
  )
}
