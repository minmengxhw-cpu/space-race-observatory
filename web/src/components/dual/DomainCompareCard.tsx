import { useState } from 'react'
import type { DailyItem, SiteConfig } from '../../lib/dualTypes'
import { Stars } from './Stars'

const DOMAIN_ACCENT: Record<string, string> = {
  ai: 'from-violet-500/20 via-transparent to-transparent border-violet-400/30',
  aerospace: 'from-cyan-500/20 via-transparent to-transparent border-cyan-400/30',
  biopharma: 'from-emerald-500/20 via-transparent to-transparent border-emerald-400/30',
  future: 'from-amber-500/20 via-transparent to-transparent border-amber-400/30',
}

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
  const accent = DOMAIN_ACCENT[domainMeta.id] || DOMAIN_ACCENT.aerospace

  return (
    <article
      className={`relative rounded-2xl overflow-hidden border bg-gradient-to-b from-[#0c1829] to-[#070f1a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${accent.split(' ').slice(-1)[0]}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`} />

      {/* 角标装饰 */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl pointer-events-none" />

      <header className="relative z-[1] flex items-center justify-between px-4 py-3.5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
            {domainMeta.label}
          </h2>
          <span className="hidden sm:inline text-[10px] font-display tracking-[0.2em] text-slate-500 uppercase">
            {domainMeta.id}
          </span>
        </div>
        {maxStars > 0 ? <Stars n={maxStars} /> : null}
      </header>

      <div className="relative z-[1] grid grid-cols-2">
        <Half
          label="中国 CN"
          tone="cn"
          items={cnItems}
          openId={openId}
          onToggle={setOpenId}
        />
        <div className="absolute left-1/2 top-10 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-500/40 to-transparent pointer-events-none" />
        <Half
          label="美国 US"
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
  const isCn = tone === 'cn'
  const empty = !items.length

  return (
    <div className={`p-3 sm:p-4 min-h-[160px] ${isCn ? 'pr-3.5' : 'pl-3.5'}`}>
      <div className="flex items-center gap-1.5 mb-3">
        <span
          className={`w-1.5 h-1.5 rounded-full ${isCn ? 'bg-amber-400' : 'bg-cyan-400'}`}
        />
        <p
          className={`font-display text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase ${
            isCn ? 'text-amber-300' : 'text-cyan-300'
          }`}
        >
          {label}
        </p>
      </div>

      {empty ? (
        <div className="rounded-xl border border-dashed border-slate-700/80 bg-black/20 py-8 px-2 text-center">
          <p className="text-sm text-slate-500 font-medium">今日无大事</p>
          <p className="text-[11px] text-slate-600 mt-1">留白 · 不强行凑</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => {
            const open = openId === it.id
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => onToggle(open ? null : it.id)}
                  className={`w-full text-left rounded-xl p-2.5 sm:p-3 transition-colors border ${
                    open
                      ? isCn
                        ? 'bg-amber-500/10 border-amber-400/30'
                        : 'bg-cyan-500/10 border-cyan-400/30'
                      : 'bg-black/25 border-transparent hover:border-slate-600/60'
                  }`}
                >
                  {it.tag && (
                    <span
                      className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded mb-1.5 ${
                        isCn
                          ? 'bg-amber-500/15 text-amber-200/90'
                          : 'bg-cyan-500/15 text-cyan-200/90'
                      }`}
                    >
                      {it.tag}
                    </span>
                  )}
                  <p className="text-sm sm:text-[15px] font-bold text-white leading-snug">
                    {it.title}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {it.fact}
                  </p>
                  {open && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/10">
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <span className="text-amber-300 font-semibold">意义 · </span>
                        {it.why}
                      </p>
                      <a
                        href={it.source}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 mt-2.5 text-xs font-bold ${
                          isCn ? 'text-amber-300' : 'text-cyan-300'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        查看来源
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  )}
                  {!open && (
                    <p className="mt-1.5 text-[11px] text-slate-500">展开意义 / 来源</p>
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
