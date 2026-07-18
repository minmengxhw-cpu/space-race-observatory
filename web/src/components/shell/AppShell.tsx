import type { ReactNode } from 'react'
import { SECTORS, type SectorId } from '../../lib/routes'

export function AppShell({
  sector,
  onSector,
  children,
  updatedAt,
}: {
  sector: SectorId
  onSector: (id: SectorId) => void
  children: ReactNode
  updatedAt?: string
}) {
  return (
    <div className="min-h-[100svh] bg-void text-slate-100 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <header
        className="sticky top-0 z-50 nav-glass"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onSector('hub')}
              className="flex items-center gap-2 min-w-0 text-left"
            >
              <span className="status-dot shrink-0" />
              <span className="font-display text-sm sm:text-base font-bold tracking-wide truncate">
                G2 科技树
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-mono-num">
                US × CN
              </span>
            </button>
            {updatedAt && (
              <span className="text-[11px] sm:text-xs font-mono-num text-emerald-400/90 shrink-0">
                周更 · {updatedAt}
              </span>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto">
            {SECTORS.map((s) => {
              const active = sector === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSector(s.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? s.id === 'ai'
                        ? 'bg-violet-500 text-white'
                        : s.id === 'aerospace'
                          ? 'bg-cyan-400 text-void'
                          : s.id === 'biopharma'
                            ? 'bg-emerald-400 text-void'
                            : s.id === 'future'
                              ? 'bg-amber-400 text-void'
                              : 'bg-slate-200 text-void'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {s.label}
                  {s.id === 'ai' && (
                    <span className="ml-1.5 text-[10px] opacity-80">核心</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {children}

      {/* 手机底栏：五类入口 */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-void/95 backdrop-blur-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <ul className="grid grid-cols-5 max-w-lg mx-auto">
          {SECTORS.map((s) => {
            const active = sector === s.id
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSector(s.id)}
                  className={`w-full flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[11px] font-semibold ${
                    active ? 'text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <span className="text-base leading-none">
                    {s.id === 'hub'
                      ? '◈'
                      : s.id === 'ai'
                        ? '◎'
                        : s.id === 'aerospace'
                          ? '▲'
                          : s.id === 'biopharma'
                            ? '✚'
                            : '✦'}
                  </span>
                  {s.short}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
