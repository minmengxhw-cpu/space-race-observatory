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
  const nice = parts.length === 3 ? `${parts[0]} · ${parts[1]}/${parts[2]}` : date

  return (
    <div className="hud-panel hud-corner rounded-2xl p-2 sm:p-2.5 mb-5">
      <div className="relative z-[2] flex items-center gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={onPrev}
          className="w-12 h-12 shrink-0 rounded-xl border border-slate-600/80 bg-black/40 text-2xl text-cyan-300 font-light disabled:opacity-25 active:bg-cyan-500/10 transition-colors"
          aria-label="前一天"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={onOpenArchive}
          className="flex-1 min-h-[52px] rounded-xl bg-gradient-to-b from-slate-800/80 to-black/40 border border-slate-600/50 px-3 py-2 text-center active:border-cyan-400/40 transition-colors"
        >
          <p className="font-display text-[10px] tracking-[0.3em] text-cyan-400/80 uppercase">
            Telemetry day
          </p>
          <p className="font-mono-num text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
            {nice}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">点击打开归档</p>
        </button>

        <button
          type="button"
          disabled={!canNext}
          onClick={onNext}
          className="w-12 h-12 shrink-0 rounded-xl border border-slate-600/80 bg-black/40 text-2xl text-cyan-300 font-light disabled:opacity-25 active:bg-cyan-500/10 transition-colors"
          aria-label="后一天"
        >
          ›
        </button>
      </div>
    </div>
  )
}
