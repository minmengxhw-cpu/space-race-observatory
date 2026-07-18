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
    <footer className="border-t border-slate-800/80 mt-4 sm:mt-8 pt-8 sm:pt-10 pb-8 sm:pb-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] text-slate-500 uppercase">
          Data & Disclaimer
        </p>
        <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">{disclaimer}</p>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          火箭图鉴优先使用 NASA 与 Wikimedia Commons 公开实拍；长征九号尚未首飞，暂用中国重型火箭发射实拍作场景参照。规格与改进点为公开量级。
        </p>
        <p className="mt-2 text-[11px] sm:text-xs text-slate-500 font-mono-num">
          数据截至 {updatedAt} · 口径可能调整
        </p>

        <ul className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sources.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs sm:text-sm text-cyan-400/80 active:text-cyan-300 underline-offset-4 hover:underline py-1 min-h-[40px] leading-snug break-words"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 sm:mt-10 text-center text-[10px] sm:text-[11px] text-slate-600 font-display tracking-[0.15em] sm:tracking-[0.2em] px-2">
          SPACE RACE OBSERVATORY · 航天对照台
        </p>
      </div>
    </footer>
  )
}
