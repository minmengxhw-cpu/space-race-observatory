export function DateBar({
  date,
  dates,
  onPrev,
  onNext,
  onOpenArchive,
}: {
  date: string
  dates: string[]
  onPrev: () => void
  onNext: () => void
  onOpenArchive: () => void
}) {
  const idx = dates.indexOf(date)
  const canPrev = idx >= 0 && idx < dates.length - 1
  const canNext = idx > 0
  const parts = date.split('-')
  const md = parts.length === 3 ? `${parts[1]}.${parts[2]}` : date
  const y = parts[0] || ''

  return (
    <div className="flex items-stretch gap-2 mb-5">
      <button
        type="button"
        disabled={!canPrev}
        onClick={onPrev}
        className="w-14 shrink-0 rounded-2xl bg-slate-200 text-void text-3xl font-bold disabled:opacity-25 active:bg-white"
        aria-label="前一天"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={onOpenArchive}
        className="flex-1 rounded-2xl bg-white text-void px-4 py-3 min-h-[72px] text-left active:scale-[0.99] transition-transform shadow-lg"
      >
        <p className="text-xs sm:text-sm font-bold opacity-50 tracking-widest uppercase">
          展出日期 · {y}
        </p>
        <p className="font-mono-num text-3xl sm:text-4xl font-bold leading-none mt-1 tracking-tight">
          {md}
        </p>
        <p className="text-xs font-bold opacity-45 mt-1">点此打开归档</p>
      </button>

      <button
        type="button"
        disabled={!canNext}
        onClick={onNext}
        className="w-14 shrink-0 rounded-2xl bg-slate-200 text-void text-3xl font-bold disabled:opacity-25 active:bg-white"
        aria-label="后一天"
      >
        ›
      </button>
    </div>
  )
}
