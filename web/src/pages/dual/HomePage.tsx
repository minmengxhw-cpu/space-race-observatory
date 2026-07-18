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

  // 当日各国条数，做成科技馆入口大字块
  const cnCount = daily.items.filter((i) => i.country === 'CN').length
  const usCount = daily.items.filter((i) => i.country === 'US').length
  const star3 = daily.items.filter((i) => i.stars >= 3).length

  return (
    <div className="relative min-h-[100svh] bg-void">
      <div className="pointer-events-none fixed inset-0 starfield opacity-50" />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-500/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-3 pb-14 sm:max-w-2xl sm:px-4">
        {/* ========== 科技馆门头：超大字 ========== */}
        <header className="pt-6 sm:pt-8 pb-5">
          <p className="font-display text-xs sm:text-sm tracking-[0.4em] text-cyan-400 font-bold uppercase">
            G2 · DAILY EXHIBIT
          </p>
          <h1 className="mt-2 font-display text-[3.25rem] sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white">
            {site.name}
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
            {site.tagline}
          </p>
          <p className="mt-2 text-base sm:text-lg text-slate-400 font-medium">
            {site.subtitle} · 每天 3 分钟
          </p>
        </header>

        {/* ========== 科技馆大字色块墙 ========== */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
          <MuseumBlock
            label="中国动态"
            value={String(cnCount)}
            unit="条"
            tone="amber"
          />
          <MuseumBlock
            label="美国动态"
            value={String(usCount)}
            unit="条"
            tone="cyan"
          />
          <MuseumBlock
            label="今日焦点"
            value={String(star3 || focusItems.length)}
            unit="件"
            tone="violet"
          />
          <MuseumBlock
            label="领域覆盖"
            value={String(new Set(daily.items.map((i) => i.domain)).size)}
            unit="/ 4"
            tone="slate"
          />
        </div>

        <DateBar
          date={daily.date}
          dates={dates}
          onPrev={onPrev}
          onNext={onNext}
          onOpenArchive={onArchive}
        />

        <FocusCards items={focusItems} domains={site.domains} />

        <div className="mt-6 mb-3">
          <p className="font-display text-sm font-bold tracking-[0.2em] text-white mb-2.5 uppercase">
            选择展厅
          </p>
          <DomainChips domains={site.domains} value={filter} onChange={onFilter} sticky />
        </div>

        <div className="mt-4 space-y-5">
          {domains.map((d) => {
            const items = daily.items.filter((i) => i.domain === d.id)
            return (
              <div key={d.id}>
                <DomainCompareCard domainMeta={d} items={items} />
                <button
                  type="button"
                  onClick={() => onDomain(d.id)}
                  className="mt-2.5 w-full rounded-2xl min-h-[52px] text-base font-bold
                    bg-white text-void active:scale-[0.99] transition-transform
                    shadow-[0_8px_32px_rgba(255,255,255,0.08)]"
                >
                  进入{d.label}展厅 →
                </button>
              </div>
            )
          })}
        </div>

        {daily.note && (
          <p className="mt-6 text-sm text-slate-500 leading-relaxed px-1">{daily.note}</p>
        )}

        <footer className="mt-10 space-y-3">
          <div className="rounded-2xl bg-slate-900 border border-slate-700 p-4">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {site.disclaimer}
            </p>
          </div>
          <button
            type="button"
            onClick={onArchive}
            className="w-full min-h-[52px] rounded-2xl bg-cyan-400 text-void text-lg font-bold"
          >
            归档日历
          </button>
          <p className="text-center font-display text-xs tracking-[0.35em] text-slate-600 pt-2">
            DUAL TRACK EXHIBIT
          </p>
        </footer>
      </div>
    </div>
  )
}

/** 科技馆式大字色块 */
function MuseumBlock({
  label,
  value,
  unit,
  tone,
}: {
  label: string
  value: string
  unit: string
  tone: 'cyan' | 'amber' | 'violet' | 'slate'
}) {
  const bg =
    tone === 'cyan'
      ? 'bg-cyan-400 text-void'
      : tone === 'amber'
        ? 'bg-amber-400 text-void'
        : tone === 'violet'
          ? 'bg-violet-500 text-white'
          : 'bg-slate-200 text-void'

  return (
    <div
      className={`${bg} rounded-2xl p-4 sm:p-5 min-h-[120px] sm:min-h-[132px] flex flex-col justify-between shadow-lg`}
    >
      <p className="text-sm sm:text-base font-bold opacity-80 leading-tight">{label}</p>
      <div className="flex items-end gap-1.5 mt-2">
        <span className="font-mono-num text-4xl sm:text-5xl font-bold leading-none tracking-tight">
          {value}
        </span>
        <span className="text-base sm:text-lg font-bold opacity-75 mb-1">{unit}</span>
      </div>
    </div>
  )
}
