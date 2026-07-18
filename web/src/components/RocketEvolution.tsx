import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface RocketItem {
  id: string
  name: string
  generation: string
  years: string
  status: string
  role: string
  image: string
  heightM: number | string
  diameterM: number | string
  engines: string
  leoKg: string
  reuse: string
  highlights: string[]
  improvements: string[]
  look: string
}

export interface RocketLineage {
  id: string
  name: string
  subtitle: string
  accent: 'cyan' | 'amber'
  era: string
  rockets: RocketItem[]
}

export interface RocketsData {
  note: string
  lineages: RocketLineage[]
  evolutionSummary: { side: string; title: string; steps: string[] }[]
}

export function RocketEvolution() {
  const [data, setData] = useState<RocketsData | null>(null)
  const [lineageId, setLineageId] = useState<'spacex' | 'china'>('spacex')
  const [rocketId, setRocketId] = useState<string | null>(null)
  const [imgError, setImgError] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/rockets.json`)
      .then((r) => r.json())
      .then((d: RocketsData) => {
        setData(d)
        const first = d.lineages.find((l) => l.id === 'spacex')?.rockets[0]
        if (first) setRocketId(first.id)
      })
      .catch(() => setData(null))
  }, [])

  const lineage = useMemo(
    () => data?.lineages.find((l) => l.id === lineageId) ?? null,
    [data, lineageId],
  )

  const selected = useMemo(() => {
    if (!lineage) return null
    return lineage.rockets.find((r) => r.id === rocketId) ?? lineage.rockets[0]
  }, [lineage, rocketId])

  const switchLineage = (id: 'spacex' | 'china') => {
    setLineageId(id)
    const lin = data?.lineages.find((l) => l.id === id)
    if (lin?.rockets[0]) setRocketId(lin.rockets[0].id)
  }

  if (!data || !lineage || !selected) {
    return (
      <div className="hud-panel p-8 text-center text-slate-500 text-sm">火箭图鉴加载中…</div>
    )
  }

  const isCyan = lineage.accent === 'cyan'
  const imgSrc = `${import.meta.env.BASE_URL}${selected.image}`

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 演进主线摘要 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.evolutionSummary.map((s) => {
          const cyan = s.side === 'spacex'
          return (
            <div
              key={s.side}
              className={`hud-panel hud-corner p-4 ${cyan ? '' : 'hud-corner-amber hud-panel-amber'}`}
            >
              <p
                className={`font-display text-[10px] tracking-[0.25em] uppercase ${
                  cyan ? 'text-cyan-400' : 'text-amber-400'
                }`}
              >
                {s.title}
              </p>
              <ol className="mt-3 space-y-1.5">
                {s.steps.map((step, i) => (
                  <li key={step} className="flex gap-2 text-xs sm:text-sm text-slate-300">
                    <span
                      className={`font-mono-num shrink-0 ${cyan ? 'text-cyan-500' : 'text-amber-500'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>

      {/* 谱系切换 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="font-display text-[10px] tracking-[0.3em] text-slate-500 uppercase">
            选择谱系 · {lineage.era}
          </p>
          <p className="text-sm text-slate-400 mt-0.5">{lineage.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 w-full sm:w-auto p-1 rounded-md border border-slate-700/80 bg-space/80">
          {data.lineages.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => switchLineage(l.id as 'spacex' | 'china')}
              className={`min-h-[44px] px-3 sm:px-5 py-2 text-xs sm:text-sm font-display tracking-wide rounded-sm touch-manipulation ${
                lineageId === l.id
                  ? l.accent === 'cyan'
                    ? 'tab-active-cyan border border-cyan-400/30'
                    : 'tab-active-amber border border-amber-400/30'
                  : 'text-slate-400 border border-transparent'
              }`}
            >
              {l.id === 'spacex' ? 'SpaceX / 马斯克' : '中国长征'}
            </button>
          ))}
        </div>
      </div>

      {/* 横向世代选择器 */}
      <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-1">
        <div className="flex gap-2 sm:gap-3 px-1 min-w-min">
          {lineage.rockets.map((r, idx) => {
            const active = r.id === selected.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRocketId(r.id)}
                className={`relative shrink-0 w-[7.5rem] sm:w-36 rounded-md overflow-hidden border text-left touch-manipulation transition-all ${
                  active
                    ? isCyan
                      ? 'border-cyan-400/70 ring-1 ring-cyan-400/40'
                      : 'border-amber-400/70 ring-1 ring-amber-400/40'
                    : 'border-slate-700/80 opacity-80'
                }`}
              >
                <div className="aspect-[3/4] bg-black/50 relative">
                  {!imgError[r.id] ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${r.image}`}
                      alt={r.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={() => setImgError((e) => ({ ...e, [r.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">
                      图
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-[9px] font-mono-num text-slate-400">
                      {String(idx + 1).padStart(2, '0')} · {r.generation}
                    </p>
                    <p className="text-[11px] sm:text-xs font-medium text-slate-100 leading-tight mt-0.5">
                      {r.name}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`hud-panel hud-corner overflow-hidden ${
            isCyan ? '' : 'hud-corner-amber hud-panel-amber'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[420px] bg-black/40">
              <img
                src={imgSrc}
                alt={selected.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p
                  className={`font-display text-[10px] tracking-[0.3em] uppercase ${
                    isCyan ? 'text-cyan-300' : 'text-amber-300'
                  }`}
                >
                  {selected.generation} · {selected.years}
                </p>
                <h3
                  className={`font-display text-2xl sm:text-3xl text-white mt-1 ${
                    isCyan ? 'text-glow-cyan' : 'text-glow-amber'
                  }`}
                >
                  {selected.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{selected.role}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 relative z-[2]">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`text-[10px] px-2 py-1 border rounded-sm ${
                    isCyan
                      ? 'border-cyan-400/40 text-cyan-300'
                      : 'border-amber-400/40 text-amber-300'
                  }`}
                >
                  {selected.status}
                </span>
                <span className="text-[10px] px-2 py-1 border border-slate-600 text-slate-400 rounded-sm">
                  {selected.reuse}
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-5">
                <Spec label="高度" value={`${selected.heightM} m`} />
                <Spec label="直径" value={`${selected.diameterM} m`} />
                <Spec label="LEO 运力" value={selected.leoKg} />
                <Spec label="动力" value={selected.engines} wide />
              </dl>

              <div className="mb-4">
                <p className="font-display text-[10px] tracking-[0.25em] text-slate-500 uppercase mb-2">
                  外形特征
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selected.look}</p>
              </div>

              <div className="mb-4">
                <p
                  className={`font-display text-[10px] tracking-[0.25em] uppercase mb-2 ${
                    isCyan ? 'text-cyan-400/90' : 'text-amber-400/90'
                  }`}
                >
                  相对上一代 · 关键改进
                </p>
                <ul className="space-y-2">
                  {selected.improvements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className={isCyan ? 'text-cyan-400 shrink-0' : 'text-amber-400 shrink-0'}>
                        ▹
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selected.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/50">
                  {selected.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] sm:text-[11px] px-2 py-1 rounded-sm bg-black/30 text-slate-400 border border-slate-700/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed px-0.5">{data.note}</p>
    </div>
  )
}

function Spec({
  label,
  value,
  wide,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div
      className={`rounded-sm bg-black/25 border border-slate-700/50 p-2.5 ${
        wide ? 'col-span-2' : ''
      }`}
    >
      <dt className="text-[10px] text-slate-500">{label}</dt>
      <dd className="mt-0.5 font-mono-num text-slate-100 text-xs sm:text-sm leading-snug break-words">
        {value}
      </dd>
    </div>
  )
}
