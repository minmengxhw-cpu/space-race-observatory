import { useEffect, useState } from 'react'
import type { DailyItem, DomainId, MetricsFile, MilestoneItem, SiteConfig } from '../../lib/dualTypes'
import { MetricBars } from '../../components/dual/MetricBars'
import { Stars } from '../../components/dual/Stars'
import { DomainProcess, type ProcessData } from '../../components/dual/DomainProcess'

const TITLE_BG: Record<string, string> = {
  ai: 'bg-violet-500 text-white',
  aerospace: 'bg-cyan-400 text-void',
  biopharma: 'bg-emerald-400 text-void',
  future: 'bg-amber-400 text-void',
}

/**
 * 领域页结构（对齐最早航天对照页）：
 * 前：本领域今日/近期动态
 * 中：指标看板
 * 后：全程发展过程（路线+对比+曲线）+ 里程碑 + 周观察入口
 */
export function DomainPage({
  site,
  domainId,
  metrics,
  milestones,
  recentItems,
  onBack,
  onDeepAerospace,
}: {
  site: SiteConfig
  domainId: DomainId
  metrics: MetricsFile | null
  milestones: MilestoneItem[]
  recentItems: DailyItem[]
  onBack: () => void
  onDeepAerospace?: () => void
}) {
  const meta = site.domains.find((d) => d.id === domainId)
  const titleBg = TITLE_BG[domainId] || TITLE_BG.aerospace
  const [process, setProcess] = useState<ProcessData | null>(null)

  useEffect(() => {
    setProcess(null)
    fetch(`${import.meta.env.BASE_URL}data/process/${domainId}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setProcess)
      .catch(() => setProcess(null))
  }, [domainId])

  return (
    <div className="relative min-h-[100svh] bg-void">
      <div className="pointer-events-none fixed inset-0 starfield opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-lg px-3 pb-14 sm:max-w-3xl sm:px-5 lg:max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="mt-4 min-h-[48px] px-4 rounded-2xl bg-slate-200 text-void text-base font-bold"
        >
          ← 返回今日焦点
        </button>

        <div className={`${titleBg} rounded-2xl mt-4 p-5 sm:p-6 shadow-xl`}>
          <p className="text-sm font-bold opacity-70 tracking-widest uppercase">G2 · 领域展厅</p>
          <h1 className="mt-1 font-display text-3xl sm:text-5xl font-bold leading-none tracking-tight break-words">
            {meta?.label ?? domainId}
          </h1>
          <p className="mt-3 text-base sm:text-lg font-bold opacity-80">
            前：今日/近期大事 · 后：全程过程、曲线与里程碑
          </p>
        </div>

        {domainId === 'aerospace' && onDeepAerospace && (
          <button
            type="button"
            onClick={onDeepAerospace}
            className="mt-4 w-full min-h-[56px] rounded-2xl bg-white text-void text-lg font-bold shadow-lg"
          >
            航天深潜 · 型号墙 / 火箭图鉴 / 发射详表 →
          </button>
        )}

        {/* ===== 前半：今日与近期（焦点优先） ===== */}
        <section className="mt-8">
          <BlockTitle n="01" title="今日与近期大事" />
          <p className="text-sm text-slate-400 mb-3 -mt-1">
            过去约 24–72 小时可核实动态 · 中美对照
          </p>
          <ul className="space-y-2.5">
            {recentItems.map((it) => {
              const cn = it.country === 'CN'
              return (
                <li
                  key={it.id}
                  className={`rounded-2xl p-4 sm:p-5 ${
                    cn ? 'bg-amber-400 text-void' : 'bg-cyan-400 text-void'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm font-bold opacity-75">
                      {cn ? '中国' : '美国'}
                    </span>
                    <Stars n={it.stars} />
                  </div>
                  <p className="mt-2 text-xl sm:text-2xl font-bold leading-snug break-words">
                    {it.title}
                  </p>
                  <p className="mt-2 text-base font-medium opacity-90 leading-relaxed break-words">
                    {it.fact}
                  </p>
                  <p className="mt-2 text-sm font-medium opacity-80 leading-relaxed break-words">
                    <span className="font-bold">意义 · </span>
                    {it.why}
                  </p>
                  <a
                    href={it.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-sm font-bold underline"
                  >
                    来源 →
                  </a>
                </li>
              )
            })}
            {!recentItems.length && (
              <p className="text-base text-slate-500">暂无近期条目</p>
            )}
          </ul>
        </section>

        {/* ===== 指标 ===== */}
        <section className="mt-10">
          <BlockTitle n="02" title="硬指标对照" />
          {metrics ? (
            <MetricBars metrics={metrics.metrics} />
          ) : (
            <p className="text-base text-slate-500">加载中…</p>
          )}
        </section>

        {/* ===== 后半：全程过程（航天页模板） ===== */}
        <section className="mt-10">
          <BlockTitle n="03" title="全程发展过程" />
          <p className="text-sm text-slate-400 mb-4 -mt-1">
            对齐最早航空航天页：阶段路线 → 对比要点 → 曲线图
          </p>
          {process ? (
            <DomainProcess data={process} />
          ) : (
            <p className="text-base text-slate-500">过程数据加载中…</p>
          )}
        </section>

        {/* ===== 里程碑最后 ===== */}
        <section className="mt-10 pb-4">
          <BlockTitle n="04" title="里程碑时间线" />
          <p className="text-sm text-slate-400 mb-3 -mt-1">放在最后 · 回看关键节点</p>
          <ol className="space-y-2.5">
            {milestones
              .filter((m) => m.domain === domainId)
              .map((m) => {
                const us = m.side === 'US'
                const cn = m.side === 'CN'
                const chip = us
                  ? 'bg-cyan-400 text-void'
                  : cn
                    ? 'bg-amber-400 text-void'
                    : 'bg-slate-200 text-void'
                return (
                  <li key={m.title} className="rounded-2xl overflow-hidden shadow-md">
                    <div className={`${chip} px-4 py-2 flex justify-between items-center`}>
                      <span className="font-mono-num text-sm font-bold">{m.date}</span>
                      <span className="text-xs font-bold opacity-70">
                        {us ? '美国' : cn ? '中国' : '双方'}
                      </span>
                    </div>
                    <div className="bg-slate-900 px-4 py-3.5 border border-t-0 border-slate-700">
                      <p className="text-lg sm:text-xl font-bold text-white leading-snug break-words">
                        {m.title}
                      </p>
                      <p className="mt-1.5 text-base text-slate-300 leading-relaxed break-words">
                        {m.desc}
                      </p>
                    </div>
                  </li>
                )
              })}
            {!milestones.some((m) => m.domain === domainId) && (
              <p className="text-base text-slate-500">暂无里程碑</p>
            )}
          </ol>
        </section>
      </div>
    </div>
  )
}

function BlockTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-end gap-3 mb-3">
      <span className="font-mono-num text-3xl font-bold text-white/20 leading-none">{n}</span>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-none pb-0.5">
        {title}
      </h2>
    </div>
  )
}
