import { motion } from 'framer-motion'
import type { CompareBlock, TimeMode } from '../types'

interface Props {
  left: CompareBlock
  right: CompareBlock
  mode: TimeMode
}

function SideCard({ block, mode, flip }: { block: CompareBlock; mode: TimeMode; flip?: boolean }) {
  const isCyan = block.accent === 'cyan'
  const metrics = block.metrics[mode]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: flip ? 0.08 : 0 }}
      className={`hud-panel hud-corner p-4 sm:p-6 relative overflow-hidden ${
        isCyan ? '' : 'hud-corner-amber hud-panel-amber'
      }`}
    >
      <div
        className={`absolute -top-20 ${flip ? '-left-16' : '-right-16'} w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl opacity-25 ${
          isCyan ? 'bg-cyan-400' : 'bg-amber-400'
        }`}
      />
      <div className="relative z-[2]">
        <p
          className={`font-display text-[10px] tracking-[0.25em] uppercase ${
            isCyan ? 'text-cyan-400' : 'text-amber-400'
          }`}
        >
          {isCyan ? 'WEST · US' : 'EAST · CN'}
        </p>
        <h3
          className={`mt-1.5 sm:mt-2 font-display text-xl sm:text-3xl font-semibold ${
            isCyan ? 'text-glow-cyan text-cyan-50' : 'text-glow-amber text-amber-50'
          }`}
        >
          {block.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">{block.subtitle}</p>

        <ul className="mt-4 sm:mt-6 space-y-0">
          {metrics.map((m, i) => (
            <li
              key={m.key}
              className={`flex items-start justify-between gap-3 py-2.5 sm:py-3 ${
                i < metrics.length - 1 ? 'border-b border-slate-700/45' : ''
              }`}
            >
              <span className="text-xs sm:text-sm text-slate-400 shrink-0">{m.key}</span>
              <span
                className={`text-xs sm:text-base font-medium text-right font-mono-num leading-snug ${
                  isCyan ? 'text-cyan-50' : 'text-amber-50'
                }`}
              >
                {m.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function DualCompare({ left, right, mode }: Props) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
      {/* 手机中间 VS 分隔 */}
      <div className="md:hidden flex items-center justify-center gap-3 py-0.5 order-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-600/50" />
        <div className="vs-badge !w-9 !h-9 !text-[10px]">VS</div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-600/50" />
      </div>
      <div className="order-1 md:order-none">
        <SideCard block={left} mode={mode} />
      </div>
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="vs-badge">VS</div>
      </div>
      <div className="order-3 md:order-none">
        <SideCard block={right} mode={mode} flip />
      </div>
    </div>
  )
}
