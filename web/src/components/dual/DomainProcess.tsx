import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export type ProcessStage = {
  phase: string
  title: string
  years: string
  items: string[]
}

export type ProcessData = {
  domain: string
  title: string
  subtitle: string
  cnTitle: string
  usTitle: string
  cnSubtitle: string
  usSubtitle: string
  cnStages: ProcessStage[]
  usStages: ProcessStage[]
  compareChips: { title: string; left: string; right: string }[]
  trend: { year: string; us: number; cn: number; label?: string }[]
  trendNote?: string
  trendUnit?: string
}

/**
 * 各板块共用的「航空航天式」全程对照：
 * 路线阶段双栏 → 对比色块 → 趋势曲线
 */
export function DomainProcess({ data }: { data: ProcessData }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-200 text-void p-4 sm:p-5">
        <p className="text-xs font-bold opacity-50 tracking-widest uppercase">PROCESS · 全程对照</p>
        <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold leading-tight">{data.title}</h3>
        <p className="mt-2 text-sm sm:text-base font-medium opacity-80">{data.subtitle}</p>
      </div>

      {/* 双路线 — 对标最早航天页 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <RoadColumn
          title={data.usTitle}
          subtitle={data.usSubtitle}
          tone="cyan"
          stages={data.usStages}
        />
        <RoadColumn
          title={data.cnTitle}
          subtitle={data.cnSubtitle}
          tone="amber"
          stages={data.cnStages}
        />
      </div>

      {/* 对比要点大色块 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.compareChips.map((c) => (
          <div key={c.title} className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
            <div className="bg-white text-void px-4 py-2.5">
              <p className="font-display text-base sm:text-lg font-bold">{c.title}</p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-slate-800">
              <div className="px-4 py-3 bg-cyan-500/15">
                <p className="text-xs font-bold text-cyan-300 mb-1">美国</p>
                <p className="text-sm sm:text-base font-semibold text-white leading-snug">{c.left}</p>
              </div>
              <div className="px-4 py-3 bg-amber-500/15">
                <p className="text-xs font-bold text-amber-300 mb-1">中国</p>
                <p className="text-sm sm:text-base font-semibold text-white leading-snug">{c.right}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 趋势曲线 */}
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-[#0c1829] to-[#070f1a] p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
          <div>
            <p className="font-display text-xs tracking-[0.25em] text-cyan-400 uppercase font-bold">
              Trend
            </p>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              中美对照曲线
            </h4>
          </div>
          <div className="flex gap-3 text-xs font-mono-num">
            <span className="text-cyan-300">● 美国</span>
            <span className="text-amber-300">● 中国</span>
          </div>
        </div>
        <div className="h-[240px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="procCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="procAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} width={40} />
              <Tooltip
                contentStyle={{
                  background: '#0a1424',
                  border: '1px solid rgba(34,211,238,0.3)',
                  borderRadius: 12,
                  color: '#e2e8f0',
                  fontSize: 13,
                }}
                formatter={(value, name) => [
                  `${value}${data.trendUnit ? ` ${data.trendUnit}` : ''}`,
                  String(name),
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Area
                type="monotone"
                dataKey="us"
                name="美国"
                stroke="#22d3ee"
                fill="url(#procCyan)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#22d3ee' }}
              />
              <Area
                type="monotone"
                dataKey="cn"
                name="中国"
                stroke="#f59e0b"
                fill="url(#procAmber)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#f59e0b' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {data.trendNote && (
          <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">{data.trendNote}</p>
        )}
      </div>
    </div>
  )
}

function RoadColumn({
  title,
  subtitle,
  tone,
  stages,
}: {
  title: string
  subtitle: string
  tone: 'cyan' | 'amber'
  stages: ProcessStage[]
}) {
  const head = tone === 'cyan' ? 'bg-cyan-400 text-void' : 'bg-amber-400 text-void'
  const phase =
    tone === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
  const line = tone === 'cyan' ? 'bg-cyan-500/30' : 'bg-amber-500/30'

  return (
    <div className="rounded-2xl border border-slate-700 overflow-hidden shadow-xl bg-[#070f1a]">
      <div className={`${head} px-4 py-4`}>
        <h4 className="font-display text-lg sm:text-xl font-bold leading-tight">{title}</h4>
        <p className="mt-1 text-sm font-semibold opacity-80">{subtitle}</p>
      </div>
      <ol className="p-3 sm:p-4 space-y-3">
        {stages.map((s, i) => (
          <li key={s.phase} className="relative flex gap-3">
            {i < stages.length - 1 && (
              <span className={`absolute left-[17px] top-10 bottom-[-12px] w-0.5 ${line}`} />
            )}
            <span
              className={`relative z-[1] shrink-0 w-9 h-9 rounded-xl ${phase} font-mono-num text-sm font-bold flex items-center justify-center`}
            >
              {s.phase}
            </span>
            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="text-base sm:text-lg font-bold text-white">{s.title}</p>
                <p className="text-sm text-slate-400 font-mono-num">{s.years}</p>
              </div>
              <ul className="mt-1.5 space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300 flex gap-2 leading-snug">
                    <span className={tone === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
