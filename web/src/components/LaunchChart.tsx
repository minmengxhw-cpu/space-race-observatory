import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { CompareMode, YearlyLaunch } from '../types'

interface Props {
  data: YearlyLaunch[]
  compareMode: CompareMode
}

export function LaunchChart({ data, compareMode }: Props) {
  const chartData = data.map((d) => ({
    ...d,
    usOrSx: compareMode === 'spacex' ? d.spacex : d.us,
  }))

  const leftName = compareMode === 'spacex' ? 'SpaceX' : '美国'

  return (
    <div className="hud-panel hud-corner p-3 sm:p-6">
      <div className="relative z-[2] flex flex-col gap-2 mb-3 sm:mb-5">
        <div>
          <h3 className="font-display text-base sm:text-lg tracking-wide text-slate-100">
            年度轨道发射趋势
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
            {leftName} vs 中国 · 2018–2026（2026=YTD）
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs font-mono-num">
          <span className="text-cyan-300">● {leftName}</span>
          <span className="text-amber-300">● 中国</span>
          {compareMode === 'spacex' && <span className="text-slate-500">┄ 美国合计</span>}
        </div>
      </div>

      {/* 手机横向可轻滑查看，高度更紧凑 */}
      <div className="relative z-[2] -mx-1 sm:mx-0 overflow-x-auto overscroll-x-contain">
        <div className="h-[240px] sm:h-[380px] min-w-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.1)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="#475569"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(71,85,105,0.5)' }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(10,20,36,0.96)',
                  border: '1px solid rgba(34,211,238,0.28)',
                  borderRadius: 8,
                  color: '#e2e8f0',
                  fontSize: 12,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: 4 }}
                formatter={(value, name) => {
                  const v = typeof value === 'number' ? value : Number(value ?? 0)
                  return [`${v} 次`, String(name)]
                }}
                labelFormatter={(label, payload) => {
                  const row = payload?.[0]?.payload as YearlyLaunch | undefined
                  return row?.partial ? `${label}（YTD）` : String(label)
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 4 }}
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="usOrSx"
                name={leftName}
                stroke="#22d3ee"
                fill="url(#gCyan)"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#22d3ee', strokeWidth: 0 }}
                activeDot={{ r: 5, stroke: '#0e7490', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="china"
                name="中国"
                stroke="#f59e0b"
                fill="url(#gAmber)"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#f59e0b', strokeWidth: 0 }}
                activeDot={{ r: 5, stroke: '#b45309', strokeWidth: 2 }}
              />
              {compareMode === 'spacex' && (
                <Line
                  type="monotone"
                  dataKey="us"
                  name="美国合计"
                  stroke="#64748b"
                  strokeDasharray="5 4"
                  strokeWidth={1.5}
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
