import type { DomainId, SiteConfig } from '../../lib/dualTypes'

const ACTIVE: Record<string, string> = {
  all: 'bg-white text-void',
  ai: 'bg-violet-500 text-white',
  aerospace: 'bg-cyan-400 text-void',
  biopharma: 'bg-emerald-400 text-void',
  future: 'bg-amber-400 text-void',
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
          ? 'sticky top-0 z-30 -mx-3 px-3 py-2.5 bg-void/95 backdrop-blur-md'
          : ''
      }`}
    >
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {all.map((d) => {
          const active = value === d.id
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id as DomainId | 'all')}
              className={`shrink-0 px-4 py-3 rounded-2xl text-base font-bold min-h-[48px] transition-colors ${
                active
                  ? ACTIVE[d.id] || ACTIVE.all
                  : 'bg-slate-800 text-slate-300'
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
