import type { MetricRow } from '../../lib/dualTypes'

export function MetricBars({ metrics }: { metrics: MetricRow[] }) {
  return (
    <div className="space-y-3">
      {metrics.map((m) => {
        const max = Math.max(m.cn.value, m.us.value, 1)
        const cnPct = Math.round((m.cn.value / max) * 100)
        const usPct = Math.round((m.us.value / max) * 100)
        return (
          <div key={m.id} className="rounded-2xl overflow-hidden shadow-lg">
            {/* 指标名 — 大字色块顶 */}
            <div className="bg-slate-200 text-void px-4 py-3">
              <p className="text-lg sm:text-xl font-bold leading-tight">{m.label}</p>
            </div>
            <div className="bg-void border border-t-0 border-slate-700 p-4 space-y-4">
              <SideBar label="中国" display={m.cn.display} pct={cnPct} tone="cn" />
              <SideBar label="美国" display={m.us.display} pct={usPct} tone="us" />
              {m.note && (
                <p className="text-sm text-slate-500 leading-relaxed pt-1 border-t border-slate-800">
                  {m.note}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SideBar({
  label,
  display,
  pct,
  tone,
}: {
  label: string
  display: string
  pct: number
  tone: 'cn' | 'us'
}) {
  const chip = tone === 'cn' ? 'bg-amber-400 text-void' : 'bg-cyan-400 text-void'
  const bar = tone === 'cn' ? 'bg-amber-400' : 'bg-cyan-400'
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`${chip} text-sm font-bold px-2.5 py-1 rounded-lg`}>{label}</span>
        <span className="font-mono-num text-base sm:text-lg font-bold text-white text-right">
          {display}
        </span>
      </div>
      <div className="h-4 rounded-full bg-slate-900 overflow-hidden">
        <div
          className={`h-full rounded-full ${bar}`}
          style={{ width: `${Math.max(pct, 8)}%` }}
        />
      </div>
    </div>
  )
}
