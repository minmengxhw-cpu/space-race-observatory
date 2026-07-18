export function ArchivePage({
  dates,
  current,
  onPick,
  onBack,
}: {
  dates: string[]
  current: string
  onPick: (d: string) => void
  onBack: () => void
}) {
  const byMonth = new Map<string, string[]>()
  for (const d of dates) {
    const m = d.slice(0, 7)
    if (!byMonth.has(m)) byMonth.set(m, [])
    byMonth.get(m)!.push(d)
  }

  return (
    <div className="relative min-h-[100svh]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-violet-500/10 blur-[90px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-lg mx-auto px-3.5 pb-12 sm:max-w-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-sm font-semibold text-cyan-300 min-h-[44px] px-3 rounded-lg border border-cyan-400/20 bg-cyan-500/5"
        >
          ← 返回
        </button>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white text-glow-cyan">
          归档
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">点日期回看当日对照 · 全静态可截图</p>

        {[...byMonth.entries()].map(([month, ds]) => (
          <section key={month} className="mt-8">
            <h2 className="font-mono-num text-base font-bold text-cyan-400 mb-3 tracking-wide">
              {month}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ds.map((d) => {
                const active = d === current
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onPick(d)}
                    className={`rounded-2xl py-5 px-3 text-center min-h-[72px] border transition-all ${
                      active
                        ? 'bg-cyan-400 text-void border-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.35)]'
                        : 'bg-gradient-to-b from-[#0c1829] to-[#070f1a] text-white border-slate-700/80 hover:border-cyan-400/40'
                    }`}
                  >
                    <p className="font-mono-num text-lg font-bold">{d.slice(5)}</p>
                    <p className={`text-[10px] mt-1 ${active ? 'opacity-70' : 'text-slate-500'}`}>
                      {d.slice(0, 4)}
                    </p>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
