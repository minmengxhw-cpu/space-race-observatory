import type { Milestone } from '../types'

/** 关键节点：大卡片 + 横向历程条 */
export function Timeline({ items }: { items: Milestone[] }) {
  // 挑关键节点做顶部突出条
  const highlight = items.filter((m) =>
    ['reuse', 'constellation', 'launch'].includes(m.category),
  )

  return (
    <div className="space-y-5">
      {/* 横向关键节点色块 */}
      <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-1">
        <div className="flex gap-3 px-1 min-w-min">
          {highlight.map((m) => {
            const us = m.side === 'US'
            const cn = m.side === 'CN'
            const bg = us
              ? 'bg-cyan-500 text-void'
              : cn
                ? 'bg-amber-400 text-void'
                : 'bg-slate-200 text-void'
            return (
              <div
                key={`h-${m.date}-${m.title}`}
                className={`${bg} shrink-0 w-[70vw] max-w-[260px] sm:w-[220px] rounded-xl p-4 min-h-[140px] flex flex-col justify-between shadow-lg`}
              >
                <div>
                  <p className="font-mono-num text-sm font-bold opacity-80">{m.date}</p>
                  <p className="mt-1 text-xs font-display tracking-wider uppercase opacity-70">
                    {us ? 'SpaceX / 美' : cn ? '中国' : '双方'}
                  </p>
                </div>
                <p className="text-base sm:text-lg font-bold leading-snug mt-3">{m.title}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 完整列表 */}
      <div className="rounded-xl border border-slate-700/80 bg-panel/90 p-4 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl tracking-wide text-white font-semibold mb-5">
          完整发射与航天节点
        </h3>
        <ol className="space-y-4">
          {items.map((m) => {
            const us = m.side === 'US'
            const cn = m.side === 'CN'
            const bar = us ? 'bg-cyan-400' : cn ? 'bg-amber-400' : 'bg-slate-300'
            const tagBg = us
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
              : cn
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-500/20 text-slate-300 border-slate-400/40'

            return (
              <li
                key={`${m.date}-${m.title}`}
                className="relative pl-5 sm:pl-6 border border-slate-700/60 rounded-lg p-3.5 sm:p-4 bg-black/20"
              >
                <span className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg ${bar}`} />
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-mono-num text-base font-semibold text-white">{m.date}</span>
                  <span className={`px-2 py-0.5 rounded-md border text-xs sm:text-sm font-medium ${tagBg}`}>
                    {us ? '美国 / SpaceX' : cn ? '中国' : '全球 / 双方'}
                  </span>
                </div>
                <p className="mt-2 text-base sm:text-lg font-semibold text-slate-50 leading-snug">
                  {m.title}
                </p>
                <p className="mt-1.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {m.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
