import type { DailyItem, DomainId, MetricsFile, MilestoneItem, SiteConfig } from '../../lib/dualTypes'
import { MetricBars } from '../../components/dual/MetricBars'
import { Stars } from '../../components/dual/Stars'

const TITLE_BG: Record<string, string> = {
  ai: 'bg-violet-500 text-white',
  aerospace: 'bg-cyan-400 text-void',
  biopharma: 'bg-emerald-400 text-void',
  future: 'bg-amber-400 text-void',
}

export function DomainPage({
  site,
  domainId,
  metrics,
  milestones,
  recentItems,
  onBack,
  onDeepAerospace,
}: {
  site: SiteConfig
  domainId: DomainId
  metrics: MetricsFile | null
  milestones: MilestoneItem[]
  recentItems: DailyItem[]
  onBack: () => void
  onDeepAerospace?: () => void
}) {
  const meta = site.domains.find((d) => d.id === domainId)
  const titleBg = TITLE_BG[domainId] || TITLE_BG.aerospace

  return (
    <div className="relative min-h-[100svh] bg-void">
      <div className="pointer-events-none fixed inset-0 starfield opacity-40" />

      <div className="relative z-10 max-w-lg mx-auto px-3 pb-14 sm:max-w-2xl sm:px-4">
        <button
          type="button"
          onClick={onBack}
          className="mt-4 min-h-[48px] px-4 rounded-2xl bg-slate-200 text-void text-base font-bold"
        >
          ← 返回今日
        </button>

        {/* 展厅大标题色块 */}
        <div className={`${titleBg} rounded-2xl mt-4 p-5 sm:p-6 shadow-xl`}>
          <p className="text-sm font-bold opacity-70 tracking-widest uppercase">展厅 · L2 / L3</p>
          <h1 className="mt-1 font-display text-4xl sm:text-5xl font-bold leading-none tracking-tight">
            {meta?.label ?? domainId}
          </h1>
          <p className="mt-3 text-base sm:text-lg font-bold opacity-80">
            指标看板 · 里程碑 · 近期动态
          </p>
        </div>

        {domainId === 'aerospace' && onDeepAerospace && (
          <button
            type="button"
            onClick={onDeepAerospace}
            className="mt-4 w-full min-h-[56px] rounded-2xl bg-white text-void text-lg font-bold shadow-lg"
          >
            航天深潜 · 型号墙 / 路线图 →
          </button>
        )}

        <section className="mt-8">
          <BlockTitle n="01" title="指标看板" />
          {metrics ? (
            <MetricBars metrics={metrics.metrics} />
          ) : (
            <p className="text-base text-slate-500">加载中…</p>
          )}
        </section>

        <section className="mt-8">
          <BlockTitle n="02" title="里程碑" />
          <ol className="space-y-2.5">
            {milestones
              .filter((m) => m.domain === domainId)
              .map((m) => {
                const us = m.side === 'US'
                const cn = m.side === 'CN'
                const chip = us
                  ? 'bg-cyan-400 text-void'
                  : cn
                    ? 'bg-amber-400 text-void'
                    : 'bg-slate-200 text-void'
                return (
                  <li key={m.title} className="rounded-2xl overflow-hidden shadow-md">
                    <div className={`${chip} px-4 py-2 flex justify-between items-center`}>
                      <span className="font-mono-num text-sm font-bold">{m.date}</span>
                      <span className="text-xs font-bold opacity-70">
                        {us ? '美国' : cn ? '中国' : '双方'}
                      </span>
                    </div>
                    <div className="bg-slate-900 px-4 py-3.5 border border-t-0 border-slate-700">
                      <p className="text-lg sm:text-xl font-bold text-white leading-snug">{m.title}</p>
                      <p className="mt-1.5 text-base text-slate-300 leading-relaxed">{m.desc}</p>
                    </div>
                  </li>
                )
              })}
          </ol>
        </section>

        <section className="mt-8">
          <BlockTitle n="03" title="近期动态" />
          <ul className="space-y-2.5">
            {recentItems.map((it) => {
              const cn = it.country === 'CN'
              return (
                <li
                  key={it.id}
                  className={`rounded-2xl p-4 ${
                    cn ? 'bg-amber-400 text-void' : 'bg-cyan-400 text-void'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-75">
                      {cn ? '中国' : '美国'}
                    </span>
                    <Stars n={it.stars} />
                  </div>
                  <p className="mt-2 text-xl font-bold leading-snug">{it.title}</p>
                  <p className="mt-1.5 text-base font-medium opacity-85 leading-relaxed">{it.fact}</p>
                  <a
                    href={it.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm font-bold underline"
                  >
                    来源 →
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}

function BlockTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-end gap-3 mb-3">
      <span className="font-mono-num text-3xl font-bold text-white/20 leading-none">{n}</span>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-none pb-0.5">
        {title}
      </h2>
    </div>
  )
}
