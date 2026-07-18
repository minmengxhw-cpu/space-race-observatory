/** 每周更新计划展示 */
export function UpdateBadge({ updatedAt }: { updatedAt: string }) {
  const next = nextMondayLabel(updatedAt)

  return (
    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 sm:px-5 sm:py-4 mb-5 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 status-dot shrink-0 !bg-emerald-400 !shadow-[0_0_12px_#34d399]" />
          <div>
            <p className="text-base sm:text-lg font-semibold text-emerald-200">
              数据计划：每周一自动巡检更新
            </p>
            <p className="mt-1 text-sm sm:text-base text-slate-300 leading-relaxed">
              最近发布数据截至 <span className="font-mono-num text-white font-semibold">{updatedAt}</span>
              。站点会按周复核发射 / 着陆 / 星座公开数字（非实时秒级）。
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-lg bg-emerald-400 text-void px-3 py-2 text-center">
          <p className="text-xs font-display tracking-wider font-bold">NEXT CHECK</p>
          <p className="font-mono-num text-sm sm:text-base font-bold">{next}</p>
        </div>
      </div>
    </div>
  )
}

function nextMondayLabel(fromIso: string) {
  try {
    const d = new Date(fromIso + 'T12:00:00')
    if (Number.isNaN(d.getTime())) return '每周一'
    // next Monday from today (local)
    const now = new Date()
    const day = now.getDay() // 0 Sun
    const add = day === 1 ? 7 : (8 - day) % 7 || 7
    const next = new Date(now)
    next.setDate(now.getDate() + (day === 1 && now.getHours() < 12 ? 0 : add === 0 ? 7 : add))
    // simpler: always next Monday from today
    const n = new Date()
    const diff = (1 + 7 - n.getDay()) % 7 || 7
    n.setDate(n.getDate() + diff)
    const y = n.getFullYear()
    const m = String(n.getMonth() + 1).padStart(2, '0')
    const dd = String(n.getDate()).padStart(2, '0')
    return `${y}-${m}-${dd}`
  } catch {
    return '每周一'
  }
}
