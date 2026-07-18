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
import { RocketEvolution } from './components/RocketEvolution'
import { BigStatBlocks } from './components/BigStatBlocks'
import { TechRoadmap } from './components/TechRoadmap'
import { SpacexModels } from './components/SpacexModels'
import { UpdateBadge } from './components/UpdateBadge'

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
      '每周一自动巡检更新',
      'Falcon 累计 678 次',
      '一级着陆 638 / 651',
      'Starlink 在轨 10,832',
      '2025 中国 93 次 · 美国 193 次',
      'SpaceX 2026 YTD 86 / 目标 145',
    ]
  }, [data])

  if (error) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center starfield px-4">
        <div className="hud-panel p-6 sm:p-8 max-w-md text-center w-full">
          <p className="text-amber-300 font-display tracking-widest text-lg">遥测中断</p>
          <p className="mt-2 text-slate-300 text-base">{error}</p>
        </div>
      </div>
    )
  }

  if (!data || !leftCompare) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center starfield gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
        <p className="font-display text-cyan-300/80 tracking-[0.35em] text-sm">ACQUIRING SIGNAL</p>
      </div>
    )
  }

  const kpiBlock = data.kpis[timeMode]

  return (
    <div className="min-h-[100svh] bg-void text-slate-100 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
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
          <div className="max-w-6xl mx-auto px-3 sm:px-4 h-13 sm:h-14 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="status-dot shrink-0" />
              <span className="font-display text-sm sm:text-base tracking-wider truncate text-white font-semibold">
                {data.meta.title}
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-4 text-sm text-slate-300">
              {[
                ['#overview', '总览'],
                ['#rockets', '火箭'],
                ['#roadmap', '路线'],
                ['#launch', '发射'],
                ['#timeline', '节点'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="hover:text-cyan-300 transition-colors font-medium">
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-700/90 bg-space/90 text-xs sm:text-sm shrink-0">
              {data.usToggle.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCompareMode(opt.id)}
                  className={`px-2.5 sm:px-3 py-2 min-h-[40px] rounded-md transition-colors touch-manipulation font-semibold ${
                    compareMode === opt.id
                      ? 'bg-cyan-400 text-void'
                      : 'text-slate-400 active:text-slate-200'
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
        <div className="sm:hidden overflow-hidden border-b border-slate-800/80 bg-black/25 py-2">
          <p className="px-3 text-xs font-mono-num text-slate-400 truncate">
            <span className="text-emerald-400 mr-1.5">●</span>
            每周更新 · 数据 {data.updatedAt} · SX 86 YTD · 着陆 638
          </p>
        </div>

        <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-8">
          <Section
            id="overview"
            eyebrow="01 · DASHBOARD"
            title="总览对照台"
            desc="大色块标出最关键数字。切换「过去 / 现在 / 未来」看不同时间切片。"
          >
            <UpdateBadge updatedAt={data.updatedAt} />
            <BigStatBlocks data={data} timeMode={timeMode} compareMode={compareMode} />

            <div className="mb-5 sm:mb-8">
              <TimeModeTabs value={timeMode} onChange={setTimeMode} modeLabel={kpiBlock.label} />
            </div>
            <KpiStrip items={kpiBlock.items} />
            <div className="mt-6 sm:mt-8">
              <DualCompare left={leftCompare} right={data.compare.china} mode={timeMode} />
            </div>
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="rockets"
            eyebrow="02 · ROCKETS"
            title="马斯克火箭型号墙"
            desc="SpaceX 五代主线一眼扫完；下方可切换完整中美火箭图鉴与改进点。"
          >
            <SpacexModels />
            <div className="mt-8 sm:mt-10">
              <p className="font-display text-sm tracking-[0.2em] text-amber-400 uppercase mb-3">
                中美火箭图鉴 · 点选查看改进
              </p>
              <RocketEvolution />
            </div>
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="roadmap"
            eyebrow="03 · ROADMAP"
            title="技术路线图对照"
            desc="SpaceX 走「复用工业化 → 完全可复用」；中国走「载人可靠 → 重型新一代 → 星座与可回收」。"
          >
            <TechRoadmap />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="launch"
            eyebrow="04 · LAUNCH"
            title="发射成绩与历程"
            desc="年度轨道发射对照曲线。美国合计 / SpaceX 可切换。"
          >
            <LaunchChart data={data.yearlyLaunches} compareMode={compareMode} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="reuse"
            eyebrow="05 · REUSE"
            title="回收与复用"
            desc="SpaceX 一级着陆已成为工业节奏；中国处于加速验证阶段。"
          >
            <ReusePanel spacex={data.reuse.spacex} china={data.reuse.china} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="constellation"
            eyebrow="06 · CONSTELLATION"
            title="卫星与星座"
            desc="Starlink 已大规模在轨；国网 / 千帆规划万星、建设中。"
          >
            <ConstellationPanel items={data.constellations} />
          </Section>

          <div className="section-rule my-2" />

          <Section
            id="timeline"
            eyebrow="07 · MILESTONES"
            title="关键节点 · 发射历程"
            desc="横向色块先扫重点，下方展开完整时间线。"
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
