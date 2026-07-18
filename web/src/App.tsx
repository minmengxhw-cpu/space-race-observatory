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
import { MobileNav } from './components/MobileNav'
import { MobileSummary } from './components/MobileSummary'
import { RocketEvolution } from './components/RocketEvolution'

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
          { key: '年发射峰值', value: '193 次 (2025)' },
          { key: '全球份额 2025', value: '与中国合计约 88%' },
          { key: '主力运营商', value: 'SpaceX 占绝对多数' },
          { key: '其他运载', value: 'ULA / Rocket Lab 等' },
        ],
        present: [
          { key: '结构', value: '商业发射主导' },
          { key: '复用能力', value: '全球领先（Falcon）' },
          { key: 'Starlink 在轨', value: '10,832 星' },
          { key: '2026 节奏', value: 'SpaceX YTD 86 次' },
        ],
        future: [
          { key: '发射频次', value: '视 Starship 换代' },
          { key: '深空', value: 'Artemis + 商业月球' },
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
      'Falcon 累计 678 次',
      '一级着陆 638 / 651',
      'Starlink 在轨 10,832',
      '2025 中国 93 次 · 美国 193 次',
      'SpaceX 2026 YTD 86 / 目标 145',
      '千帆≈200 · 国网≈168',
    ]
  }, [data])

  if (error) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center starfield px-4">
        <div className="hud-panel p-6 sm:p-8 max-w-md text-center w-full">
          <p className="text-amber-300 font-display tracking-widest">遥测中断</p>
          <p className="mt-2 text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!data || !leftCompare) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center starfield gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
        <p className="font-display text-cyan-300/80 tracking-[0.35em] text-xs">ACQUIRING SIGNAL</p>
      </div>
    )
  }

  const kpiBlock = data.kpis[timeMode]

  return (
    <div className="min-h-[100svh] bg-void text-slate-100 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] md:pb-0">
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
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none hidden sm:block" />

        <header
          className="sticky top-0 z-40 nav-glass"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="status-dot shrink-0" />
              <span className="font-display text-xs sm:text-sm tracking-wider truncate text-slate-100">
                {data.meta.title}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-xs text-slate-400">
              {[
                ['#overview', '总览'],
                ['#rockets', '火箭'],
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
            <div className="flex items-center gap-0.5 p-0.5 rounded border border-slate-700/90 bg-space/90 text-[10px] sm:text-[11px] shrink-0">
              {data.usToggle.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCompareMode(opt.id)}
                  className={`px-2 sm:px-2.5 py-1.5 min-h-[36px] rounded-sm transition-colors touch-manipulation ${
                    compareMode === opt.id
                      ? 'bg-cyan-400/15 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'text-slate-500 active:text-slate-300'
                  }`}
                >
                  {opt.id === 'spacex' ? 'SpaceX' : '美国'}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="hidden sm:block">
          <Ticker items={tickerItems} />
        </div>
        {/* 手机：单行精简 ticker，少占高度 */}
        <div className="sm:hidden overflow-hidden border-b border-slate-800/80 bg-black/25 py-1.5">
          <p className="px-3 text-[10px] font-mono-num text-slate-500 truncate">
            <span className="text-emerald-400/80 mr-1.5">●</span>
            数据 {data.updatedAt} · SX 86 YTD · 着陆 638 · Starlink 1.08万
          </p>
        </div>

        <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
          <Section
            id="overview"
            eyebrow="01 · DASHBOARD"
            title="总览对照台"
            desc="切换时间维度，对比 SpaceX（或美国合计）与中国。标注「规划」的为公开目标，非承诺。"
          >
            <MobileSummary data={data} timeMode={timeMode} compareMode={compareMode} />

            <div className="mb-5 sm:mb-8">
              <TimeModeTabs value={timeMode} onChange={setTimeMode} modeLabel={kpiBlock.label} />
            </div>
            <KpiStrip items={kpiBlock.items} />
            <div className="mt-5 sm:mt-8">
              <DualCompare left={leftCompare} right={data.compare.china} mode={timeMode} />
            </div>
          </Section>

          <div className="section-rule my-1 sm:my-2" />

          <Section
            id="rockets"
            eyebrow="02 · ROCKETS"
            title="火箭实体 · 世代演进"
            desc="SpaceX（马斯克旗下）与中国长征各代火箭外形、规格与关键改进。点选缩略图查看详情；可左右滑动切换型号。"
          >
            <RocketEvolution />
          </Section>

          <div className="section-rule my-1 sm:my-2" />

          <Section
            id="launch"
            eyebrow="03 · LAUNCH"
            title="发射成绩"
            desc="年度轨道发射对照。可切换 SpaceX / 美国合计。2026 为 YTD。"
          >
            <LaunchChart data={data.yearlyLaunches} compareMode={compareMode} />
          </Section>

          <div className="section-rule my-1 sm:my-2" />

          <Section
            id="reuse"
            eyebrow="04 · REUSE"
            title="回收与复用"
            desc="SpaceX 一级着陆 638 次成功；中国仍以验证与试验为主。"
          >
            <ReusePanel spacex={data.reuse.spacex} china={data.reuse.china} />
          </Section>

          <div className="section-rule my-1 sm:my-2" />

          <Section
            id="constellation"
            eyebrow="05 · CONSTELLATION"
            title="卫星与星座"
            desc="Starlink 工作星约 10,832；国网 / 千帆组网中，规划万星量级。"
          >
            <ConstellationPanel items={data.constellations} />
          </Section>

          <div className="section-rule my-1 sm:my-2" />

          <Section
            id="timeline"
            eyebrow="06 · TIMELINE"
            title="时间叙事"
            desc="从首次着陆到年发射纪录——近十年航天加速史。"
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

      <MobileNav />
    </div>
  )
}
