import type { CompareMode, SeedData, TimeMode } from '../types'

/** 手机首屏速览：4 个最关键数字，一屏看懂 */
export function MobileSummary({
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

  let leftValue = '—'
  let leftUnit = ''
  let rightValue = '—'
  let rightUnit = ''

  if (timeMode === 'present') {
    leftValue = String(compareMode === 'spacex' ? (y2026?.spacex ?? 86) : (y2026?.us ?? 95))
    leftUnit = '次 YTD'
    rightValue = String(y2026?.china ?? 48)
    rightUnit = '次 YTD'
  } else if (timeMode === 'past') {
    leftValue = String(compareMode === 'spacex' ? (y2025?.spacex ?? 167) : (y2025?.us ?? 193))
    leftUnit = '次/2025'
    rightValue = String(y2025?.china ?? 93)
    rightUnit = '次/2025'
  } else {
    leftValue = '145'
    leftUnit = '次目标'
    rightValue = '万星'
    rightUnit = '星座规划'
  }

  const leftLabel = compareMode === 'spacex' ? 'SpaceX 发射' : '美国发射'

  const cards = [
    {
      label: leftLabel,
      value: leftValue,
      unit: leftUnit,
      tone: 'cyan' as const,
    },
    {
      label: '中国发射',
      value: rightValue,
      unit: rightUnit,
      tone: 'amber' as const,
    },
    {
      label: '一级着陆',
      value: '638',
      unit: '次成功',
      tone: 'cyan' as const,
    },
    {
      label: 'Starlink 在轨',
      value: '1.08万',
      unit: '工作星',
      tone: 'cyan' as const,
    },
  ]

  return (
    <div className="md:hidden mb-5">
      <p className="font-display text-[10px] tracking-[0.3em] text-cyan-400/80 uppercase mb-2.5 px-0.5">
        手机速览
      </p>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-lg border px-3 py-3 bg-black/35 ${
              c.tone === 'cyan' ? 'border-cyan-400/25' : 'border-amber-400/25'
            }`}
          >
            <p className="text-[11px] text-slate-400 leading-tight">{c.label}</p>
            <p
              className={`mt-1 font-mono-num text-xl font-semibold ${
                c.tone === 'cyan' ? 'text-cyan-300' : 'text-amber-300'
              }`}
            >
              {c.value}
              <span className="text-[10px] ml-1 font-normal text-slate-500">{c.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
