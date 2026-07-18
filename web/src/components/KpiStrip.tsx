import { motion } from 'framer-motion'
import type { KpiItem } from '../types'
import { useCountUp } from '../hooks/useCountUp'

function formatDisplay(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US')
  if (!Number.isInteger(n)) return n.toFixed(2).replace(/\.?0+$/, '')
  return String(n)
}

function KpiCard({ item, index }: { item: KpiItem; index: number }) {
  const n = useCountUp(item.value, 1100 + index * 70)
  const isChina = item.side === 'china' || item.side === 'CN'
  const isBoth = item.side === 'both' || item.side === 'BOTH'

  // 大色块：按阵营填色
  const shell = isChina
    ? 'bg-gradient-to-br from-amber-400/95 to-amber-700 text-void border-amber-300/40'
    : isBoth
      ? 'bg-gradient-to-br from-slate-500 to-slate-800 text-white border-slate-400/30'
      : 'bg-gradient-to-br from-cyan-400/95 to-cyan-700 text-void border-cyan-200/30'

  const muted = isBoth ? 'text-slate-200/90' : 'text-black/65'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className={`${shell} rounded-xl border p-4 sm:p-5 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between shadow-[0_10px_32px_rgba(0,0,0,0.35)]`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm sm:text-base font-semibold leading-snug pr-1 ${muted}`}>{item.label}</p>
        {item.planned && (
          <span className="shrink-0 text-[11px] sm:text-xs font-display tracking-wider uppercase px-2 py-0.5 rounded-md bg-black/20 font-bold">
            规划
          </span>
        )}
      </div>
      <div>
        <p className="font-mono-num text-3xl sm:text-4xl font-bold leading-none tracking-tight">
          {formatDisplay(n)}
          <span className={`text-base sm:text-lg ml-1.5 font-semibold ${muted}`}>{item.unit}</span>
        </p>
        {item.note && (
          <p className={`mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2 ${muted}`}>{item.note}</p>
        )}
      </div>
    </motion.article>
  )
}

export function KpiStrip({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {items.map((item, i) => (
        <KpiCard key={`${item.id}-${item.value}`} item={item} index={i} />
      ))}
    </div>
  )
}
