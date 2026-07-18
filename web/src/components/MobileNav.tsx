const LINKS = [
  { href: '#overview', label: '总览', icon: '◈' },
  { href: '#rockets', label: '火箭', icon: '▲' },
  { href: '#roadmap', label: '路线', icon: '☰' },
  { href: '#launch', label: '发射', icon: '↑' },
  { href: '#timeline', label: '节点', icon: '◆' },
] as const

export function MobileNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-cyan-400/20 bg-void/95 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="手机底部导航"
    >
      <ul className="grid grid-cols-5 max-w-lg mx-auto">
        {LINKS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-slate-300 active:text-cyan-300 active:bg-cyan-400/10 transition-colors"
            >
              <span className="text-base leading-none text-cyan-400" aria-hidden>
                {item.icon}
              </span>
              <span className="text-xs font-display tracking-wide font-semibold">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
