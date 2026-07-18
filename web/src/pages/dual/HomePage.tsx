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
    <div className="max-w-lg mx-auto px-3 pb-8 sm:max-w-2xl">
      <header className="pt-3 pb-1">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {site.name}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{site.tagline}</p>
          </div>
          <p className="text-[11px] font-mono-num text-slate-500 shrink-0">{site.nameEn}</p>
        </div>
        <p className="mt-2 text-sm text-slate-300">{site.subtitle} · 手机 3 分钟刷完</p>
      </header>

      <DateBar
        date={daily.date}
        dates={dates}
        onPrev={onPrev}
        onNext={onNext}
        onOpenArchive={onArchive}
      />

      <FocusCards items={focusItems} domains={site.domains} />

      <DomainChips domains={site.domains} value={filter} onChange={onFilter} sticky />

      <div className="mt-3">
        {domains.map((d) => {
          const items = daily.items.filter((i) => i.domain === d.id)
          return (
            <div key={d.id}>
              <DomainCompareCard domainMeta={d} items={items} />
              <button
                type="button"
                onClick={() => onDomain(d.id)}
                className="w-full mb-4 -mt-1 text-center text-sm font-semibold text-slate-400 py-2"
              >
                查看 {d.label} 指标与里程碑 →
              </button>
            </div>
          )
        })}
      </div>

      {daily.note && (
        <p className="text-xs text-slate-600 leading-relaxed mt-2 px-0.5">{daily.note}</p>
      )}

      <footer className="mt-6 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-500 leading-relaxed">
        <p>{site.disclaimer}</p>
        <button type="button" onClick={onArchive} className="mt-3 text-cyan-400 font-semibold">
          打开归档日历 →
        </button>
      </footer>
    </div>
  )
}
