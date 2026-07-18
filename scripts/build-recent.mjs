#!/usr/bin/env node
/**
 * Aggregate last N days of daily items into recent-30d.json for domain pages.
 * Run at build time or after daily updates.
 *
 * Usage: node scripts/build-recent.mjs [days=30]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA = join(__dirname, '../web/public/data')
const DAYS = Math.max(1, parseInt(process.argv[2] || '30', 10) || 30)

const indexPath = join(DATA, 'daily/index.json')
if (!existsSync(indexPath)) {
  console.error('missing daily/index.json')
  process.exit(1)
}

const index = JSON.parse(readFileSync(indexPath, 'utf8'))
const dates = (index.dates || []).slice(0, DAYS)

/** @type {Record<string, Array<Record<string, unknown>>>} */
const byDomain = {
  ai: [],
  aerospace: [],
  biopharma: [],
  future: [],
}

for (const d of dates) {
  const p = join(DATA, 'daily', `${d}.json`)
  if (!existsSync(p)) continue
  const file = JSON.parse(readFileSync(p, 'utf8'))
  for (const it of file.items || []) {
    const domain = it.domain
    if (!byDomain[domain]) byDomain[domain] = []
    byDomain[domain].push({
      ...it,
      date: file.date,
      title: `${file.date} · ${it.title}`,
    })
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  days: DAYS,
  dates,
  byDomain,
}

const outPath = join(DATA, 'daily/recent-30d.json')
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n')
const counts = Object.fromEntries(Object.entries(byDomain).map(([k, v]) => [k, v.length]))
console.log('wrote', outPath, counts)
