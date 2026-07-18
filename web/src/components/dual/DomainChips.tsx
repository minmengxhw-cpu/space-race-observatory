import type { DomainId, SiteConfig } from '../../lib/dualTypes'

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
        sticky ? 'sticky top-[52px] z-30 -mx-3 px-3 py-2 bg-void/95 backdrop-blur-md border-b border-slate-800/80' : ''
      }`}
    >
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {all.map((d) => {
          const active = value === d.id
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id as DomainId | 'all')}
              className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-bold min-h-[40px] transition-colors ${
                active
                  ? d.id === 'ai'
                    ? 'bg-violet-500 text-white'
                    : d.id === 'aerospace'
                      ? 'bg-cyan-400 text-void'
                      : d.id === 'biopharma'
                        ? 'bg-emerald-400 text-void'
                        : d.id === 'future'
                          ? 'bg-amber-400 text-void'
                          : 'bg-white text-void'
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
