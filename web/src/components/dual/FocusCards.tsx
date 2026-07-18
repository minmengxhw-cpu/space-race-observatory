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
    <section className="mb-4">
      <p className="text-xs font-display tracking-[0.2em] text-amber-400 uppercase font-bold mb-2">
        今日焦点
      </p>
      <div className="flex flex-col gap-2">
        {items.map((it) => {
          const dom = domains.find((d) => d.id === it.domain)
          const cn = it.country === 'CN'
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onOpen?.(it.id)}
              className={`text-left rounded-2xl p-4 border-2 ${
                cn
                  ? 'border-red-500/50 bg-gradient-to-br from-red-600 to-red-900'
                  : 'border-blue-400/50 bg-gradient-to-br from-blue-600 to-blue-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold bg-black/25 px-2 py-0.5 rounded-md">
                  {cn ? '中国' : '美国'} · {dom?.label ?? it.domain}
                </span>
                <Stars n={it.stars} />
              </div>
              <p className="mt-2 text-lg sm:text-xl font-bold text-white leading-snug">{it.title}</p>
              <p className="mt-1.5 text-sm text-white/90 leading-relaxed line-clamp-2">{it.fact}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
