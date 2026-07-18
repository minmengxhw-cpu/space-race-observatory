export function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-400 text-sm font-bold tracking-tight" aria-label={`${n}星`}>
      {'★'.repeat(Math.min(3, Math.max(0, n)))}
      <span className="text-slate-600">{'★'.repeat(Math.max(0, 3 - n))}</span>
    </span>
  )
}
