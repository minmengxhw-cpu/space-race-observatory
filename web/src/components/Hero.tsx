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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 pt-[env(safe-area-inset-top)] pb-10">
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 grid-bg opacity-50 sm:opacity-70" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 sm:opacity-100">
        <div className="relative w-[min(88vw,520px)] sm:w-[min(78vw,560px)] aspect-square translate-y-[-4%] sm:translate-y-0">
          <div className="absolute inset-[18%] rounded-full pulse-ring border border-cyan-400/20" />
          <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-cyan-400/15 via-slate-900/50 to-amber-500/15 border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.15),inset_0_0_60px_rgba(8,47,73,0.5)]" />
          <div className="absolute inset-[22%] rounded-full opacity-40 bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(245,158,11,0.2),transparent_30%)]" />
          <div className="absolute inset-0 orbit-ring" />
          <div className="absolute inset-[10%] orbit-ring orbit-ring-amber" />
          <div className="absolute inset-[22%] orbit-ring opacity-40" style={{ animationDuration: '26s' }} />
          <span className="absolute top-[6%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#22d3ee]" />
          <span className="absolute bottom-[14%] right-[10%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_14px_#f59e0b]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 mb-5 sm:mb-8 rounded-full border border-emerald-400/25 bg-emerald-400/5 text-[10px] sm:text-[11px] font-mono-num text-emerald-300/90 max-w-full"
        >
          <span className="status-dot shrink-0" />
          <span className="truncate">ONLINE · 数据截至 {updatedAt}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="font-display text-[2rem] leading-tight sm:text-6xl md:text-7xl font-semibold tracking-wide text-glow-cyan"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="mt-2 sm:mt-3 font-display text-[11px] sm:text-base tracking-[0.18em] sm:tracking-[0.28em] text-slate-400 uppercase"
        >
          {titleEn}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="section-rule mx-auto mt-5 sm:mt-8 max-w-[12rem] sm:max-w-md origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48 }}
          className="mt-5 sm:mt-8 text-sm sm:text-lg text-slate-300/95 max-w-2xl mx-auto leading-relaxed px-1"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <button
            type="button"
            onClick={onEnter}
            className="btn-primary group w-full sm:w-auto min-h-[48px] px-8 py-3.5 text-sm rounded-sm touch-manipulation"
          >
            进入对照台
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <a
            href="#overview"
            onClick={() => onEnter()}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center px-6 py-3.5 font-display text-xs tracking-widest uppercase text-slate-300 border border-slate-600/80 active:border-cyan-400/50 active:text-cyan-200 transition-colors rounded-sm bg-black/30 touch-manipulation"
          >
            跳过开场
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] sm:text-[11px] font-mono-num tracking-wider"
        >
          <span className="text-cyan-400/90">◆ SPACEX / US</span>
          <span className="text-amber-400/90">◆ 中国航天</span>
          <span className="text-slate-500">◆ 发射 · 回收 · 星座</span>
        </motion.div>
      </div>

      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-slate-600 text-[10px] font-display tracking-[0.35em] animate-bounce hidden sm:block">
        SCROLL
      </div>
    </section>
  )
}
