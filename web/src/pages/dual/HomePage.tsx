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
  updatingToday = false,
  scaffoldDate = null,
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
  /** Latest calendar day is empty scaffold — showing last filled day */
  updatingToday?: boolean
  scaffoldDate?: string | null
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

        {updatingToday && (
          <div
            className="mb-4 rounded-2xl border border-amber-400/35 bg-amber-400/10 px-4 py-3 flex items-start gap-3"
            role="status"
          >
            <span className="shrink-0 mt-0.5 rounded-lg bg-amber-400 text-void text-xs font-bold px-2 py-1">
              今日更新中
            </span>
            <p className="text-sm sm:text-base text-amber-100/90 leading-snug font-medium">
              {scaffoldDate && scaffoldDate !== daily.date
                ? `${scaffoldDate} 内容补全中，暂展示最近有内容的一天（${daily.date}）。`
                : '今日条目尚未补全，展示可用内容。宁可留白，不硬凑。'}
            </p>
          </div>
        )}

        {/* ========== 前：今日焦点 / 分领域大事 ========== */}
        <section className="mt-2">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="bg-cyan-400 text-void text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg">
              前
            </span>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              今日焦点 · 分领域对照
            </h2>
            <span className="text-xs sm:text-sm font-mono-num text-slate-500 shrink-0 ml-auto">
              L1
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-400 mb-3">
            过去约 24 小时大事放最前 · 点领域进入统一过程模板（对标最早航空航天对照）
          </p>

          <DomainChips domains={site.domains} value={filter} onChange={onFilter} sticky />

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
                    className="mt-2 w-full rounded-2xl min-h-[52px] text-sm sm:text-base font-bold
                      bg-white text-void active:scale-[0.99] transition-transform"
                  >
                    {d.label} · 全程过程 / 曲线 / 里程碑 →
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* ========== 后：入口到各领域「航天式」全程对照 ========== */}
        <section className="mt-12 border-t-2 border-slate-700 pt-8">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="bg-amber-400 text-void text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg">
              后
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              全程发展过程
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 mb-4 leading-relaxed">
            里程碑、曲线图、对比图放后面。每个板块同一过程：中美阶段路线 → 对比色块 →
            趋势曲线 → 硬指标 → 时间线（最早航空航天对照模板）
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {site.domains.map((d) => {
              const bg =
                d.id === 'ai'
                  ? 'bg-violet-500 text-white'
                  : d.id === 'aerospace'
                    ? 'bg-cyan-400 text-void'
                    : d.id === 'biopharma'
                      ? 'bg-emerald-400 text-void'
                      : 'bg-amber-400 text-void'
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onDomain(d.id)}
                  className={`${bg} rounded-2xl p-4 sm:p-5 min-h-[100px] text-left shadow-lg font-bold active:scale-[0.98] transition-transform`}
                >
                  <p className="text-xs opacity-70 tracking-widest uppercase">PROCESS</p>
                  <p className="mt-1 text-lg sm:text-xl font-display font-bold leading-tight">
                    {d.label}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm opacity-80">路线 · 曲线 · 节点 →</p>
                </button>
              )
            })}
          </div>
        </section>

        {daily.note && (
          <p className="mt-6 text-sm text-slate-500 leading-relaxed border-l-2 border-slate-700 pl-3">
            {daily.note}
          </p>
        )}

        <footer className="mt-10 space-y-3 border-t border-slate-800 pt-8">
          <div className="rounded-2xl bg-slate-900 border border-slate-700 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {site.disclaimer}
            </p>
            <p className="mt-2 text-xs text-slate-500 font-mono-num">
              每天 06:00 更新 · 飞书通知 · 站名 G2
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
