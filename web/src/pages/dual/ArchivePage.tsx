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
  // group by month
  const byMonth = new Map<string, string[]>()
  for (const d of dates) {
    const m = d.slice(0, 7)
    if (!byMonth.has(m)) byMonth.set(m, [])
    byMonth.get(m)!.push(d)
  }

  return (
    <div className="max-w-lg mx-auto px-3 pb-10 sm:max-w-2xl">
      <button type="button" onClick={onBack} className="mt-3 text-sm font-semibold text-slate-400 min-h-[40px]">
        ← 返回
      </button>
      <h1 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-white">归档</h1>
      <p className="mt-1 text-sm text-slate-400">点日期回看当日对照页 · 全静态可截图</p>

      {[...byMonth.entries()].map(([month, ds]) => (
        <section key={month} className="mt-6">
          <h2 className="font-mono-num text-base font-bold text-cyan-400 mb-2">{month}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ds.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onPick(d)}
                className={`rounded-xl py-4 px-3 text-center font-mono-num font-bold text-sm min-h-[56px] border ${
                  d === current
                    ? 'bg-cyan-400 text-void border-cyan-300'
                    : 'bg-slate-800 text-white border-slate-700'
                }`}
              >
                {d.slice(5)}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
