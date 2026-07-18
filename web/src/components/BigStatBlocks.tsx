import { useCountUp } from '../hooks/useCountUp'
import type { CompareMode, SeedData, TimeMode } from '../types'

/** 全站首屏大色块：关键数字一眼可见 */
export function BigStatBlocks({
  data,
  timeMode,
  compareMode,
}: {
  data: SeedData
  timeMode: TimeMode
  compareMode: CompareMode
}) {
  const y2025 = data.yearlyLaunches.find((y) => y.year === 2025)
  const y2026 = data.yearlyLaunches.find((y) => y.year === 2026)

  let left = 86
  let right = 48
  let leftUnit = '次 · 2026 YTD'
  let rightUnit = '次 · 2026 YTD'

  if (timeMode === 'past') {
    left = compareMode === 'spacex' ? (y2025?.spacex ?? 167) : (y2025?.us ?? 193)
    right = y2025?.china ?? 93
    leftUnit = '次 · 2025 全年'
    rightUnit = '次 · 2025 全年'
  } else if (timeMode === 'present') {
    left = compareMode === 'spacex' ? (y2026?.spacex ?? 86) : (y2026?.us ?? 95)
    right = y2026?.china ?? 48
  } else {
    left = 145
    right = 93
    leftUnit = '次 · 2026 目标'
    rightUnit = '次 · 参照峰值年'
  }

  const leftLabel = compareMode === 'spacex' ? 'SpaceX 发射' : '美国发射'

  const blocks = [
    {
      label: leftLabel,
      value: left,
      unit: leftUnit,
      tone: 'cyan' as const,
      sub: timeMode === 'future' ? '公开目标区间' : '轨道发射次数',
    },
    {
      label: '中国发射',
      value: right,
      unit: rightUnit,
      tone: 'amber' as const,
      sub: timeMode === 'future' ? '对照用历史峰值' : '轨道发射次数',
    },
    {
      label: 'Falcon 一级着陆',
      value: 638,
      unit: '次成功',
      tone: 'cyan' as const,
      sub: '约 98% 尝试成功率',
    },
    {
      label: 'Starlink 在轨工作',
      value: 10832,
      unit: '星',
      tone: 'slate' as const,
      sub: 'J. McDowell 量级',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {blocks.map((b, i) => (
        <StatBlock key={b.label} {...b} index={i} />
      ))}
    </div>
  )
}

function StatBlock({
  label,
  value,
  unit,
  tone,
  sub,
  index,
}: {
  label: string
  value: number
  unit: string
  tone: 'cyan' | 'amber' | 'slate'
  sub: string
  index: number
}) {
  const n = useCountUp(value, 1000 + index * 80)
  const display =
    value >= 10000 ? n.toLocaleString('en-US') : value >= 1000 ? n.toLocaleString('en-US') : String(n)

  const bg =
    tone === 'cyan'
      ? 'bg-gradient-to-br from-cyan-500 to-cyan-700 text-void'
      : tone === 'amber'
        ? 'bg-gradient-to-br from-amber-400 to-amber-700 text-void'
        : 'bg-gradient-to-br from-slate-600 to-slate-800 text-white'

  const soft =
    tone === 'cyan'
      ? 'text-cyan-950/70'
      : tone === 'amber'
        ? 'text-amber-950/70'
        : 'text-slate-300'

  return (
    <div
      className={`${bg} rounded-xl p-4 sm:p-5 min-h-[132px] sm:min-h-[150px] flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
    >
      <p className={`text-sm sm:text-base font-semibold leading-snug ${soft}`}>{label}</p>
      <div>
        <p className="font-mono-num text-3xl sm:text-4xl md:text-5xl font-bold leading-none tracking-tight">
          {display}
        </p>
        <p className={`mt-1.5 text-sm sm:text-base font-medium ${soft}`}>{unit}</p>
        <p className={`mt-1 text-xs sm:text-sm opacity-80 ${soft}`}>{sub}</p>
      </div>
    </div>
  )
}
