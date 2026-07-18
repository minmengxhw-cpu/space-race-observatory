export function Stars({ n, light }: { n: number; light?: boolean }) {
  // light=true 用在深色背景；false 用在亮色大字块上
  const on = light ? 'text-amber-300' : 'text-void'
  const off = light ? 'text-white/25' : 'text-black/20'
  return (
    <span className={`text-base font-bold tracking-tight ${on}`} aria-label={`${n}星`}>
      {'★'.repeat(Math.min(3, Math.max(0, n)))}
      <span className={off}>{'★'.repeat(Math.max(0, 3 - n))}</span>
    </span>
  )
}
