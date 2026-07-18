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
    <section id={id} className="scroll-mt-28 py-11 sm:py-14">
      <div className="mb-6 sm:mb-8">
        <p className="font-display text-[11px] tracking-[0.35em] text-cyan-400/85 uppercase">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-slate-50 tracking-wide">
          {title}
        </h2>
        {desc && (
          <p className="mt-2.5 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">{desc}</p>
        )}
      </div>
      {children}
    </section>
  )
}
