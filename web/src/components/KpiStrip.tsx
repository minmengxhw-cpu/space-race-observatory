import { motion } from 'framer-motion'
import type { KpiItem } from '../types'
import { useCountUp } from '../hooks/useCountUp'

function formatDisplay(n: number): string {
  if (n >= 10000) return n.toLocaleString('en-US')
  if (n >= 1000) return n.toLocaleString('en-US')
  if (!Number.isInteger(n)) return n.toFixed(2).replace(/\.?0+$/, '')
  return String(n)
}

function KpiCard({ item, index }: { item: KpiItem; index: number }) {
  const n = useCountUp(item.value, 1100 + index * 70)
  const isChina = item.side === 'china' || item.side === 'CN'
  const isBoth = item.side === 'both' || item.side === 'BOTH'

  const valueClass = isChina
    ? 'kpi-value-amber text-glow-amber'
    : isBoth
      ? 'kpi-value'
      : 'kpi-value-cyan text-glow-cyan'

  const panelClass = isChina
    ? 'hud-panel hud-corner hud-corner-amber hud-panel-amber scanlines'
    : 'hud-panel hud-corner scanlines'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className={`${panelClass} p-3.5 sm:p-5`}
    >
      <div className="relative z-[2] flex items-start justify-between gap-2">
        <p className="text-[11px] sm:text-sm text-slate-400 leading-snug pr-1">{item.label}</p>
        {item.planned && (
          <span className="shrink-0 text-[9px] sm:text-[10px] font-display tracking-wider uppercase px-1.5 py-0.5 border border-dashed border-amber-400/55 text-amber-300/90 bg-amber-400/5">
            规划
          </span>
        )}
      </div>
      <p
        className={`relative z-[2] mt-2 sm:mt-3 font-mono-num text-xl sm:text-3xl font-semibold leading-none ${valueClass}`}
      >
        {formatDisplay(n)}
        <span className="text-[11px] sm:text-base ml-1 sm:ml-1.5 opacity-70 font-normal text-slate-400">
          {item.unit}
        </span>
      </p>
      {item.note && (
        <p className="relative z-[2] mt-2 text-[10px] sm:text-[11px] text-slate-500 leading-relaxed border-t border-slate-700/40 pt-2 line-clamp-3 sm:line-clamp-none">
          {item.note}
        </p>
      )}
    </motion.article>
  )
}

export function KpiStrip({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
      {items.map((item, i) => (
        <KpiCard key={`${item.id}-${item.value}`} item={item} index={i} />
      ))}
    </div>
  )
}
