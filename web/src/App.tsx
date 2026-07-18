import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CompareMode, SeedData, TimeMode } from './types'
import { Hero } from './components/Hero'
import { TimeModeTabs } from './components/TimeModeTabs'
import { KpiStrip } from './components/KpiStrip'
import { DualCompare } from './components/DualCompare'
import { LaunchChart } from './components/LaunchChart'
import { ReusePanel } from './components/ReusePanel'
import { ConstellationPanel } from './components/ConstellationPanel'
import { Timeline } from './components/Timeline'
import { Section } from './components/Section'
import { SourcesFooter } from './components/SourcesFooter'
import { Ticker } from './components/Ticker'

export default function App() {
  const [data, setData] = useState<SeedData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [timeMode, setTimeMode] = useState<TimeMode>('present')
  const [compareMode, setCompareMode] = useState<CompareMode>('spacex')
  const [showHero, setShowHero] = useState(true)
  const dashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/seed.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`加载数据失败: ${r.status}`)
        return r.json() as Promise<SeedData>
      })
      .then(setData)
      .catch((e: Error) => setError(e.message))
  }, [])

  const enter = useCallback(() => {
    setShowHero(false)
    requestAnimationFrame(() => {
      dashRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const leftCompare = useMemo(() => {
    if (!data) return null
    if (compareMode === 'spacex') return data.compare.spacex
    return {
      ...data.compare.spacex,
      id: 'us',
      name: '美国航天',
      subtitle: '国家 + 商业（SpaceX 为主力）',
      metrics: {
        past: [
          { key: '年发射峰值', value: '193 次 (2025, SpaceNews)' },
          { key: '全球份额 2025', value: '与中国合计约 88%' },
          { key: '主力运营商', value: 'SpaceX 占绝对多数' },
          { key: '其他运载', value: 'ULA / Rocket Lab / Blue Origin 等' },
        ],
        present: [
          { key: '结构', value: '商业发射主导' },
          { key: '复用能力', value: '全球领先（SpaceX Falcon）' },
          { key: 'Starlink 在轨工作', value: '10,832 星' },
          { key: '2026 节奏', value: 'SpaceX YTD 86 次领跑' },
        ],
        future: [
          { key: '发射频次', value: '取决于 Starship 换代节奏' },
          { key: '深空', value: 'Artemis + 商业月球物流' },
          { key: '星座', value: 'Starlink 继续扩容' },
          { key: '竞争格局', value: '美中双强持续' },
        ],
      },
    }
  }, [data, compareMode])

  const tickerItems = useMemo(() => {
    if (!data) return []
    return [
      `数据截至 ${data.updatedAt}`,
      'Falcon 家族累计 678 次发射',
      '一级着陆 638 / 651',
      'Starlink 在轨工作 10,832',
      '2025 中国轨道发射 93 次',
      '2025 美国轨道发射 193 次',
      'SpaceX 2026 YTD 86 / 目标 145',
      '千帆约 200 星 · 国网约 168 星',
      '科普可视化 · 非投资建议',
    ]
  }, [data])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center starfield px-4">
        <div className="hud-panel p-8 max-w-md text-center">
          <p className="text-amber-300 font-display tracking-widest">遥测中断</p>
          <p className="mt-2 text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!data || !leftCompare) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center starfield gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
        <p className="font-display text-cyan-300/80 tracking-[0.35em] text-xs">ACQUIRING SIGNAL</p>
      </div>
    )
  }

  const kpiBlock = data.kpis[timeMode]

  return (
    <div className="min-h-screen bg-void text-slate-100">
      {showHero && (
        <Hero
          title={data.meta.title}
          titleEn={data.meta.titleEn}
          tagline={data.meta.tagline}
          updatedAt={data.updatedAt}
          onEnter={enter}
        />
      )}

      <div ref={dashRef} className="relative">
        <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

        <header className="sticky top-0 z-40 nav-glass">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="status-dot shrink-0" />
              <span className="font-display text-sm tracking-wider truncate text-slate-100">
                {data.meta.title}
              </span>
              <span className="hidden lg:inline text-[10px] font-mono-num text-slate-500 tracking-wider">
                OBSERVATORY v0.2
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-xs text-slate-400">
              {[
                ['#overview', '总览'],
                ['#launch', '发射'],
                ['#reuse', '回收'],
                ['#constellation', '星座'],
                ['#timeline', '时间轴'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="hover:text-cyan-300 transition-colors tracking-wide">
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-1 p-0.5 rounded border border-slate-700/90 bg-space/90 text-[11px]">
              {data.usToggle.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCompareMode(opt.id)}
                  className={`px-2.5 py-1 rounded-sm transition-colors ${
                    compareMode === opt.id
                      ? 'bg-cyan-400/15 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {opt.id === 'spacex' ? 'SpaceX' : '美国'}
                </button>
              ))}
            </div>
          </div>
        </header>

        <Ticker items={tickerItems} />

        <main className="relative z-10 max-w-6xl mx-auto px-4 pb-8">
          <Section
            id="overview"
            eyebrow="01 · DASHBOARD"
            title="总览对照台"
            desc="切换时间维度，对比 SpaceX（或美国合计）与中国在发射、回收与星座上的核心指标。标注「规划」的数据为公开目标，非承诺。"
          >
            <div className="mb-8">
              <TimeModeTabs value={timeMode} onChange={setTimeMode} modeLabel={kpiBlock.label} />
            </div>
            <KpiStrip items={kpiBlock.items} />
            <div className="mt-8">
              <DualCompare left={leftCompare} right={data.compare.china} mode={timeMode} />
            </div>
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="launch"
            eyebrow="02 · LAUNCH"
            title="发射成绩"
            desc="年度轨道发射次数对照。美国合计含 SpaceX 及其他美国运营商；图表可切换对照主体。2026 为 YTD 约数。"
          >
            <LaunchChart data={data.yearlyLaunches} compareMode={compareMode} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="reuse"
            eyebrow="03 · REUSE"
            title="回收与复用"
            desc="SpaceX 已将一级回收做成工业流水线（638 次着陆成功）；中国处于验证与加速试验阶段——这是中美航天成本结构差异的关键维度。"
          >
            <ReusePanel spacex={data.reuse.spacex} china={data.reuse.china} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="constellation"
            eyebrow="04 · CONSTELLATION"
            title="卫星与星座"
            desc="Starlink 已大规模在轨运营（工作星 10,832）；中国国网、千帆处于组网建设期，规划同为万星量级。"
          >
            <ConstellationPanel items={data.constellations} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="timeline"
            eyebrow="05 · TIMELINE"
            title="时间叙事"
            desc="从首次着陆、星链启动，到空间站与年发射纪录——串起近十年航天加速史。"
          >
            <Timeline items={data.milestones} />
          </Section>
        </main>

        <SourcesFooter
          sources={data.sources}
          disclaimer={data.disclaimer}
          updatedAt={data.updatedAt}
        />
      </div>
    </div>
  )
}
