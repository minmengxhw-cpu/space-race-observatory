export type DomainId = 'ai' | 'aerospace' | 'biopharma' | 'future'
export type Country = 'CN' | 'US'

export interface SiteConfig {
  name: string
  nameEn: string
  tagline: string
  subtitle: string
  updatedAt: string
  defaultDate: string
  domains: { id: DomainId; label: string; short: string; color: string }[]
  futureTags: { id: string; label: string }[]
  disclaimer: string
}

export interface DailyItem {
  id: string
  country: Country
  domain: DomainId
  title: string
  fact: string
  why: string
  source: string
  stars: number
  tag?: string
}

export interface DailyFile {
  date: string
  focus: string[]
  items: DailyItem[]
  note?: string
}

export interface MetricRow {
  id: string
  label: string
  unit: string
  cn: { value: number; display: string }
  us: { value: number; display: string }
  note?: string
}

export interface MetricsFile {
  domain: DomainId
  updatedAt: string
  metrics: MetricRow[]
}

export interface MilestoneItem {
  date: string
  domain: DomainId | string
  side: string
  title: string
  desc: string
}

export type ViewId = 'home' | 'domain' | 'archive' | 'deep-aerospace'
