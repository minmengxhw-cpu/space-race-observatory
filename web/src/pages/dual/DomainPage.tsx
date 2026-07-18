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
    <div className="max-w-lg mx-auto px-3 pb-10 sm:max-w-2xl">
      <button
        type="button"
        onClick={onBack}
        className="mt-3 text-sm font-semibold text-slate-400 min-h-[40px]"
      >
        ← 返回今日
      </button>
      <h1 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-white">
        {meta?.label ?? domainId}
      </h1>
      <p className="mt-1 text-sm text-slate-400">L2 指标看板 · L3 里程碑 · 近 30 日动态流</p>

      {domainId === 'aerospace' && onDeepAerospace && (
        <button
          type="button"
          onClick={onDeepAerospace}
          className="mt-3 w-full rounded-xl bg-cyan-400 text-void font-bold py-3 text-sm"
        >
          打开航天深潜页（型号墙 / 路线图 / 图鉴）→
        </button>
      )}

      <section className="mt-6">
        <h2 className="font-display text-lg font-bold text-white mb-3">指标看板</h2>
        {metrics ? (
          <MetricBars metrics={metrics.metrics} />
        ) : (
          <p className="text-sm text-slate-500">指标加载中…</p>
        )}
        {metrics && (
          <p className="mt-2 text-xs text-slate-600">更新于 {metrics.updatedAt} · 月度复核</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-white mb-3">里程碑</h2>
        <ol className="space-y-2">
          {milestones
            .filter((m) => m.domain === domainId)
            .map((m) => (
              <li key={m.title} className="rounded-xl border border-slate-700 p-3.5 bg-black/25">
                <p className="font-mono-num text-xs text-slate-400">{m.date}</p>
                <p className="text-base font-bold text-white mt-1">{m.title}</p>
                <p className="text-sm text-slate-300 mt-1">{m.desc}</p>
              </li>
            ))}
          {!milestones.some((m) => m.domain === domainId) && (
            <p className="text-sm text-slate-500">暂无</p>
          )}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-white mb-3">近期动态</h2>
        <ul className="space-y-2">
          {recentItems.map((it) => (
            <li
              key={it.id}
              className={`rounded-xl p-3.5 border ${
                it.country === 'CN'
                  ? 'border-red-500/30 bg-red-950/20'
                  : 'border-blue-500/30 bg-blue-950/20'
              }`}
            >
              <div className="flex justify-between gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {it.country === 'CN' ? '中国' : '美国'}
                </span>
                <Stars n={it.stars} />
              </div>
              <p className="mt-1 font-bold text-white">{it.title}</p>
              <p className="mt-1 text-sm text-slate-300">{it.fact}</p>
              <a
                href={it.source}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-xs text-cyan-400 font-semibold"
              >
                来源 →
              </a>
            </li>
          ))}
          {!recentItems.length && <p className="text-sm text-slate-500">暂无</p>}
        </ul>
      </section>
    </div>
  )
}
