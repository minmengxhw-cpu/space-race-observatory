import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  desc?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-[4.75rem] sm:scroll-mt-28 py-8 sm:py-14">
      <div className="mb-5 sm:mb-8">
        <p className="font-display text-xs sm:text-sm tracking-[0.28em] text-cyan-400 uppercase font-semibold">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-white tracking-wide leading-tight">
          {title}
        </h2>
        {desc && (
          <p className="mt-2.5 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">{desc}</p>
        )}
      </div>
      {children}
    </section>
  )
}
