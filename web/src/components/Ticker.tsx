export function Ticker({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="ticker overflow-hidden border-y border-slate-800/80 bg-black/30 py-2.5">
      <div className="ticker-track gap-10">
        {loop.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-mono-num text-[11px] sm:text-xs text-slate-400 whitespace-nowrap"
          >
            <span className="text-cyan-500/80 mr-2">◈</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
