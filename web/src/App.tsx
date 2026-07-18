import { useCallback, useEffect, useState } from 'react'
import type { SeedData } from './types'
import { parseHash, setSectorHash, type SectorId } from './lib/routes'
import { AppShell } from './components/shell/AppShell'
import { HubPage } from './pages/HubPage'
import { AiPage } from './pages/AiPage'
import { AerospacePage } from './pages/AerospacePage'
import { BiopharmaPage } from './pages/BiopharmaPage'
import { FuturePage } from './pages/FuturePage'

type HubData = Parameters<typeof HubPage>[0]['data']
type AiData = Parameters<typeof AiPage>[0]['data']
type BioData = Parameters<typeof BiopharmaPage>[0]['data']
type FutureData = Parameters<typeof FuturePage>[0]['data']

export default function App() {
  const [sector, setSector] = useState<SectorId>(() =>
    typeof window !== 'undefined' ? parseHash() : 'hub',
  )
  const [hub, setHub] = useState<HubData | null>(null)
  const [ai, setAi] = useState<AiData | null>(null)
  const [space, setSpace] = useState<SeedData | null>(null)
  const [bio, setBio] = useState<BioData | null>(null)
  const [future, setFuture] = useState<FutureData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onHash = () => setSector(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    Promise.all([
      fetch(`${base}data/g2-hub.json`).then((r) => r.json()),
      fetch(`${base}data/ai.json`).then((r) => r.json()),
      fetch(`${base}data/seed.json`).then((r) => r.json()),
      fetch(`${base}data/biopharma.json`).then((r) => r.json()),
      fetch(`${base}data/future.json`).then((r) => r.json()),
    ])
      .then(([h, a, s, b, f]) => {
        setHub(h)
        setAi(a)
        setSpace(s)
        setBio(b)
        setFuture(f)
      })
      .catch((e: Error) => setError(e.message))
  }, [])

  const go = useCallback((id: SectorId) => {
    setSector(id)
    setSectorHash(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (error) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center starfield px-4">
        <div className="hud-panel p-8 text-center">
          <p className="text-amber-300 font-display text-lg">遥测中断</p>
          <p className="mt-2 text-slate-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!hub || !ai || !space || !bio || !future) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center starfield gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-400/30 border-t-violet-400 animate-spin" />
        <p className="font-display text-violet-300 tracking-[0.3em] text-sm">LOADING G2 TREE…</p>
      </div>
    )
  }

  const updatedAt =
    sector === 'ai'
      ? ai.updatedAt
      : sector === 'aerospace'
        ? space.updatedAt
        : sector === 'biopharma'
          ? bio.updatedAt
          : sector === 'future'
            ? future.updatedAt
            : hub.updatedAt

  return (
    <div className="relative">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <AppShell sector={sector} onSector={go} updatedAt={updatedAt}>
        {sector === 'hub' && <HubPage data={hub} onOpen={go} />}
        {sector === 'ai' && <AiPage data={ai} />}
        {sector === 'aerospace' && <AerospacePage data={space} />}
        {sector === 'biopharma' && <BiopharmaPage data={bio} />}
        {sector === 'future' && <FuturePage data={future} />}
      </AppShell>
    </div>
  )
}
