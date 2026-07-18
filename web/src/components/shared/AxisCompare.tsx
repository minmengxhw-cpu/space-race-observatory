export type AxisRow = {
  axis: string
  us: string
  cn: string
  edge?: string
}

export function AxisCompare({ rows }: { rows: AxisRow[] }) {
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.axis} className="rounded-xl border border-slate-700/80 overflow-hidden">
          <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between gap-2">
            <p className="font-semibold text-base sm:text-lg text-white">{r.axis}</p>
            {r.edge && (
              <span className="text-[11px] font-mono-num px-2 py-0.5 rounded-md bg-black/30 text-slate-300">
                {edgeLabel(r.edge)}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="px-4 py-3.5 bg-cyan-500/10 border-b sm:border-b-0 sm:border-r border-slate-700/60">
              <p className="text-xs font-display tracking-wider text-cyan-400 mb-1">美国</p>
              <p className="text-sm sm:text-base text-slate-100 leading-snug font-medium">{r.us}</p>
            </div>
            <div className="px-4 py-3.5 bg-amber-500/10">
              <p className="text-xs font-display tracking-wider text-amber-400 mb-1">中国</p>
              <p className="text-sm sm:text-base text-slate-100 leading-snug font-medium">{r.cn}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function edgeLabel(edge: string) {
  switch (edge) {
    case 'US':
      return '当前美方领先'
    case 'CN':
    case 'CN_SPEED':
      return '当前中方占优/速度'
    case 'TIE':
    case 'TIE_EVOLVING':
      return '互有胜负'
    case 'DIFF':
      return '路径不同'
    default:
      return edge
  }
}
