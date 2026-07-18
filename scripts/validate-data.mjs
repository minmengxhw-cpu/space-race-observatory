#!/usr/bin/env node
/**
 * Validate G2 data files against JSON Schema + business rules.
 * Usage: node scripts/validate-data.mjs
 * Exit 0 on success, 1 on any error.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA = join(ROOT, 'web/public/data')
const SCHEMA = join(DATA, 'schema')

// Resolve deps from web/node_modules (package lives under web/)
const require = createRequire(join(ROOT, 'web/package.json'))

function loadAjv() {
  try {
    const Ajv2020 = require('ajv/dist/2020.js').default
    const addFormats = require('ajv-formats')
    const ajv = new Ajv2020({ allErrors: true, strict: false })
    addFormats(ajv)
    return ajv
  } catch (e) {
    console.error(
      'Missing ajv. Install from repo root:\n  npm install --prefix web -D ajv ajv-formats\nor run via CI after npm ci in web/',
    )
    console.error(String(e))
    process.exit(1)
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

const errors = []
function fail(msg) {
  errors.push(msg)
}

const ajv = loadAjv()
const dailySchema = readJson(join(SCHEMA, 'daily.schema.json'))
const metricsSchema = readJson(join(SCHEMA, 'metrics.schema.json'))
const indexSchema = readJson(join(SCHEMA, 'daily-index.schema.json'))
const validateDaily = ajv.compile(dailySchema)
const validateMetrics = ajv.compile(metricsSchema)
const validateIndex = ajv.compile(indexSchema)

// --- index ---
const indexPath = join(DATA, 'daily/index.json')
if (!existsSync(indexPath)) {
  fail('missing daily/index.json')
} else {
  const index = readJson(indexPath)
  if (!validateIndex(index)) {
    fail(`daily/index.json schema: ${ajv.errorsText(validateIndex.errors)}`)
  } else {
    if (!index.dates.includes(index.latest)) {
      fail(`daily/index.json: latest "${index.latest}" not in dates`)
    }
    for (const d of index.dates) {
      const p = join(DATA, 'daily', `${d}.json`)
      if (!existsSync(p)) fail(`daily/index.json lists ${d} but file missing`)
    }
  }
}

// --- daily files ---
const dailyDir = join(DATA, 'daily')
const DAILY_FILE_RE = /^\d{4}-\d{2}-\d{2}\.json$/
for (const name of readdirSync(dailyDir)) {
  // only per-day files (skip index.json, recent-30d.json, etc.)
  if (!DAILY_FILE_RE.test(name)) continue
  const path = join(dailyDir, name)
  let data
  try {
    data = readJson(path)
  } catch (e) {
    fail(`${name}: invalid JSON (${e.message})`)
    continue
  }
  if (!validateDaily(data)) {
    fail(`${name}: ${ajv.errorsText(validateDaily.errors)}`)
    continue
  }
  const stem = name.replace(/\.json$/, '')
  if (data.date !== stem) {
    fail(`${name}: date field "${data.date}" !== filename date "${stem}"`)
  }
  const ids = new Set(data.items.map((i) => i.id))
  if (ids.size !== data.items.length) {
    fail(`${name}: duplicate item ids`)
  }
  for (const fid of data.focus) {
    if (!ids.has(fid)) fail(`${name}: focus id "${fid}" not in items`)
  }
  for (const it of data.items) {
    if (!/^https?:\/\//i.test(it.source)) {
      fail(`${name}: item ${it.id} source must start with http(s)://`)
    }
    // Flag obvious homepage-only sources (common padding)
    try {
      const u = new URL(it.source)
      const pathOnly = u.pathname.replace(/\/+$/, '') || '/'
      if (pathOnly === '/' && !u.search && !u.hash) {
        // soft warning — still fail for known agency homepages used as padding
        const host = u.hostname.replace(/^www\./, '')
        const bareHomes = new Set([
          'nmpa.gov.cn',
          'fda.gov',
          'gov.cn',
          'whitehouse.gov',
          'openai.com',
        ])
        if (bareHomes.has(host)) {
          fail(
            `${name}: item ${it.id} source is bare homepage (${it.source}) — use a specific article/notice URL or drop the item`,
          )
        }
      }
    } catch {
      fail(`${name}: item ${it.id} source is not a valid URL`)
    }
  }
}

// --- metrics ---
const metricsDir = join(DATA, 'metrics')
if (existsSync(metricsDir)) {
  for (const name of readdirSync(metricsDir)) {
    if (!name.endsWith('.json')) continue
    const path = join(metricsDir, name)
    let data
    try {
      data = readJson(path)
    } catch (e) {
      fail(`metrics/${name}: invalid JSON (${e.message})`)
      continue
    }
    if (!validateMetrics(data)) {
      fail(`metrics/${name}: ${ajv.errorsText(validateMetrics.errors)}`)
    }
  }
}

if (errors.length) {
  console.error(`\n❌ data validation failed (${errors.length} issue(s)):\n`)
  for (const e of errors) console.error('  ·', e)
  console.error('')
  process.exit(1)
}

console.log('✓ all data files valid')
