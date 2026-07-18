import type { TimeMode } from '../types'

const MODES: { id: TimeMode; label: string; hint: string }[] = [
  { id: 'past', label: '过去', hint: '历史' },
  { id: 'present', label: '现在', hint: '当年' },
  { id: 'future', label: '未来', hint: '规划' },
]

interface Props {
  value: TimeMode
  onChange: (m: TimeMode) => void
  modeLabel: string
}

export function TimeModeTabs({ value, onChange, modeLabel }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] text-cyan-400/80 uppercase">
          时间维度
        </p>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">{modeLabel}</p>
      </div>
      <div className="grid grid-cols-3 w-full sm:w-auto sm:inline-flex p-1 rounded-md border border-slate-700/80 bg-space/80">
        {MODES.map((m) => {
          const active = value === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={`min-h-[44px] px-2 sm:px-6 py-2.5 rounded-sm text-sm font-medium transition-all touch-manipulation ${
                active
                  ? m.id === 'future'
                    ? 'tab-active-amber border border-amber-400/30'
                    : 'tab-active-cyan border border-cyan-400/30'
                  : 'text-slate-400 active:text-slate-200 border border-transparent'
              }`}
            >
              <span className="font-display tracking-wider block text-center">{m.label}</span>
              <span className="block text-[10px] mt-0.5 opacity-70 text-center sm:hidden">{m.hint}</span>
              <span className="hidden sm:inline text-xs ml-2 opacity-70">{m.hint}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
