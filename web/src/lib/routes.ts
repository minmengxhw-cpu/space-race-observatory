export type SectorId = 'hub' | 'ai' | 'aerospace' | 'biopharma' | 'future'

export const SECTORS: {
  id: SectorId
  label: string
  short: string
  accent: string
}[] = [
  { id: 'hub', label: '总览', short: '总览', accent: 'slate' },
  { id: 'ai', label: '人工智能', short: 'AI', accent: 'violet' },
  { id: 'aerospace', label: '航空航天', short: '航天', accent: 'cyan' },
  { id: 'biopharma', label: '生物医药', short: '医药', accent: 'emerald' },
  { id: 'future', label: '十五五产业', short: '十五五', accent: 'amber' },
]

export function parseHash(): SectorId {
  const h = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#\/?/, '')
  const id = (h.split('/')[0] || 'hub') as SectorId
  if (SECTORS.some((s) => s.id === id)) return id
  // legacy anchors from aerospace-only site
  if (['overview', 'rockets', 'roadmap', 'launch', 'timeline', 'reuse', 'constellation'].includes(id)) {
    return 'aerospace'
  }
  return 'hub'
}

export function setSectorHash(id: SectorId) {
  window.location.hash = id === 'hub' ? '#/' : `#/${id}`
}
