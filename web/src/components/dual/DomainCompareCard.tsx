import { useState } from 'react'
import type { DailyItem, SiteConfig } from '../../lib/dualTypes'
import { Stars } from './Stars'

const HEADER: Record<string, string> = {
  ai: 'bg-violet-500 text-white',
  aerospace: 'bg-cyan-400 text-void',
  biopharma: 'bg-emerald-400 text-void',
  future: 'bg-amber-400 text-void',
}

export function DomainCompareCard({
  domainMeta,
  items,
  focusIds,
  defaultOpenFocus,
}: {
  domainMeta: SiteConfig['domains'][0]
  items: DailyItem[]
  focusIds?: Set<string>
  /** 焦点条目默认展开，避免字被裁切 */
  defaultOpenFocus?: boolean
}) {
  const focus = focusIds ?? new Set<string>()
  const initialOpen =
    defaultOpenFocus && items.find((i) => focus.has(i.id))?.id
      ? items.find((i) => focus.has(i.id))!.id
      : null
  const [openId, setOpenId] = useState<string | null>(initialOpen)

  const cnItems = items.filter((i) => i.country === 'CN')
  const usItems = items.filter((i) => i.country === 'US')
  const maxStars = Math.max(0, ...items.map((i) => i.stars))
  const header = HEADER[domainMeta.id] || HEADER.aerospace
  const isFocusDomain = items.some((i) => focus.has(i.id))

  return (
    <article className="rounded-2xl overflow-hidden shadow-xl border border-white/5 flex-1 flex flex-col">
      <header
        className={`${header} px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 shrink-0`}
      >
        <div className="min-w-0">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight truncate">
            {domainMeta.label}
          </h2>
          {isFocusDomain && (
            <p className="text-xs sm:text-sm font-bold opacity-75 mt-0.5">含今日焦点</p>
          )}
        </div>
        {maxStars > 0 ? (
          <Stars n={maxStars} light={domainMeta.id === 'ai'} />
        ) : null}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 bg-void flex-1">
        <Half
          label="中国"
          sub="CN"
          tone="cn"
          items={cnItems}
          openId={openId}
          onToggle={setOpenId}
          focusIds={focus}
        />
        <Half
          label="美国"
          sub="US"
          tone="us"
          items={usItems}
          openId={openId}
          onToggle={setOpenId}
          focusIds={focus}
          borderLeft
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
  focusIds,
  borderLeft,
}: {
  label: string
  sub: string
  tone: 'cn' | 'us'
  items: DailyItem[]
  openId: string | null
  onToggle: (id: string | null) => void
  focusIds: Set<string>
  borderLeft?: boolean
}) {
  const isCn = tone === 'cn'
  const empty = !items.length

  return (
    <div
      className={`min-h-[160px] flex flex-col ${
        isCn ? 'bg-amber-950/35' : 'bg-cyan-950/35'
      } ${borderLeft ? 'sm:border-l border-white/5' : ''} border-t border-white/5`}
    >
      <div
        className={`px-3 sm:px-4 pt-3 pb-2 border-b shrink-0 ${
          isCn ? 'border-amber-500/15' : 'border-cyan-500/15'
        }`}
      >
        <p
          className={`font-display text-lg sm:text-xl font-bold leading-none ${
            isCn ? 'text-amber-300' : 'text-cyan-300'
          }`}
        >
          {label}
          <span className="ml-2 font-mono-num text-xs text-slate-500 font-normal tracking-widest">
            {sub}
          </span>
        </p>
      </div>

      <div className="p-3 sm:p-3.5 flex-1">
        {empty ? (
          <div className="py-8 text-center rounded-xl border border-dashed border-slate-700/80">
            <p className="text-base font-bold text-slate-600">今日无大事</p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {items.map((it) => {
              const open = openId === it.id
              const isFocus = focusIds.has(it.id)
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => onToggle(open ? null : it.id)}
                    className={`w-full text-left rounded-xl p-3 sm:p-3.5 transition-colors ${
                      open
                        ? isCn
                          ? 'bg-amber-400 text-void'
                          : 'bg-cyan-400 text-void'
                        : isFocus
                          ? isCn
                            ? 'bg-amber-500/20 ring-2 ring-amber-400/50 text-white'
                            : 'bg-cyan-500/20 ring-2 ring-cyan-400/50 text-white'
                          : 'bg-black/35 text-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      {isFocus && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            open ? 'bg-black/15' : 'bg-amber-400 text-void'
                          }`}
                        >
                          焦点
                        </span>
                      )}
                      {it.tag && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            open
                              ? 'bg-black/10 opacity-80'
                              : isCn
                                ? 'bg-amber-500/20 text-amber-200'
                                : 'bg-cyan-500/20 text-cyan-200'
                          }`}
                        >
                          {it.tag}
                        </span>
                      )}
                    </div>

                    {/* 标题：完整显示，不裁切 */}
                    <p className="text-base sm:text-lg font-bold leading-snug break-words">
                      {it.title}
                    </p>
                    {/* 事实：完整显示，不 line-clamp */}
                    <p
                      className={`mt-2 text-sm sm:text-[15px] leading-relaxed break-words whitespace-normal ${
                        open ? 'font-medium opacity-90' : 'text-slate-300'
                      }`}
                    >
                      {it.fact}
                    </p>

                    {/* 意义始终可读：展开后完整展示；收起时也显示前两行提示可点 */}
                    {open ? (
                      <div className="mt-3 pt-3 border-t border-black/15">
                        <p className="text-sm sm:text-[15px] font-medium leading-relaxed break-words">
                          <span className="font-bold">意义 · </span>
                          {it.why}
                        </p>
                        <a
                          href={it.source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2.5 text-sm font-bold underline underline-offset-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          来源 →
                        </a>
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500 font-medium">
                        点开查看意义与来源
                      </p>
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
