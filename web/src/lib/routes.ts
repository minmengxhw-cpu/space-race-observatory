import type { DomainId, ViewId } from './dualTypes'

const DOMAINS: DomainId[] = ['ai', 'aerospace', 'biopharma', 'future']

export interface AppRoute {
  view: ViewId
  date?: string
  domainId?: DomainId
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function isDomain(id: string): id is DomainId {
  return (DOMAINS as string[]).includes(id)
}

/**
 * Hash routes:
 *   #/                     home (latest date)
 *   #/d/2026-07-18         home at date
 *   #/domain/ai            domain page
 *   #/archive              archive
 *   #/deep-aerospace       aerospace deep dive
 *
 * Legacy: #/ai #/aerospace … → domain; old aerospace anchors → deep-aerospace
 */
export function parseHash(hash = typeof window !== 'undefined' ? window.location.hash : ''): AppRoute {
  const raw = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  if (!raw) return { view: 'home' }

  const parts = raw.split('/').filter(Boolean)
  const [a, b] = parts

  if (a === 'archive') return { view: 'archive' }
  if (a === 'deep-aerospace') return { view: 'deep-aerospace' }
  if (a === 'd' && b && DATE_RE.test(b)) return { view: 'home', date: b }
  if (a === 'domain' && b && isDomain(b)) return { view: 'domain', domainId: b }
  if (isDomain(a)) return { view: 'domain', domainId: a }
  if (a === 'hub') return { view: 'home' }
  if (['overview', 'rockets', 'roadmap', 'launch', 'timeline', 'reuse', 'constellation'].includes(a)) {
    return { view: 'deep-aerospace' }
  }

  return { view: 'home' }
}

export function buildHash(route: AppRoute, latestDate?: string): string {
  switch (route.view) {
    case 'archive':
      return '#/archive'
    case 'deep-aerospace':
      return '#/deep-aerospace'
    case 'domain':
      return route.domainId ? `#/domain/${route.domainId}` : '#/'
    case 'home':
    default: {
      if (route.date && latestDate && route.date !== latestDate) return `#/d/${route.date}`
      if (route.date && !latestDate) return `#/d/${route.date}`
      return '#/'
    }
  }
}
