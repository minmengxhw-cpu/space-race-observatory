import type { DailyItem, SiteConfig } from '../../lib/dualTypes'
import { Stars } from './Stars'

export function FocusCards({
  items,
  domains,
  onOpen,
}: {
  items: DailyItem[]
  domains: SiteConfig['domains']
  onOpen?: (id: string) => void
}) {
  if (!items.length) return null
  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 mb-3 px-0.5">
        <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
        <p className="font-display text-xs tracking-[0.28em] text-amber-300 uppercase font-bold">
          Today · 今日焦点
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const dom = domains.find((d) => d.id === it.domain)
          const cn = it.country === 'CN'
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onOpen?.(it.id)}
              className={`relative text-left rounded-2xl overflow-hidden border p-0 shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-transform active:scale-[0.99] ${
                cn
                  ? 'border-amber-400/40'
                  : 'border-cyan-400/40'
              }`}
            >
              <div
                className={`absolute inset-0 ${
                  cn
                    ? 'bg-gradient-to-br from-amber-500 via-amber-700 to-[#3b1d05]'
                    : 'bg-gradient-to-br from-cyan-400 via-cyan-700 to-[#042f3a]'
                }`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba,transparent_55%)] opacity-20" />
              <div className="relative z-[1] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-black/25 text-white/95">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cn ? 'bg-amber-200' : 'bg-cyan-200'}`}
                    />
                    {cn ? '中国' : '美国'} · {dom?.label ?? it.domain}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num text-[10px] text-white/50">#{i + 1}</span>
                    <Stars n={it.stars} light />
                  </div>
                </div>
                <p className="mt-3 text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                  {it.title}
                </p>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed line-clamp-3">
                  {it.fact}
                </p>
                <p className="mt-3 text-xs font-semibold text-white/60">点击展开意义与来源 →</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
