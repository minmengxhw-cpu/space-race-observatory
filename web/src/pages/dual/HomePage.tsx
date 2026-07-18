import type { DailyFile, DomainId, SiteConfig } from '../../lib/dualTypes'
import { DateBar } from '../../components/dual/DateBar'
import { DomainChips } from '../../components/dual/DomainChips'
import { FocusCards } from '../../components/dual/FocusCards'
import { DomainCompareCard } from '../../components/dual/DomainCompareCard'

export function HomePage({
  site,
  daily,
  dates,
  filter,
  onFilter,
  onPrev,
  onNext,
  onArchive,
  onDomain,
}: {
  site: SiteConfig
  daily: DailyFile
  dates: string[]
  filter: DomainId | 'all'
  onFilter: (v: DomainId | 'all') => void
  onPrev: () => void
  onNext: () => void
  onArchive: () => void
  onDomain: (d: DomainId) => void
}) {
  const focusItems = daily.items.filter((i) => daily.focus.includes(i.id))
  const domains =
    filter === 'all' ? site.domains : site.domains.filter((d) => d.id === filter)

  return (
    <div className="relative min-h-[100svh]">
      {/* 背景氛围 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-1/3 -left-20 w-[360px] h-[360px] rounded-full bg-amber-500/10 blur-[90px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-3.5 pb-12 sm:max-w-2xl sm:px-5">
        {/* Hero 品牌区 */}
        <header className="pt-5 sm:pt-8 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="status-dot" />
            <span className="font-display text-[11px] sm:text-xs tracking-[0.35em] text-cyan-400/90 uppercase">
              Daily · Dual Track
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wide text-glow-cyan leading-none">
                {site.name}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-slate-200 font-medium leading-snug">
                {site.tagline}
              </p>
            </div>
            <div className="shrink-0 text-right hidden xs:block">
              <p className="font-display text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                {site.nameEn}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 text-xs sm:text-sm text-cyan-200 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              中美同一坐标系
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-amber-400/20 bg-amber-500/10 text-xs sm:text-sm text-amber-100/90 font-medium">
              每天 3 分钟
            </span>
          </div>
          <div className="section-rule mt-5 max-w-xs origin-left" />
        </header>

        <DateBar
          date={daily.date}
          dates={dates}
          onPrev={onPrev}
          onNext={onNext}
          onOpenArchive={onArchive}
        />

        <FocusCards items={focusItems} domains={site.domains} />

        <div className="mt-5 mb-3">
          <p className="font-display text-[11px] tracking-[0.28em] text-slate-500 uppercase mb-2 px-0.5">
            Filter domains
          </p>
          <DomainChips domains={site.domains} value={filter} onChange={onFilter} sticky />
        </div>

        <div className="mt-4 space-y-4">
          {domains.map((d) => {
            const items = daily.items.filter((i) => i.domain === d.id)
            return (
              <div key={d.id} className="group">
                <DomainCompareCard domainMeta={d} items={items} />
                <button
                  type="button"
                  onClick={() => onDomain(d.id)}
                  className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-900/50 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-colors py-3 text-sm font-semibold text-slate-300 hover:text-cyan-200"
                >
                  {d.label} · 指标看板与里程碑 →
                </button>
              </div>
            )
          })}
        </div>

        {daily.note && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-5 px-1 border-l-2 border-slate-700 pl-3">
            {daily.note}
          </p>
        )}

        <footer className="mt-10 pt-6 border-t border-slate-800/90">
          <div className="hud-panel hud-corner rounded-xl p-4 sm:p-5">
            <p className="relative z-[2] text-sm text-slate-400 leading-relaxed">{site.disclaimer}</p>
            <div className="relative z-[2] mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onArchive}
                className="px-4 py-2.5 rounded-lg bg-cyan-400 text-void text-sm font-bold shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                归档日历
              </button>
              <span className="px-3 py-2.5 text-xs font-mono-num text-slate-500 self-center">
                L1 日更 · L2 月更 · L3 周观察
              </span>
            </div>
          </div>
          <p className="mt-6 text-center font-display text-[10px] tracking-[0.25em] text-slate-600">
            DUAL TRACK · 双轨 · 中美前沿
          </p>
        </footer>
      </div>
    </div>
  )
}
