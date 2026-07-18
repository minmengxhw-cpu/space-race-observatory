import type { MetricRow } from '../../lib/dualTypes'

export function MetricBars({ metrics }: { metrics: MetricRow[] }) {
  return (
    <div className="space-y-4">
      {metrics.map((m) => {
        const max = Math.max(m.cn.value, m.us.value, 1)
        const cnPct = Math.round((m.cn.value / max) * 100)
        const usPct = Math.round((m.us.value / max) * 100)
        return (
          <div key={m.id} className="rounded-xl border border-slate-700 bg-black/25 p-3.5">
            <p className="text-sm sm:text-base font-bold text-white mb-3">{m.label}</p>
            <div className="space-y-2.5">
              <Bar side="CN" display={m.cn.display} pct={cnPct} tone="cn" />
              <Bar side="US" display={m.us.display} pct={usPct} tone="us" />
            </div>
            {m.note && <p className="mt-2 text-xs text-slate-500 leading-relaxed">{m.note}</p>}
          </div>
        )
      })}
    </div>
  )
}

function Bar({
  side,
  display,
  pct,
  tone,
}: {
  side: string
  display: string
  pct: number
  tone: 'cn' | 'us'
}) {
  const bar = tone === 'cn' ? 'bg-red-500' : 'bg-blue-500'
  const label = tone === 'cn' ? 'text-red-400' : 'text-blue-400'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={`font-bold ${label}`}>{side}</span>
        <span className="font-mono-num text-slate-200 font-semibold">{display}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.max(pct, 4)}%` }} />
      </div>
    </div>
  )
}
