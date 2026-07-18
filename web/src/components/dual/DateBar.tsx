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
  const canPrev = idx >= 0 && idx < dates.length - 1 // older
  const canNext = idx > 0 // newer

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <button
        type="button"
        disabled={!canPrev}
        onClick={onPrev}
        className="w-11 h-11 rounded-xl bg-slate-800 text-xl font-bold disabled:opacity-30 active:bg-slate-700"
        aria-label="前一天"
      >
        ‹
      </button>
      <button type="button" onClick={onOpenArchive} className="flex-1 text-center min-h-[44px]">
        <p className="font-mono-num text-lg sm:text-xl font-bold text-white tracking-wide">{date}</p>
        <p className="text-xs text-slate-400 mt-0.5">点此归档日历 · 可回看</p>
      </button>
      <button
        type="button"
        disabled={!canNext}
        onClick={onNext}
        className="w-11 h-11 rounded-xl bg-slate-800 text-xl font-bold disabled:opacity-30 active:bg-slate-700"
        aria-label="后一天"
      >
        ›
      </button>
    </div>
  )
}
