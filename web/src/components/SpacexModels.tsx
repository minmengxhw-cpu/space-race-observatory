const MODELS = [
  {
    id: 'f1',
    name: 'Falcon 1',
    gen: '第 1 代',
    years: '2006–09',
    tag: '入轨起点',
    image: 'rockets/falcon1.jpg',
    points: ['首次入轨', 'Merlin 验证', '商业航天起跑'],
  },
  {
    id: 'f9e',
    name: 'Falcon 9 早期',
    gen: '第 2 代',
    years: '2010–15',
    tag: '运力跃升',
    image: 'rockets/falcon9-early.jpg',
    points: ['九机并联', 'Dragon 货运', '着陆试验'],
  },
  {
    id: 'f9b5',
    name: 'Falcon 9 Block 5',
    gen: '第 3 代主力',
    years: '2018–',
    tag: '工业复用',
    image: 'rockets/falcon9-block5.jpg',
    points: ['30+ 飞/箭', '星链主力', '全球最高频'],
  },
  {
    id: 'fh',
    name: 'Falcon Heavy',
    gen: '重型',
    years: '2018–',
    tag: '三芯捆绑',
    image: 'rockets/falcon-heavy.jpg',
    points: ['27 机 Merlin', '高能轨道', '侧助推器复用'],
  },
  {
    id: 'ss',
    name: 'Starship',
    gen: '第 4 代',
    years: '试验中',
    tag: '完全可复用',
    image: 'rockets/starship.jpg',
    points: ['9 m 不锈钢', '甲烷 Raptor', '塔架捕获'],
  },
]

export function SpacexModels() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
        <div>
          <p className="font-display text-sm tracking-[0.2em] text-cyan-400 uppercase">SpaceX 型号墙</p>
          <p className="text-base sm:text-lg text-slate-300 mt-1">
            马斯克旗下五条主线：从入轨小火箭到超级重型
          </p>
        </div>
      </div>
      <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-2">
        <div className="flex gap-3 sm:gap-4 px-1 min-w-min">
          {MODELS.map((m, i) => (
            <article
              key={m.id}
              className="shrink-0 w-[72vw] max-w-[280px] sm:w-[240px] rounded-xl overflow-hidden border border-cyan-400/30 bg-panel shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
            >
              <div className="relative aspect-[3/4] bg-black">
                <img
                  src={`${import.meta.env.BASE_URL}${m.image}`}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-400 text-void text-xs sm:text-sm font-bold font-display">
                    {String(i + 1).padStart(2, '0')} · {m.gen}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-cyan-300 text-sm font-medium">{m.tag}</p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5 leading-tight">
                    {m.name}
                  </h3>
                  <p className="font-mono-num text-sm text-slate-300 mt-1">{m.years}</p>
                </div>
              </div>
              <ul className="p-3.5 space-y-1.5 bg-cyan-500/10">
                {m.points.map((p) => (
                  <li key={p} className="text-sm sm:text-[15px] text-slate-100 font-medium flex gap-2">
                    <span className="text-cyan-400">▹</span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
