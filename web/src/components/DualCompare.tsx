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
      initial={{ opacity: 0, x: flip ? 28 : -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`hud-panel hud-corner p-5 sm:p-6 relative overflow-hidden ${
        isCyan ? '' : 'hud-corner-amber hud-panel-amber'
      }`}
    >
      <div
        className={`absolute -top-20 ${flip ? '-left-16' : '-right-16'} w-48 h-48 rounded-full blur-3xl opacity-25 ${
          isCyan ? 'bg-cyan-400' : 'bg-amber-400'
        }`}
      />
      <div className="relative z-[2]">
        <p
          className={`font-display text-[10px] tracking-[0.3em] uppercase ${
            isCyan ? 'text-cyan-400' : 'text-amber-400'
          }`}
        >
          {isCyan ? 'WEST · US INDUSTRY' : 'EAST · CHINA'}
        </p>
        <h3
          className={`mt-2 font-display text-2xl sm:text-3xl font-semibold ${
            isCyan ? 'text-glow-cyan text-cyan-50' : 'text-glow-amber text-amber-50'
          }`}
        >
          {block.name}
        </h3>
        <p className="mt-1 text-sm text-slate-400">{block.subtitle}</p>

        <ul className="mt-6 space-y-0">
          {metrics.map((m, i) => (
            <li
              key={m.key}
              className={`flex items-start justify-between gap-4 py-3 ${
                i < metrics.length - 1 ? 'border-b border-slate-700/45' : ''
              }`}
            >
              <span className="text-sm text-slate-400">{m.key}</span>
              <span
                className={`text-sm sm:text-base font-medium text-right font-mono-num ${
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
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <SideCard block={left} mode={mode} />
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="vs-badge">VS</div>
      </div>
      <SideCard block={right} mode={mode} flip />
    </div>
  )
}
