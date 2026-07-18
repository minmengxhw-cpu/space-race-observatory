import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  DailyFile,
  DomainId,
  MetricsFile,
  MilestoneItem,
  SiteConfig,
  ViewId,
} from './lib/dualTypes'
import { HomePage } from './pages/dual/HomePage'
import { DomainPage } from './pages/dual/DomainPage'
import { ArchivePage } from './pages/dual/ArchivePage'
import { AerospacePage } from './pages/AerospacePage'
import type { SeedData } from './types'

/**
 * 双轨 · 中美前沿科技对照
 * V0：每日 L1 首页 + 领域 L2/L3 + 归档 + 航天深潜
 */
export default function App() {
  const [site, setSite] = useState<SiteConfig | null>(null)
  const [dates, setDates] = useState<string[]>([])
  const [date, setDate] = useState<string>('')
  const [daily, setDaily] = useState<DailyFile | null>(null)
  const [filter, setFilter] = useState<DomainId | 'all'>('all')
  const [view, setView] = useState<ViewId>('home')
  const [domainId, setDomainId] = useState<DomainId>('ai')
  const [metricsMap, setMetricsMap] = useState<Partial<Record<DomainId, MetricsFile>>>({})
  const [milestones, setMilestones] = useState<MilestoneItem[]>([])
  const [weeklyNote, setWeeklyNote] = useState<{
    weekOf: string
    title: string
    body: string
    label: string
  } | null>(null)
  const [spaceSeed, setSpaceSeed] = useState<SeedData | null>(null)
  const [recentByDomain, setRecentByDomain] = useState<Partial<Record<DomainId, DailyFile['items']>>>({})
  const [error, setError] = useState<string | null>(null)

  const base = import.meta.env.BASE_URL

  // boot
  useEffect(() => {
    Promise.all([
      fetch(`${base}data/site.json`).then((r) => r.json()),
      fetch(`${base}data/daily/index.json`).then((r) => r.json()),
      fetch(`${base}data/milestones.json`).then((r) => r.json()),
      fetch(`${base}data/seed.json`).then((r) => r.json()),
    ])
      .then(([s, idx, ms, seed]) => {
        setSite(s)
        setDates(idx.dates)
        setDate(idx.latest || s.defaultDate)
        setMilestones(ms.items || [])
        setWeeklyNote(ms.weeklyNote || null)
        setSpaceSeed(seed)
      })
      .catch((e: Error) => setError(e.message))
  }, [base])

  // load daily when date changes
  useEffect(() => {
    if (!date) return
    fetch(`${base}data/daily/${date}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`无 ${date} 数据`)
        return r.json()
      })
      .then(setDaily)
      .catch((e: Error) => setError(e.message))
  }, [base, date])

  // load metrics lazily
  useEffect(() => {
    if (view !== 'domain') return
    if (metricsMap[domainId]) return
    fetch(`${base}data/metrics/${domainId}.json`)
      .then((r) => r.json())
      .then((m: MetricsFile) => setMetricsMap((prev) => ({ ...prev, [domainId]: m })))
      .catch(() => {})
  }, [base, view, domainId, metricsMap])

  // build recent stream from all loaded dailies (index dates)
  useEffect(() => {
    if (!dates.length) return
    Promise.all(
      dates.map((d) =>
        fetch(`${base}data/daily/${d}.json`)
          .then((r) => r.json())
          .catch(() => null),
      ),
    ).then((files: (DailyFile | null)[]) => {
      const map: Partial<Record<DomainId, DailyFile['items']>> = {
        ai: [],
        aerospace: [],
        biopharma: [],
        future: [],
      }
      for (const f of files) {
        if (!f) continue
        for (const it of f.items) {
          map[it.domain] = [...(map[it.domain] || []), { ...it, title: `${f.date} · ${it.title}` }]
        }
      }
      setRecentByDomain(map)
    })
  }, [base, dates])

  const goPrev = useCallback(() => {
    const i = dates.indexOf(date)
    if (i >= 0 && i < dates.length - 1) setDate(dates[i + 1])
  }, [dates, date])

  const goNext = useCallback(() => {
    const i = dates.indexOf(date)
    if (i > 0) setDate(dates[i - 1])
  }, [dates, date])

  const openDomain = useCallback((d: DomainId) => {
    setDomainId(d)
    setView('domain')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const title = useMemo(() => {
    if (!site) return '双轨'
    if (view === 'home') return `${site.name} · ${date}`
    if (view === 'archive') return `${site.name} · 归档`
    if (view === 'deep-aerospace') return `${site.name} · 航天深潜`
    return `${site.name} · ${site.domains.find((d) => d.id === domainId)?.label}`
  }, [site, view, date, domainId])

  useEffect(() => {
    document.title = title
  }, [title])

  if (error && !daily) {
    return (
      <div className="min-h-[100svh] bg-void text-slate-200 flex items-center justify-center p-6 starfield">
        <div className="hud-panel rounded-2xl p-8 text-center max-w-sm">
          <p className="font-display text-amber-300 text-lg">遥测中断</p>
          <p className="mt-2 text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!site || !daily) {
    return (
      <div className="min-h-[100svh] bg-void flex flex-col items-center justify-center gap-4 starfield">
        <div className="w-11 h-11 border-2 border-cyan-400/25 border-t-cyan-400 rounded-full animate-spin" />
        <p className="font-display text-sm tracking-[0.35em] text-cyan-300/80">DUAL TRACK</p>
      </div>
    )
  }

  return (
    <div className="min-h-[100svh] bg-void text-slate-100">
      <div className="fixed inset-0 starfield opacity-45 pointer-events-none" />
      <div className="relative z-10">
        {view === 'home' && (
          <HomePage
            site={site}
            daily={daily}
            dates={dates}
            filter={filter}
            onFilter={setFilter}
            onPrev={goPrev}
            onNext={goNext}
            onArchive={() => setView('archive')}
            onDomain={openDomain}
          />
        )}
        {view === 'domain' && (
          <>
            <DomainPage
              site={site}
              domainId={domainId}
              metrics={metricsMap[domainId] || null}
              milestones={milestones}
              recentItems={recentByDomain[domainId] || []}
              onBack={() => setView('home')}
              onDeepAerospace={
                domainId === 'aerospace' ? () => setView('deep-aerospace') : undefined
              }
            />
            {/* 周观察放领域页最底部（里程碑之后） */}
            {weeklyNote && (
              <div className="mx-auto w-full max-w-lg px-3 pb-14 sm:max-w-3xl sm:px-5 lg:max-w-5xl">
                <div className="rounded-2xl bg-slate-200 text-void p-5 sm:p-6 shadow-lg">
                  <p className="text-xs font-bold opacity-50 tracking-widest uppercase">
                    {weeklyNote.label} · 放在最后
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold">{weeklyNote.title}</p>
                  <p className="mt-3 text-base font-medium leading-relaxed opacity-85">
                    {weeklyNote.body}
                  </p>
                  <p className="mt-3 text-xs font-mono-num opacity-50">周次 {weeklyNote.weekOf}</p>
                </div>
              </div>
            )}
          </>
        )}
        {view === 'archive' && (
          <ArchivePage
            dates={dates}
            current={date}
            onBack={() => setView('home')}
            onPick={(d) => {
              setDate(d)
              setView('home')
            }}
          />
        )}
        {view === 'deep-aerospace' && spaceSeed && (
          <div>
            <div className="sticky top-0 z-40 bg-void/95 backdrop-blur border-b border-cyan-500/15 px-3 py-2.5">
              <button
                type="button"
                className="text-sm font-semibold text-cyan-300 min-h-[40px] px-3 rounded-lg border border-cyan-400/20 bg-cyan-500/5"
                onClick={() => setView('domain')}
              >
                ← 返回航天领域页
              </button>
            </div>
            <AerospacePage data={spaceSeed} />
          </div>
        )}
      </div>
    </div>
  )
}
