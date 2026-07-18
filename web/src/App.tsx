import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  DailyFile,
  DailyItem,
  DomainId,
  MetricsFile,
  MilestoneItem,
  SiteConfig,
  ViewId,
} from './lib/dualTypes'
import { parseHash, buildHash } from './lib/routes'
import { HomePage } from './pages/dual/HomePage'
import { DomainPage } from './pages/dual/DomainPage'
import { ArchivePage } from './pages/dual/ArchivePage'
import type { SeedData } from './types'

const AerospacePage = lazy(() =>
  import('./pages/AerospacePage').then((m) => ({ default: m.AerospacePage })),
)

/**
 * G2 · 中美前沿科技每日对照
 * Hash 路由：#/ | #/d/YYYY-MM-DD | #/domain/:id | #/archive | #/deep-aerospace
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
  const [recentByDomain, setRecentByDomain] = useState<Partial<Record<DomainId, DailyItem[]>>>({})
  const [error, setError] = useState<string | null>(null)
  const [booted, setBooted] = useState(false)
  /** index.json "latest" pointer (filled day preferred) */
  const [indexLatest, setIndexLatest] = useState<string>('')
  /** Calendar "today" scaffold is empty — showing last filled day instead */
  const [updatingToday, setUpdatingToday] = useState(false)
  /** ISO date of empty scaffold (if any) */
  const [scaffoldDate, setScaffoldDate] = useState<string | null>(null)

  const skipHashWrite = useRef(false)
  const latestDate = indexLatest || dates[0] || site?.defaultDate || ''

  const base = import.meta.env.BASE_URL

  // boot data
  useEffect(() => {
    Promise.all([
      fetch(`${base}data/site.json`).then((r) => r.json()),
      fetch(`${base}data/daily/index.json`).then((r) => r.json()),
      fetch(`${base}data/milestones.json`).then((r) => r.json()),
    ])
      .then(async ([s, idx, ms]) => {
        setSite(s)
        setDates(idx.dates)
        setIndexLatest(idx.latest || s.defaultDate)
        setMilestones(ms.items || [])
        setWeeklyNote(ms.weeklyNote || null)

        const route = parseHash()
        skipHashWrite.current = true
        setView(route.view)
        if (route.domainId) setDomainId(route.domainId)

        // Resolve display date: explicit hash date wins; else latest with content fallback
        let pick = route.date && idx.dates.includes(route.date) ? route.date : idx.latest || s.defaultDate

        if (!route.date) {
          // Auto: if pointed day is empty scaffold, fall back to nearest day with items
          // Also check dates[0] if it is newer empty scaffold not yet in latest
          const candidate = idx.dates[0] && idx.dates[0] !== pick ? idx.dates[0] : pick
          const probe = await findDisplayDate(base, idx.dates, candidate)
          if (probe.empty || probe.date !== candidate) {
            // Prefer filled day; banner if calendar head is empty
            const head = await fetchDaily(base, idx.dates[0] || pick)
            if (head && head.items.length === 0) {
              setUpdatingToday(true)
              setScaffoldDate(idx.dates[0] || pick)
              pick = probe.date
            } else if (probe.date !== pick) {
              setUpdatingToday(true)
              setScaffoldDate(pick)
              pick = probe.date
            } else {
              setUpdatingToday(false)
              setScaffoldDate(null)
              pick = probe.date
            }
          } else {
            setUpdatingToday(false)
            setScaffoldDate(null)
            pick = probe.date
          }
        } else {
          setUpdatingToday(false)
          setScaffoldDate(null)
        }

        setDate(pick)
        setBooted(true)
      })
      .catch((e: Error) => setError(e.message))
  }, [base])

  // Prefetch aerospace seed only when needed
  useEffect(() => {
    if (view !== 'deep-aerospace' || spaceSeed) return
    fetch(`${base}data/seed.json`)
      .then((r) => r.json())
      .then(setSpaceSeed)
      .catch(() => {})
  }, [base, view, spaceSeed])

  // browser back/forward & shared links
  useEffect(() => {
    if (!booted) return
    const onHash = () => {
      const route = parseHash()
      skipHashWrite.current = true
      setView(route.view)
      if (route.domainId) setDomainId(route.domainId)
      if (route.view === 'home') {
        if (route.date && dates.includes(route.date)) {
          setDate(route.date)
          setUpdatingToday(false)
          setScaffoldDate(null)
        } else if (latestDate) {
          // back to "latest" — re-apply empty fallback
          void findDisplayDate(base, dates, latestDate).then((filled) => {
            if (filled.date !== latestDate) {
              setUpdatingToday(true)
              setScaffoldDate(latestDate)
            } else {
              setUpdatingToday(filled.empty)
              setScaffoldDate(filled.empty ? latestDate : null)
            }
            setDate(filled.date)
          })
        }
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [booted, dates, latestDate, base])

  // sync state → hash
  useEffect(() => {
    if (!booted) return
    if (skipHashWrite.current) {
      skipHashWrite.current = false
      return
    }
    // Auto-fallback for empty "today" keeps shareable #/ instead of pinning old date
    const target =
      view === 'home' && updatingToday
        ? '#/'
        : buildHash(
            {
              view,
              date: view === 'home' ? date : undefined,
              domainId: view === 'domain' || view === 'deep-aerospace' ? domainId : undefined,
            },
            latestDate,
          )
    const cur = window.location.hash || '#/'
    const norm = (h: string) => (h === '' || h === '#' ? '#/' : h)
    if (norm(cur) !== norm(target)) {
      window.location.hash = target
    }
  }, [booted, view, date, domainId, latestDate, updatingToday])

  // load daily when date changes
  useEffect(() => {
    if (!date) return
    fetch(`${base}data/daily/${date}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`无 ${date} 数据`)
        return r.json()
      })
      .then((d: DailyFile) => {
        setDaily(d)
        // Manual navigation onto empty scaffold
        if (d.items.length === 0) {
          setUpdatingToday(true)
          setScaffoldDate(d.date)
        } else if (!scaffoldDate || scaffoldDate !== d.date) {
          // keep banner if we are in auto-fallback mode for scaffoldDate
          if (!(updatingToday && scaffoldDate && scaffoldDate !== d.date)) {
            setUpdatingToday(false)
          }
        }
      })
      .catch((e: Error) => setError(e.message))
  }, [base, date]) // eslint-disable-line react-hooks/exhaustive-deps

  // load metrics lazily
  useEffect(() => {
    if (view !== 'domain') return
    if (metricsMap[domainId]) return
    fetch(`${base}data/metrics/${domainId}.json`)
      .then((r) => r.json())
      .then((m: MetricsFile) => setMetricsMap((prev) => ({ ...prev, [domainId]: m })))
      .catch(() => {})
  }, [base, view, domainId, metricsMap])

  // recent stream: single aggregate file (build-time recent-30d.json)
  useEffect(() => {
    if (!booted) return
    fetch(`${base}data/daily/recent-30d.json`)
      .then((r) => {
        if (!r.ok) throw new Error('no aggregate')
        return r.json()
      })
      .then((agg: { byDomain?: Partial<Record<DomainId, DailyItem[]>> }) => {
        setRecentByDomain(agg.byDomain || {})
      })
      .catch(() => {
        // Fallback: only fetch last 7 days if aggregate missing
        const slice = dates.slice(0, 7)
        Promise.all(
          slice.map((d) =>
            fetch(`${base}data/daily/${d}.json`)
              .then((r) => r.json())
              .catch(() => null),
          ),
        ).then((files: (DailyFile | null)[]) => {
          const map: Partial<Record<DomainId, DailyItem[]>> = {
            ai: [],
            aerospace: [],
            biopharma: [],
            future: [],
          }
          for (const f of files) {
            if (!f) continue
            for (const it of f.items) {
              map[it.domain] = [
                ...(map[it.domain] || []),
                { ...it, title: `${f.date} · ${it.title}` },
              ]
            }
          }
          setRecentByDomain(map)
        })
      })
  }, [base, booted, dates])

  const goPrev = useCallback(() => {
    const i = dates.indexOf(date)
    if (i >= 0 && i < dates.length - 1) {
      setUpdatingToday(false)
      setScaffoldDate(null)
      setDate(dates[i + 1])
    }
  }, [dates, date])

  const goNext = useCallback(() => {
    const i = dates.indexOf(date)
    if (i > 0) {
      setUpdatingToday(false)
      setScaffoldDate(null)
      setDate(dates[i - 1])
    }
  }, [dates, date])

  const openDomain = useCallback((d: DomainId) => {
    setDomainId(d)
    setView('domain')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goHome = useCallback(() => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goArchive = useCallback(() => {
    setView('archive')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const title = useMemo(() => {
    if (!site) return 'G2'
    if (view === 'home') return `G2 · ${date}`
    if (view === 'archive') return `G2 · 归档`
    if (view === 'deep-aerospace') return `G2 · 航天深潜`
    return `G2 · ${site.domains.find((d) => d.id === domainId)?.label}`
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
        <p className="font-display text-sm tracking-[0.35em] text-cyan-300/80">G2 LOADING</p>
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
            onArchive={goArchive}
            onDomain={openDomain}
            updatingToday={updatingToday}
            scaffoldDate={scaffoldDate}
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
              onBack={goHome}
              onDeepAerospace={
                domainId === 'aerospace' ? () => setView('deep-aerospace') : undefined
              }
            />
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
            onBack={goHome}
            onPick={(d) => {
              setUpdatingToday(false)
              setScaffoldDate(null)
              setDate(d)
              setView('home')
            }}
          />
        )}
        {view === 'deep-aerospace' && (
          <div>
            <div className="sticky top-0 z-40 bg-void/95 backdrop-blur border-b border-cyan-500/15 px-3 py-2.5">
              <button
                type="button"
                className="text-sm font-semibold text-cyan-300 min-h-[40px] px-3 rounded-lg border border-cyan-400/20 bg-cyan-500/5"
                onClick={() => {
                  setDomainId('aerospace')
                  setView('domain')
                }}
              >
                ← 返回航天领域页
              </button>
            </div>
            <Suspense
              fallback={
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-2 border-cyan-400/25 border-t-cyan-400 rounded-full animate-spin" />
                </div>
              }
            >
              {spaceSeed ? <AerospacePage data={spaceSeed} /> : null}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}

async function fetchDaily(base: string, d: string): Promise<DailyFile | null> {
  try {
    const r = await fetch(`${base}data/daily/${d}.json`)
    if (!r.ok) return null
    return (await r.json()) as DailyFile
  } catch {
    return null
  }
}

/** Walk index dates from `start` until a day with items is found. */
async function findDisplayDate(
  base: string,
  dates: string[],
  start: string,
): Promise<{ date: string; empty: boolean }> {
  const order = dates.includes(start) ? dates : [start, ...dates]
  const startIdx = Math.max(0, order.indexOf(start))
  let startWasEmpty = false
  for (let i = startIdx; i < order.length; i++) {
    const d = order[i]
    const j = await fetchDaily(base, d)
    if (!j) continue
    if (j.items && j.items.length > 0) {
      return { date: d, empty: d !== start }
    }
    if (d === start) startWasEmpty = true
  }
  return { date: start, empty: startWasEmpty || true }
}
