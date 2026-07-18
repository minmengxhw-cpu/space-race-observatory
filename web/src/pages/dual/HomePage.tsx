import type { DailyFile, DomainId, SiteConfig } from '../../lib/dualTypes'
import { DateBar } from '../../components/dual/DateBar'
import { DomainChips } from '../../components/dual/DomainChips'
import { DomainCompareCard } from '../../components/dual/DomainCompareCard'

/** 首页：当日中美大事对照优先；里程碑不放首页 */
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
  const focusIds = new Set(daily.focus)
  // 领域顺序：AI 优先，再航天/医药/未来
  const order = ['ai', 'aerospace', 'biopharma', 'future'] as DomainId[]
  const domains = (filter === 'all' ? site.domains : site.domains.filter((d) => d.id === filter))
    .slice()
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))

  const cnCount = daily.items.filter((i) => i.country === 'CN').length
  const usCount = daily.items.filter((i) => i.country === 'US').length

  return (
    <div className="relative min-h-[100svh] bg-void">
      <div className="pointer-events-none fixed inset-0 starfield opacity-45" />

      {/* 手机窄栏 / 桌面宽版 */}
      <div className="relative z-10 mx-auto w-full max-w-lg px-3 pb-16 sm:max-w-3xl sm:px-5 lg:max-w-6xl lg:px-6">
        {/* 紧凑门头 + 日期 —— 不抢内容 */}
        <header className="pt-5 sm:pt-7 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-display text-[11px] sm:text-xs tracking-[0.35em] text-cyan-400 font-bold uppercase">
              G2 · Daily Exhibit
            </p>
            <h1 className="mt-1 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
              G2
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-bold text-slate-100">
              {site.tagline || '中美前沿科技 · 每日对照'}
            </p>
            <p className="mt-1 text-sm sm:text-base text-slate-400 font-medium">
              {site.subtitle || '过去24小时大事 · 同一坐标系'} · 3 分钟
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <MiniStat label="中国" value={cnCount} tone="amber" />
            <MiniStat label="美国" value={usCount} tone="cyan" />
          </div>
        </header>

        <DateBar
          date={daily.date}
          dates={dates}
          onPrev={onPrev}
          onNext={onNext}
          onOpenArchive={onArchive}
        />

        {/* ========== 主内容：当日分领域中美对照（最前） ========== */}
        <section className="mt-2">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              今日分领域对照
            </h2>
            <span className="text-xs sm:text-sm font-mono-num text-slate-500 shrink-0">
              L1 动态
            </span>
          </div>

          <DomainChips domains={site.domains} value={filter} onChange={onFilter} sticky />

          {/* 桌面双列 / 手机单列 */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            {domains.map((d) => {
              const items = daily.items.filter((i) => i.domain === d.id)
              return (
                <div key={d.id} className="flex flex-col">
                  <DomainCompareCard
                    domainMeta={d}
                    items={items}
                    focusIds={focusIds}
                    defaultOpenFocus
                  />
                  <button
                    type="button"
                    onClick={() => onDomain(d.id)}
                    className="mt-2 w-full rounded-2xl min-h-[48px] sm:min-h-[52px] text-sm sm:text-base font-bold
                      bg-white text-void active:scale-[0.99] transition-transform"
                  >
                    {d.label} · 指标与里程碑 →
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {daily.note && (
          <p className="mt-6 text-sm text-slate-500 leading-relaxed border-l-2 border-slate-700 pl-3">
            {daily.note}
          </p>
        )}

        {/* 页脚靠后 */}
        <footer className="mt-12 space-y-3 border-t border-slate-800 pt-8">
          <div className="rounded-2xl bg-slate-900 border border-slate-700 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {site.disclaimer}
            </p>
            <p className="mt-2 text-xs text-slate-500 font-mono-num">
              数据计划：每天 06:00 更新 · 飞书通知
            </p>
          </div>
          <button
            type="button"
            onClick={onArchive}
            className="w-full min-h-[52px] rounded-2xl bg-cyan-400 text-void text-lg font-bold"
          >
            归档日历
          </button>
        </footer>
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'cyan' | 'amber'
}) {
  const bg = tone === 'cyan' ? 'bg-cyan-400 text-void' : 'bg-amber-400 text-void'
  return (
    <div className={`${bg} rounded-2xl px-4 py-3 min-w-[88px] shadow-lg`}>
      <p className="text-xs font-bold opacity-70">{label}</p>
      <p className="font-mono-num text-3xl font-bold leading-none mt-1">
        {value}
        <span className="text-sm ml-0.5 opacity-70">条</span>
      </p>
    </div>
  )
}
