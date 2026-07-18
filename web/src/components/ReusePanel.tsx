import type { ReuseSide } from '../types'

function Side({ data, accent }: { data: ReuseSide; accent: 'cyan' | 'amber' }) {
  const isCyan = accent === 'cyan'
  const title = isCyan ? 'text-cyan-300 text-glow-cyan' : 'text-amber-300 text-glow-amber'
  const stat = isCyan ? 'text-cyan-100' : 'text-amber-100'

  return (
    <div className={`hud-panel hud-corner p-5 sm:p-6 ${isCyan ? '' : 'hud-corner-amber hud-panel-amber'}`}>
      <h3 className={`relative z-[2] font-display text-lg tracking-wide ${title}`}>{data.title}</h3>
      <div className="relative z-[2] mt-4 grid grid-cols-3 gap-2">
        {data.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-sm bg-black/30 border border-slate-700/55 p-2.5 text-center"
          >
            <p className={`font-mono-num text-sm sm:text-lg font-semibold ${stat}`}>{s.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
      <ul className="relative z-[2] mt-5 space-y-2.5">
        {data.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
            <span className={isCyan ? 'text-cyan-400 shrink-0' : 'text-amber-400 shrink-0'}>▹</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ReusePanel({ spacex, china }: { spacex: ReuseSide; china: ReuseSide }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Side data={spacex} accent="cyan" />
      <Side data={china} accent="amber" />
    </div>
  )
}
