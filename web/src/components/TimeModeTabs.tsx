import type { TimeMode } from '../types'

const MODES: { id: TimeMode; label: string; hint: string }[] = [
  { id: 'past', label: '过去', hint: '历史累计' },
  { id: 'present', label: '现在', hint: '当年进度' },
  { id: 'future', label: '未来', hint: '公开规划' },
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
        <p className="font-display text-xs sm:text-sm tracking-[0.25em] text-cyan-400 uppercase font-semibold">
          时间维度
        </p>
        <p className="text-sm sm:text-base text-slate-300 mt-1 leading-snug">{modeLabel}</p>
      </div>
      <div className="grid grid-cols-3 w-full sm:w-auto sm:inline-flex p-1 rounded-xl border border-slate-600/80 bg-space/90">
        {MODES.map((m) => {
          const active = value === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={`min-h-[48px] px-3 sm:px-6 py-2.5 rounded-lg text-base font-semibold transition-all touch-manipulation ${
                active
                  ? m.id === 'future'
                    ? 'bg-amber-400 text-void shadow-lg'
                    : 'bg-cyan-400 text-void shadow-lg'
                  : 'text-slate-400 active:text-slate-200'
              }`}
            >
              <span className="font-display tracking-wider block text-center">{m.label}</span>
              <span className="block text-xs mt-0.5 opacity-80 text-center font-normal">{m.hint}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
