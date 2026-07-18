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
    <section id={id} className="scroll-mt-[4.5rem] sm:scroll-mt-28 py-7 sm:py-14">
      <div className="mb-4 sm:mb-8">
        <p className="font-display text-[10px] sm:text-[11px] tracking-[0.3em] text-cyan-400/85 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 sm:mt-2 font-display text-xl sm:text-3xl font-semibold text-slate-50 tracking-wide">
          {title}
        </h2>
        {desc && (
          <p className="mt-2 text-xs sm:text-base text-slate-400 max-w-3xl leading-relaxed">{desc}</p>
        )}
      </div>
      {children}
    </section>
  )
}
