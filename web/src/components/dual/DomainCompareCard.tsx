import { useState } from 'react'
import type { DailyItem, SiteConfig } from '../../lib/dualTypes'
import { Stars } from './Stars'

/** 领域色块顶栏 — 科技馆展厅门楣 */
const HEADER: Record<string, string> = {
  ai: 'bg-violet-500 text-white',
  aerospace: 'bg-cyan-400 text-void',
  biopharma: 'bg-emerald-400 text-void',
  future: 'bg-amber-400 text-void',
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
  const header = HEADER[domainMeta.id] || HEADER.aerospace

  return (
    <article className="rounded-2xl overflow-hidden shadow-xl border border-white/5">
      {/* 大字门楣 */}
      <header className={`${header} px-4 py-4 sm:px-5 sm:py-5 flex items-center justify-between gap-3`}>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight leading-none">
          {domainMeta.label}
        </h2>
        {maxStars > 0 ? <Stars n={maxStars} light={domainMeta.id === 'ai'} /> : null}
      </header>

      {/* 中美对开大字块 */}
      <div className="grid grid-cols-2 bg-void">
        <Half
          label="中国"
          sub="CN"
          tone="cn"
          items={cnItems}
          openId={openId}
          onToggle={setOpenId}
        />
        <Half
          label="美国"
          sub="US"
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
  sub,
  tone,
  items,
  openId,
  onToggle,
}: {
  label: string
  sub: string
  tone: 'cn' | 'us'
  items: DailyItem[]
  openId: string | null
  onToggle: (id: string | null) => void
}) {
  const isCn = tone === 'cn'
  const empty = !items.length

  return (
    <div
      className={`min-h-[180px] border-t ${
        isCn
          ? 'bg-amber-950/40 border-amber-500/20 border-r border-r-white/5'
          : 'bg-cyan-950/40 border-cyan-500/20'
      }`}
    >
      {/* 国别大字标签 */}
      <div
        className={`px-3 pt-3 pb-2 border-b ${
          isCn ? 'border-amber-500/20' : 'border-cyan-500/20'
        }`}
      >
        <p
          className={`font-display text-xl sm:text-2xl font-bold leading-none ${
            isCn ? 'text-amber-300' : 'text-cyan-300'
          }`}
        >
          {label}
        </p>
        <p className="font-mono-num text-xs text-slate-500 mt-1 tracking-widest">{sub}</p>
      </div>

      <div className="p-3">
        {empty ? (
          <div className="py-10 text-center">
            <p className="text-lg font-bold text-slate-600">今日无大事</p>
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
                    className={`w-full text-left rounded-xl p-3 transition-colors ${
                      open
                        ? isCn
                          ? 'bg-amber-400 text-void'
                          : 'bg-cyan-400 text-void'
                        : 'bg-black/30 text-white'
                    }`}
                  >
                    {it.tag && (
                      <p
                        className={`text-xs font-bold mb-1 ${
                          open ? 'opacity-70' : isCn ? 'text-amber-400/90' : 'text-cyan-400/90'
                        }`}
                      >
                        {it.tag}
                      </p>
                    )}
                    <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
                      {it.title}
                    </p>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed ${
                        open ? 'opacity-85 font-medium' : 'text-slate-300'
                      }`}
                    >
                      {it.fact}
                    </p>
                    {open && (
                      <div className="mt-3 pt-3 border-t border-black/15">
                        <p className="text-sm font-medium leading-relaxed">
                          <span className="font-bold">意义 · </span>
                          {it.why}
                        </p>
                        <a
                          href={it.source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-sm font-bold underline underline-offset-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          来源 →
                        </a>
                      </div>
                    )}
                    {!open && (
                      <p className="mt-2 text-xs text-slate-500 font-medium">点按展开</p>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
