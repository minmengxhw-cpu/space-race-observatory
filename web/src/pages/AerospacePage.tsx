import { useMemo, useState } from 'react'
import type { CompareMode, SeedData, TimeMode } from '../types'
import { TimeModeTabs } from '../components/TimeModeTabs'
import { KpiStrip } from '../components/KpiStrip'
import { DualCompare } from '../components/DualCompare'
import { LaunchChart } from '../components/LaunchChart'
import { ReusePanel } from '../components/ReusePanel'
import { ConstellationPanel } from '../components/ConstellationPanel'
import { Timeline } from '../components/Timeline'
import { Section } from '../components/Section'
import { SourcesFooter } from '../components/SourcesFooter'
import { RocketEvolution } from '../components/RocketEvolution'
import { BigStatBlocks } from '../components/BigStatBlocks'
import { TechRoadmap } from '../components/TechRoadmap'
import { SpacexModels } from '../components/SpacexModels'
import { UpdateBadge } from '../components/UpdateBadge'

export function AerospacePage({ data }: { data: SeedData }) {
  const [timeMode, setTimeMode] = useState<TimeMode>('present')
  const [compareMode, setCompareMode] = useState<CompareMode>('spacex')

  const leftCompare = useMemo(() => {
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

  const kpiBlock = data.kpis[timeMode]

  return (
    <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-8">
      <section className="pt-6 sm:pt-10 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-display text-xs tracking-[0.28em] text-cyan-400 uppercase font-semibold">
              AEROSPACE · G2
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">
              航空航天对照台
            </h1>
            <p className="mt-2 text-base sm:text-xl text-slate-200 max-w-2xl">
              SpaceX 复用工业化 vs 中国长征 / 空间站 / 低轨星座
            </p>
          </div>
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-700 bg-space/90 text-sm shrink-0">
            {data.usToggle.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCompareMode(opt.id)}
                className={`px-3 py-2 min-h-[40px] rounded-md font-semibold ${
                  compareMode === opt.id ? 'bg-cyan-400 text-void' : 'text-slate-400'
                }`}
              >
                {opt.id === 'spacex' ? 'SpaceX' : '美国'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <UpdateBadge updatedAt={data.updatedAt} />

      <Section
        id="overview"
        eyebrow="01 · DASHBOARD"
        title="总览色块"
        desc="切换时间维度，对比 SpaceX（或美国合计）与中国。"
      >
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

      <Section id="rockets" eyebrow="02 · ROCKETS" title="马斯克火箭型号墙" desc="五代主线 + 完整图鉴。">
        <SpacexModels />
        <div className="mt-8">
          <RocketEvolution />
        </div>
      </Section>

      <div className="section-rule my-2" />

      <Section id="roadmap" eyebrow="03 · ROADMAP" title="技术路线图" desc="复用工业化 vs 新一代运载与星座。">
        <TechRoadmap />
      </Section>

      <div className="section-rule my-2" />

      <Section id="launch" eyebrow="04 · LAUNCH" title="发射成绩" desc="年度轨道发射对照。">
        <LaunchChart data={data.yearlyLaunches} compareMode={compareMode} />
      </Section>

      <div className="section-rule my-2" />

      <Section id="reuse" eyebrow="05 · REUSE" title="回收与复用" desc="">
        <ReusePanel spacex={data.reuse.spacex} china={data.reuse.china} />
      </Section>

      <div className="section-rule my-2" />

      <Section id="constellation" eyebrow="06 · CONSTELLATION" title="卫星与星座" desc="">
        <ConstellationPanel items={data.constellations} />
      </Section>

      <div className="section-rule my-2" />

      <Section id="timeline" eyebrow="07 · MILESTONES" title="关键节点" desc="">
        <Timeline items={data.milestones} />
      </Section>

      <SourcesFooter
        sources={data.sources}
        disclaimer={data.disclaimer}
        updatedAt={data.updatedAt}
      />
    </main>
  )
}
