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
    <section className="mb-6">
      <p className="font-display text-sm sm:text-base font-bold tracking-[0.15em] text-white mb-3 uppercase">
        今日焦点
      </p>
      <div className="flex flex-col gap-3">
        {items.map((it) => {
          const dom = domains.find((d) => d.id === it.domain)
          const cn = it.country === 'CN'
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onOpen?.(it.id)}
              className={`text-left rounded-2xl p-5 sm:p-6 min-h-[140px] flex flex-col justify-between shadow-xl active:scale-[0.99] transition-transform ${
                cn ? 'bg-amber-400 text-void' : 'bg-cyan-400 text-void'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold opacity-80">
                  {cn ? '中国' : '美国'} · {dom?.label ?? it.domain}
                </span>
                <Stars n={it.stars} light={false} />
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                  {it.title}
                </p>
                <p className="mt-2 text-base sm:text-lg font-medium leading-snug opacity-85 line-clamp-2">
                  {it.fact}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
