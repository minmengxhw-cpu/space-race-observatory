import { useState } from 'react'
import type { DailyItem, SiteConfig } from '../../lib/dualTypes'
import { Stars } from './Stars'

export function DomainCompareCard({
  domainMeta,
  items,
}: {
  domainMeta: SiteConfig['domains'][0]
  items: DailyItem[]
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const cnItems = items.filter((i) => i.country === 'CN')
  const usItems = items.filter((i) => i.country === 'US')
  const maxStars = Math.max(0, ...items.map((i) => i.stars))

  return (
    <article className="rounded-2xl border border-slate-700/90 overflow-hidden bg-panel shadow-lg mb-3">
      <header className="flex items-center justify-between px-3.5 py-3 bg-slate-800/90">
        <h2 className="font-display text-base sm:text-lg font-bold text-white">{domainMeta.label}</h2>
        {maxStars > 0 ? <Stars n={maxStars} /> : <span className="text-xs text-slate-500">—</span>}
      </header>
      <div className="grid grid-cols-2 divide-x divide-slate-700/80">
        <Half
          label="CN 中国"
          tone="cn"
          items={cnItems}
          openId={openId}
          onToggle={setOpenId}
        />
        <Half
          label="US 美国"
          tone="us"
          items={usItems}
          openId={openId}
          onToggle={setOpenId}
        />
      </div>
    </article>
  )
}

function Half({
  label,
  tone,
  items,
  openId,
  onToggle,
}: {
  label: string
  tone: 'cn' | 'us'
  items: DailyItem[]
  openId: string | null
  onToggle: (id: string | null) => void
}) {
  const head = tone === 'cn' ? 'text-red-400' : 'text-blue-400'
  const empty = !items.length

  return (
    <div className={`p-3 min-h-[140px] ${tone === 'cn' ? 'bg-red-950/20' : 'bg-blue-950/20'}`}>
      <p className={`text-xs font-display font-bold tracking-wider ${head} mb-2`}>{label}</p>
      {empty ? (
        <p className="text-sm text-slate-500 leading-relaxed py-6 text-center">今日无大事</p>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => {
            const open = openId === it.id
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => onToggle(open ? null : it.id)}
                  className="w-full text-left"
                >
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">{it.title}</p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">{it.fact}</p>
                  {open && (
                    <div className="mt-2 pt-2 border-t border-slate-700/60">
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <span className="text-amber-400/90 font-semibold">意义 · </span>
                        {it.why}
                      </p>
                      <a
                        href={it.source}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-block mt-2 text-xs font-semibold underline underline-offset-2 ${
                          tone === 'cn' ? 'text-red-300' : 'text-blue-300'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        来源 →
                      </a>
                    </div>
                  )}
                  {!open && (
                    <p className="mt-1 text-[11px] text-slate-500">点开看意义与来源</p>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
