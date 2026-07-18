export function Stars({ n, light }: { n: number; light?: boolean }) {
  const on = light ? 'text-white' : 'text-amber-400'
  const off = light ? 'text-white/25' : 'text-slate-600'
  return (
    <span className={`text-sm font-bold tracking-tight ${on}`} aria-label={`${n}星`}>
      {'★'.repeat(Math.min(3, Math.max(0, n)))}
      <span className={off}>{'★'.repeat(Math.max(0, 3 - n))}</span>
    </span>
  )
}
