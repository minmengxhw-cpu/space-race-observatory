import type { Milestone } from '../types'

export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <div className="hud-panel hud-corner p-5 sm:p-6 overflow-x-auto">
      <h3 className="font-display text-lg tracking-wide text-slate-100 mb-6">关键里程碑</h3>
      <ol className="relative min-w-[640px] sm:min-w-0 border-l border-slate-700/80 ml-3 space-y-6">
        {items.map((m) => {
          const color =
            m.side === 'US' ? 'bg-cyan-400' : m.side === 'CN' ? 'bg-amber-400' : 'bg-slate-300'
          const tag =
            m.side === 'US' ? '美国 / SpaceX' : m.side === 'CN' ? '中国' : '全球 / 双方'

          return (
            <li key={`${m.date}-${m.title}`} className="pl-6 relative">
              <span
                className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_10px_currentColor]`}
              />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono-num text-slate-400">{m.date}</span>
                <span className="px-1.5 py-0.5 border border-slate-600/80 text-slate-400">{tag}</span>
                <span className="text-slate-600 uppercase tracking-wider">{m.category}</span>
              </div>
              <p className="mt-1 text-sm sm:text-base text-slate-100 font-medium">{m.title}</p>
              <p className="mt-1 text-sm text-slate-400 leading-relaxed">{m.description}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
