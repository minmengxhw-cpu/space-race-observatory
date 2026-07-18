import type { Source } from '../types'

export function SourcesFooter({
  sources,
  disclaimer,
  updatedAt,
}: {
  sources: Source[]
  disclaimer: string
  updatedAt: string
}) {
  return (
    <footer className="border-t border-slate-800/80 mt-8 pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <p className="font-display text-xs tracking-[0.3em] text-slate-500 uppercase">Data & Disclaimer</p>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-3xl">{disclaimer}</p>
        <p className="mt-2 text-xs text-slate-500 font-mono-num">数据截至 {updatedAt} · 口径可能调整</p>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sources.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cyan-400/80 hover:text-cyan-300 underline-offset-4 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[11px] text-slate-600 font-display tracking-[0.2em]">
          SPACE RACE OBSERVATORY · 航天对照台 · 科普可视化
        </p>
      </div>
    </footer>
  )
}
