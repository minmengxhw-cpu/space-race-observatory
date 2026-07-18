import type { DomainId, SiteConfig } from '../../lib/dualTypes'

const ACTIVE: Record<string, string> = {
  all: 'bg-white text-void shadow-[0_0_20px_rgba(255,255,255,0.15)]',
  ai: 'bg-violet-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)]',
  aerospace: 'bg-cyan-400 text-void shadow-[0_0_24px_rgba(34,211,238,0.35)]',
  biopharma: 'bg-emerald-400 text-void shadow-[0_0_24px_rgba(52,211,153,0.3)]',
  future: 'bg-amber-400 text-void shadow-[0_0_24px_rgba(245,158,11,0.3)]',
}

export function DomainChips({
  domains,
  value,
  onChange,
  sticky,
}: {
  domains: SiteConfig['domains']
  value: DomainId | 'all'
  onChange: (v: DomainId | 'all') => void
  sticky?: boolean
}) {
  const all = [{ id: 'all' as const, label: '全部', short: '全部', color: 'slate' }, ...domains]
  return (
    <div
      className={`${
        sticky
          ? 'sticky top-0 z-30 -mx-3.5 px-3.5 py-2.5 bg-void/90 backdrop-blur-xl border-b border-cyan-500/10'
          : ''
      }`}
    >
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
        {all.map((d) => {
          const active = value === d.id
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id as DomainId | 'all')}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold min-h-[42px] border transition-all touch-manipulation ${
                active
                  ? `${ACTIVE[d.id] || ACTIVE.all} border-transparent`
                  : 'bg-slate-900/80 text-slate-400 border-slate-700/80 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {d.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
