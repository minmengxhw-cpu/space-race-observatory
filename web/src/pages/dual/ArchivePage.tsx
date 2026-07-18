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
    <div className="relative min-h-[100svh] bg-void">
      <div className="pointer-events-none fixed inset-0 starfield opacity-40" />
      <div className="relative z-10 max-w-lg mx-auto px-3 pb-14 sm:max-w-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mt-4 min-h-[48px] px-4 rounded-2xl bg-slate-200 text-void text-base font-bold"
        >
          ← 返回
        </button>

        <div className="mt-4 rounded-2xl bg-white text-void p-5 sm:p-6 shadow-xl">
          <p className="text-sm font-bold opacity-50 tracking-widest uppercase">Archive</p>
          <h1 className="mt-1 font-display text-4xl sm:text-5xl font-bold leading-none">归档</h1>
          <p className="mt-2 text-base font-bold opacity-70">点日期回看当日展出</p>
        </div>

        {[...byMonth.entries()].map(([month, ds]) => (
          <section key={month} className="mt-8">
            <p className="font-mono-num text-2xl font-bold text-white mb-3">{month}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {ds.map((d) => {
                const active = d === current
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onPick(d)}
                    className={`rounded-2xl min-h-[88px] flex flex-col items-center justify-center ${
                      active
                        ? 'bg-cyan-400 text-void'
                        : 'bg-slate-200 text-void'
                    }`}
                  >
                    <span className="font-mono-num text-3xl font-bold leading-none">
                      {d.slice(5)}
                    </span>
                    <span className="text-xs font-bold opacity-50 mt-1">{d.slice(0, 4)}</span>
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
