/** SpaceX vs 中国 · 技术路线图（大色块 + 阶段） */

const SPACEX = [
  {
    phase: '01',
    title: '入轨验证',
    years: '2006–2010',
    items: ['Falcon 1 入轨', 'Merlin 发动机路线', '低成本迭代文化'],
  },
  {
    phase: '02',
    title: '运力做大',
    years: '2010–2015',
    items: ['Falcon 9 九机并联', 'Dragon 货运', '着陆试验起步'],
  },
  {
    phase: '03',
    title: '复用工业化',
    years: '2015–2022',
    items: ['陆地/海上着陆成功', 'Block 5 高频复飞', '星链量产发射'],
  },
  {
    phase: '04',
    title: '完全可复用',
    years: '2023–',
    items: ['Starship 试验', '塔架捕获', '超重型 + 深空架构'],
  },
]

const CHINA = [
  {
    phase: '01',
    title: '载人可靠',
    years: '1990s–2010s',
    items: ['长征二号 F 载人', '逃逸系统', '高可靠发射流程'],
  },
  {
    phase: '02',
    title: '高轨与导航',
    years: '2000s–2020',
    items: ['长征三号族高轨', '北斗组网', '氢氧上面级成熟'],
  },
  {
    phase: '03',
    title: '新一代重型',
    years: '2016–',
    items: ['长征五号重型', '长征七号货运', '空间站建造'],
  },
  {
    phase: '04',
    title: '星座 + 可回收',
    years: '2020s–',
    items: ['国网/千帆部署', '可回收试验加速', '长征九号规划'],
  },
]

export function TechRoadmap() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <RoadColumn
          title="SpaceX · 马斯克技术路线"
          subtitle="入轨 → 做大 → 复用工业 → 完全可复用"
          tone="cyan"
          stages={SPACEX}
        />
        <RoadColumn
          title="中国航天技术路线"
          subtitle="载人可靠 → 高轨导航 → 重型新一代 → 星座与复用"
          tone="amber"
          stages={CHINA}
        />
      </div>

      {/* 对比要点大色块 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <CompareChip
          title="复用节奏"
          left="Falcon 一级常态化 30+ 飞"
          right="验证/试验阶段，尚未工业流水线"
        />
        <CompareChip
          title="推进剂路线"
          left="煤油液氧 → 甲烷液氧（Starship）"
          right="常规 → 无毒氢氧/煤油液氧新一代"
        />
        <CompareChip
          title="星座策略"
          left="Starlink 已万星级在轨运营"
          right="国网/千帆组网中，规划万星"
        />
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
  stages: typeof SPACEX
}) {
  const head =
    tone === 'cyan'
      ? 'bg-cyan-500 text-void'
      : 'bg-amber-400 text-void'
  const border =
    tone === 'cyan' ? 'border-cyan-400/40' : 'border-amber-400/40'
  const phase =
    tone === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'

  return (
    <div className={`rounded-xl border ${border} overflow-hidden bg-panel/80`}>
      <div className={`${head} px-4 sm:px-5 py-4`}>
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-wide">{title}</h3>
        <p className="mt-1 text-sm sm:text-base opacity-80 font-medium">{subtitle}</p>
      </div>
      <ol className="p-3 sm:p-4 space-y-3">
        {stages.map((s, i) => (
          <li key={s.phase} className="relative flex gap-3">
            {i < stages.length - 1 && (
              <span
                className={`absolute left-[18px] top-10 bottom-[-12px] w-0.5 ${
                  tone === 'cyan' ? 'bg-cyan-500/30' : 'bg-amber-500/30'
                }`}
              />
            )}
            <span
              className={`relative z-[1] shrink-0 w-9 h-9 rounded-lg ${phase} font-mono-num text-sm font-bold flex items-center justify-center`}
            >
              {s.phase}
            </span>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <p className="text-base sm:text-lg font-semibold text-slate-50">{s.title}</p>
                <p className="text-sm text-slate-400 font-mono-num">{s.years}</p>
              </div>
              <ul className="mt-1.5 space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="text-sm sm:text-[15px] text-slate-300 leading-snug flex gap-2">
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

function CompareChip({
  title,
  left,
  right,
}: {
  title: string
  left: string
  right: string
}) {
  return (
    <div className="rounded-xl border border-slate-700/80 overflow-hidden">
      <div className="bg-slate-800 px-4 py-2.5">
        <p className="font-display text-sm sm:text-base tracking-wide text-white font-semibold">{title}</p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-700/80">
        <div className="px-4 py-3 bg-cyan-500/10">
          <p className="text-xs font-display text-cyan-400 mb-1">SPACEX</p>
          <p className="text-sm sm:text-base text-slate-100 leading-snug font-medium">{left}</p>
        </div>
        <div className="px-4 py-3 bg-amber-500/10">
          <p className="text-xs font-display text-amber-400 mb-1">中国</p>
          <p className="text-sm sm:text-base text-slate-100 leading-snug font-medium">{right}</p>
        </div>
      </div>
    </div>
  )
}
