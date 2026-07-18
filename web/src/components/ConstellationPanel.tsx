import type { Constellation } from '../types'

function formatNum(n: number) {
  return n.toLocaleString('en-US')
}

export function ConstellationPanel({ items }: { items: Constellation[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {items.map((c) => {
        const isUS = c.country === 'US'
        const max = Math.max(c.plannedApprox, c.deployedApprox, c.activeApprox, 1)
        const deployedPct = Math.min(100, (c.deployedApprox / max) * 100)
        const activePct = Math.min(100, (c.activeApprox / max) * 100)

        return (
          <article
            key={c.id}
            className={`hud-panel hud-corner p-4 sm:p-5 ${
              isUS ? '' : 'hud-corner-amber hud-panel-amber'
            }`}
          >
            <div className="relative z-[2] flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p
                  className={`font-display text-[10px] tracking-[0.2em] uppercase ${
                    isUS ? 'text-cyan-400' : 'text-amber-400'
                  }`}
                >
                  {isUS ? 'US / SPACEX' : 'CHINA'}
                </p>
                <h3 className="mt-1 font-display text-lg sm:text-xl text-slate-50 truncate">{c.name}</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">{c.operator}</p>
              </div>
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-1 rounded-sm border border-slate-600/80 text-slate-300 whitespace-nowrap bg-black/20 shrink-0">
                {c.status}
              </span>
            </div>

            <div className="relative z-[2] mt-4 sm:mt-5 space-y-3">
              <Bar
                label="累计部署"
                value={formatNum(c.deployedApprox)}
                pct={deployedPct}
                color={isUS ? 'bg-cyan-400' : 'bg-amber-400'}
              />
              <Bar
                label="在轨活跃"
                value={formatNum(c.activeApprox)}
                pct={activePct}
                color={isUS ? 'bg-cyan-300/85' : 'bg-amber-300/85'}
              />
              <Bar
                label="规划规模"
                value={formatNum(c.plannedApprox)}
                pct={100}
                color={isUS ? 'bg-cyan-500/35' : 'bg-amber-500/35'}
                dashed
              />
            </div>
            <p className="relative z-[2] mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
              {c.note}
            </p>
          </article>
        )
      })}
    </div>
  )
}

function Bar({
  label,
  value,
  pct,
  color,
  dashed,
}: {
  label: string
  value: string
  pct: number
  color: string
  dashed?: boolean
}) {
  return (
    <div>
      <div className="flex justify-between text-[11px] sm:text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono-num text-slate-100">{value}</span>
      </div>
      <div
        className={`h-1.5 rounded-full bg-slate-800/90 overflow-hidden ${
          dashed ? 'ring-1 ring-dashed ring-slate-600/80' : ''
        }`}
      >
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${Math.max(pct, 1.5)}%` }}
        />
      </div>
    </div>
  )
}
