export type TimeMode = 'past' | 'present' | 'future'
export type CompareMode = 'spacex' | 'us'
export type Side = 'spacex' | 'china' | 'both' | 'US' | 'CN' | 'BOTH'

export interface Source {
  id: string
  label: string
  url: string
}

export interface YearlyLaunch {
  year: number
  us: number
  china: number
  spacex: number
  partial?: boolean
  note?: string
}

export interface KpiItem {
  id: string
  label: string
  value: number
  unit: string
  side: Side
  note?: string
  planned?: boolean
  sourceIds?: string[]
}

export interface CompareBlock {
  id: string
  name: string
  subtitle: string
  accent: 'cyan' | 'amber'
  metrics: Record<TimeMode, { key: string; value: string }[]>
}

export interface ReuseSide {
  title: string
  bullets: string[]
  stats: { label: string; value: string }[]
}

export interface Constellation {
  id: string
  name: string
  country: 'US' | 'CN'
  operator: string
  deployedApprox: number
  activeApprox: number
  plannedApprox: number
  status: string
  note: string
}

export interface Milestone {
  date: string
  side: 'US' | 'CN' | 'BOTH'
  title: string
  category: string
  description: string
}

export interface SeedData {
  schemaVersion: number
  updatedAt: string
  dataAsOf?: string
  disclaimer: string
  meta: {
    title: string
    titleEn: string
    tagline: string
  }
  sources: Source[]
  yearlyLaunches: YearlyLaunch[]
  kpis: Record<TimeMode, { label: string; items: KpiItem[] }>
  compare: {
    spacex: CompareBlock
    china: CompareBlock
  }
  reuse: {
    spacex: ReuseSide
    china: ReuseSide
  }
  constellations: Constellation[]
  milestones: Milestone[]
  usToggle: {
    label: string
    options: { id: CompareMode; label: string }[]
  }
}
