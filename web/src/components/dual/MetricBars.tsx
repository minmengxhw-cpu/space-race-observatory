import type { MetricRow } from '../../lib/dualTypes'

export function MetricBars({ metrics }: { metrics: MetricRow[] }) {
  return (
    <div className="space-y-3">
      {metrics.map((m) => {
        const max = Math.max(m.cn.value, m.us.value, 1)
        const cnPct = Math.round((m.cn.value / max) * 100)
        const usPct = Math.round((m.us.value / max) * 100)
        return (
          <div
            key={m.id}
            className="rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#0c1829] to-[#070f1a] p-4 shadow-lg"
          >
            <p className="text-base sm:text-lg font-bold text-white mb-3.5">{m.label}</p>
            <div className="space-y-3">
              <Bar side="中国 CN" display={m.cn.display} pct={cnPct} tone="cn" />
              <Bar side="美国 US" display={m.us.display} pct={usPct} tone="us" />
            </div>
            {m.note && (
              <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-800 pt-2">
                {m.note}
              </p>
            )}
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
  const bar =
    tone === 'cn'
      ? 'bg-gradient-to-r from-amber-500 to-amber-300'
      : 'bg-gradient-to-r from-cyan-600 to-cyan-300'
  const label = tone === 'cn' ? 'text-amber-300' : 'text-cyan-300'
  return (
    <div>
      <div className="flex justify-between items-baseline gap-2 text-xs sm:text-sm mb-1.5">
        <span className={`font-bold font-display tracking-wide ${label}`}>{side}</span>
        <span className="font-mono-num text-slate-100 font-semibold text-right">{display}</span>
      </div>
      <div className="h-3.5 rounded-full bg-slate-900/90 border border-slate-700/50 overflow-hidden">
        <div
          className={`h-full rounded-full ${bar} shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-700`}
          style={{ width: `${Math.max(pct, 6)}%` }}
        />
      </div>
    </div>
  )
}
