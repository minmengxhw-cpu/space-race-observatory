import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  titleEn: string
  tagline: string
  updatedAt: string
  onEnter: () => void
}

export function Hero({ title, titleEn, tagline, updatedAt, onEnter }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Atmosphere glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Orbit viz */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[min(78vw,560px)] aspect-square">
          <div className="absolute inset-[18%] rounded-full pulse-ring border border-cyan-400/20" />
          <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-cyan-400/15 via-slate-900/50 to-amber-500/15 border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.15),inset_0_0_60px_rgba(8,47,73,0.5)]" />
          {/* continents hint */}
          <div className="absolute inset-[22%] rounded-full opacity-40 bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(245,158,11,0.2),transparent_30%)]" />
          <div className="absolute inset-0 orbit-ring" />
          <div className="absolute inset-[10%] orbit-ring orbit-ring-amber" />
          <div className="absolute inset-[22%] orbit-ring opacity-40" style={{ animationDuration: '26s' }} />
          {/* satellites */}
          <span className="absolute top-[6%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#22d3ee]" />
          <span className="absolute bottom-[14%] right-[10%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_14px_#f59e0b]" />
          <span className="absolute top-[42%] left-[4%] w-1.5 h-1.5 rounded-full bg-cyan-100/90 shadow-[0_0_8px_#a5f3fc]" />
          <span className="absolute top-[28%] right-[8%] w-1 h-1 rounded-full bg-amber-200/80" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-emerald-400/25 bg-emerald-400/5 text-[11px] font-mono-num text-emerald-300/90"
        >
          <span className="status-dot" />
          TELEMETRY ONLINE · 数据截至 {updatedAt}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-glow-cyan"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="mt-3 font-display text-sm sm:text-base tracking-[0.28em] text-slate-400 uppercase"
        >
          {titleEn}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="section-rule mx-auto mt-8 max-w-md origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="mt-8 text-base sm:text-lg text-slate-300/95 max-w-2xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button type="button" onClick={onEnter} className="btn-primary group px-9 py-3.5 text-sm rounded-sm">
            进入对照台
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <a
            href="#overview"
            onClick={() => onEnter()}
            className="px-6 py-3.5 font-display text-xs tracking-widest uppercase text-slate-300 border border-slate-600/80 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors rounded-sm bg-black/20"
          >
            跳过开场
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] font-mono-num tracking-wider"
        >
          <span className="text-cyan-400/90">◆ SPACEX / US</span>
          <span className="text-amber-400/90">◆ 中国航天</span>
          <span className="text-slate-500">◆ 发射 · 回收 · 星座</span>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] font-display tracking-[0.35em] animate-bounce">
        SCROLL
      </div>
    </section>
  )
}
