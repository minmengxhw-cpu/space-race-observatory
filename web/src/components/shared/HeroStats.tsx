export type HeroStat = {
  label: string
  value: string
  unit: string
  tone: 'cyan' | 'amber' | 'slate' | 'violet' | 'emerald'
  note?: string
}

const TONE: Record<HeroStat['tone'], string> = {
  cyan: 'bg-gradient-to-br from-cyan-400 to-cyan-700 text-void',
  amber: 'bg-gradient-to-br from-amber-400 to-amber-700 text-void',
  slate: 'bg-gradient-to-br from-slate-500 to-slate-800 text-white',
  violet: 'bg-gradient-to-br from-violet-400 to-violet-700 text-white',
  emerald: 'bg-gradient-to-br from-emerald-400 to-emerald-700 text-void',
}

const MUTED: Record<HeroStat['tone'], string> = {
  cyan: 'text-cyan-950/70',
  amber: 'text-amber-950/70',
  slate: 'text-slate-200/90',
  violet: 'text-violet-100/80',
  emerald: 'text-emerald-950/70',
}

export function HeroStats({ items }: { items: HeroStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((b) => (
        <div
          key={b.label}
          className={`${TONE[b.tone]} rounded-xl p-4 sm:p-5 min-h-[128px] sm:min-h-[148px] flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
        >
          <p className={`text-sm sm:text-base font-semibold ${MUTED[b.tone]}`}>{b.label}</p>
          <div>
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
              {b.value}
            </p>
            <p className={`mt-1 text-sm font-medium ${MUTED[b.tone]}`}>{b.unit}</p>
            {b.note && <p className={`mt-1 text-xs sm:text-sm opacity-80 ${MUTED[b.tone]}`}>{b.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
