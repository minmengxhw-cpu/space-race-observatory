import type { DailyItem, DomainId, MetricsFile, MilestoneItem, SiteConfig } from '../../lib/dualTypes'
import { MetricBars } from '../../components/dual/MetricBars'
import { Stars } from '../../components/dual/Stars'

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

  return (
    <div className="relative min-h-[100svh]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-3.5 pb-12 sm:max-w-2xl sm:px-5">
        <button
          type="button"
          onClick={onBack}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 min-h-[44px] px-3 rounded-lg border border-cyan-400/20 bg-cyan-500/5"
        >
          ← 返回今日对照
        </button>

        <header className="mt-4 mb-6">
          <p className="font-display text-[11px] tracking-[0.3em] text-cyan-400 uppercase">
            Domain · L2 / L3
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white text-glow-cyan">
            {meta?.label ?? domainId}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            指标看板 · 里程碑 · 近期动态
          </p>
        </header>

        {domainId === 'aerospace' && onDeepAerospace && (
          <button
            type="button"
            onClick={onDeepAerospace}
            className="mb-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 text-void font-bold py-3.5 text-sm sm:text-base shadow-[0_0_32px_rgba(34,211,238,0.3)]"
          >
            打开航天深潜 · 型号墙 / 路线图 / 图鉴 →
          </button>
        )}

        <section className="mb-8">
          <SectionTitle kicker="01" title="指标看板" />
          {metrics ? (
            <MetricBars metrics={metrics.metrics} />
          ) : (
            <p className="text-sm text-slate-500">指标加载中…</p>
          )}
          {metrics && (
            <p className="mt-3 text-xs text-slate-600 font-mono-num">更新 {metrics.updatedAt} · 月度复核</p>
          )}
        </section>

        <section className="mb-8">
          <SectionTitle kicker="02" title="里程碑" />
          <ol className="space-y-2.5">
            {milestones
              .filter((m) => m.domain === domainId)
              .map((m) => {
                const us = m.side === 'US'
                const cn = m.side === 'CN'
                return (
                  <li
                    key={m.title}
                    className="rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#0c1829] to-[#070f1a] p-4 border-l-4"
                    style={{
                      borderLeftColor: us ? '#22d3ee' : cn ? '#f59e0b' : '#94a3b8',
                    }}
                  >
                    <p className="font-mono-num text-xs text-slate-400">{m.date}</p>
                    <p className="text-base sm:text-lg font-bold text-white mt-1">{m.title}</p>
                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{m.desc}</p>
                  </li>
                )
              })}
            {!milestones.some((m) => m.domain === domainId) && (
              <p className="text-sm text-slate-500">暂无里程碑</p>
            )}
          </ol>
        </section>

        <section>
          <SectionTitle kicker="03" title="近期动态" />
          <ul className="space-y-2.5">
            {recentItems.map((it) => {
              const cn = it.country === 'CN'
              return (
                <li
                  key={it.id}
                  className={`rounded-2xl p-4 border ${
                    cn
                      ? 'border-amber-400/25 bg-amber-500/5'
                      : 'border-cyan-400/25 bg-cyan-500/5'
                  }`}
                >
                  <div className="flex justify-between gap-2 items-center">
                    <span
                      className={`text-xs font-bold font-display tracking-wide ${
                        cn ? 'text-amber-300' : 'text-cyan-300'
                      }`}
                    >
                      {cn ? '中国' : '美国'}
                    </span>
                    <Stars n={it.stars} />
                  </div>
                  <p className="mt-1.5 font-bold text-white text-base">{it.title}</p>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">{it.fact}</p>
                  <a
                    href={it.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2.5 text-xs font-bold text-cyan-400"
                  >
                    来源 →
                  </a>
                </li>
              )
            })}
            {!recentItems.length && <p className="text-sm text-slate-500">暂无</p>}
          </ul>
        </section>
      </div>
    </div>
  )
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-mono-num text-cyan-400 text-sm font-bold">{kicker}</span>
      <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">{title}</h2>
    </div>
  )
}
