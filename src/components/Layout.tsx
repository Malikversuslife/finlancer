import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from './ui'

export const PRODUCT_NAV = [
  { to: '/product', t: 'Product overview', d: 'Your complete financial operating system.' },
  { to: '/invoicing', t: 'Invoicing & Clients', d: 'Create invoices, manage clients and get paid.' },
  { to: '/money', t: 'Money Management', d: 'Understand income, expenses and cash flow.' },
  { to: '/tax', t: 'Tax', d: 'Reserve, organise and prepare.' },
  { to: '/goals', t: 'Goals', d: 'Turn income into progress.' },
  { to: '/pricing', t: 'Pricing', d: 'Choose the experience that fits.' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-[0.14em] ${className}`}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden><rect width="18" height="18" rx="4" fill="currentColor" /><path d="M5 13V5h8M5 9h5" stroke="var(--color-signal)" strokeWidth="2" fill="none" /></svg>
      FINLANCER
    </span>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [mobileProduct, setMobileProduct] = useState(false)
  const loc = useLocation()
  const darkSurface = !['/', '/resources', '/about', '/pricing'].includes(loc.pathname)
  const t = useRef<number>(0)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMega(false); setDrawer(false) }, [loc.pathname])
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && (setMega(false), setDrawer(false))
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const open = () => { clearTimeout(t.current); setMega(true) }
  const close = () => { t.current = window.setTimeout(() => setMega(false), 140) }
  const link = `relative px-3 py-2 text-[14px] transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${darkSurface ? 'text-paper/70 hover:text-paper after:bg-paper' : 'text-ink-2 hover:text-ink after:bg-ink'}`

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${darkSurface ? 'border-b border-white/10 bg-ink text-paper' : scrolled || mega ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="Finlancer home"><Logo className={`text-[14px] ${darkSurface ? 'text-paper' : ''}`} /></Link>
        <nav className="hidden items-center lg:flex" aria-label="Main">
          <div onMouseEnter={open} onMouseLeave={close}>
            <button className={`${link} flex items-center gap-1`} aria-expanded={mega} onClick={() => setMega(m => !m)}>
              Product <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <NavLink to="/resources" className={link}>Resources</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/pricing" className={link}>Pricing</NavLink>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/contact" className={`px-3 text-[14px] ${darkSurface ? 'text-paper/70 hover:text-paper' : 'text-ink-2 hover:text-ink'}`}>Sign in</Link>
          <Button to="/contact" className="!h-9 !px-4">Get started</Button>
        </div>
        <button className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}><Menu size={20} strokeWidth={1.9} /></button>
      </div>

      {mega && (
        <div className="absolute inset-x-0 top-16 hidden lg:block" onMouseEnter={open} onMouseLeave={close}>
          <div className="menu-in mx-auto max-w-[1280px] px-10">
            <div className="grid grid-cols-12 overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_24px_60px_-30px_rgba(22,24,26,.35)]">
              <div className="col-span-7 grid grid-cols-2 gap-px bg-line">
                {PRODUCT_NAV.map(i => (
                  <Link key={i.to} to={i.to} className="group bg-paper p-6 transition-colors hover:bg-paper-2">
                    <p className="flex items-center justify-between text-[14px] font-medium">{i.t}<ArrowRight size={14} strokeWidth={2} className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></p>
                    <p className="mt-1.5 text-[13px] leading-snug text-mute">{i.d}</p>
                  </Link>
                ))}
              </div>
              <Link to="/intelligence" className="group col-span-5 flex flex-col justify-between bg-ink p-8 text-paper">
                <div>
                  <p className="label text-signal">Finlancer Intelligence</p>
                  <p className="mt-5 text-[30px] font-medium leading-[1.08] tracking-[-0.03em]">Financial intelligence that sees the bigger picture.</p>
                </div>
                <div className="mt-8 space-y-2 text-[12px] text-paper/70">
                  {['Your freelance income is above your recent average.', 'Acme Studio typically pays after the due date.'].map(s => (
                    <p key={s} className="flex gap-2 border-t border-white/10 pt-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{s}</p>
                  ))}
                  <p className="flex items-center gap-1.5 pt-3 text-paper">Explore Intelligence <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {drawer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-paper lg:hidden">
          <div className="flex h-16 items-center justify-between px-5">
            <Logo className="text-[14px]" />
            <button className="flex h-11 w-11 items-center justify-center" aria-label="Close menu" onClick={() => setDrawer(false)}><X size={20} strokeWidth={1.9} /></button>
          </div>
          <nav className="menu-in px-5 pb-10 pt-4" aria-label="Mobile">
            <button className="flex w-full items-center justify-between border-b border-line py-4 text-[24px] font-medium tracking-tight" aria-expanded={mobileProduct} onClick={() => setMobileProduct(v => !v)}>
              Product <ChevronDown size={20} strokeWidth={1.9} className={`transition-transform ${mobileProduct ? 'rotate-180' : ''}`} />
            </button>
            {mobileProduct && (
              <div className="menu-in border-b border-line py-2">
                {[...PRODUCT_NAV.slice(0, 5), { to: '/intelligence', t: 'Finlancer Intelligence', d: 'Financial intelligence that sees the bigger picture.' }].map(i => (
                  <Link key={i.to} to={i.to} className="block py-3 pl-1">
                    <p className={`text-[15px] ${i.to === '/intelligence' ? 'font-medium text-signal-deep' : ''}`}>{i.t}</p>
                    <p className="text-[12px] text-mute">{i.d}</p>
                  </Link>
                ))}
              </div>
            )}
            {[['/resources', 'Resources'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/contact', 'Sign in']].map(([to, l]) => (
              <Link key={to + l} to={to} className="block border-b border-line py-4 text-[24px] font-medium tracking-tight">{l}</Link>
            ))}
            <Button to="/contact" className="mt-8 w-full justify-center">Get started</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const groups: [string, [string, string][]][] = [
    ['Product', [['/product', 'Overview'], ['/invoicing', 'Invoicing & Clients'], ['/money', 'Money Management'], ['/tax', 'Tax'], ['/goals', 'Goals'], ['/intelligence', 'Finlancer Intelligence'], ['/pricing', 'Pricing']]],
    ['Resources', [['/resources', 'All resources'], ['/resources#guides', 'Guides'], ['/resources#finance', 'Freelancer Finance'], ['/resources#updates', 'Product Updates'], ['/help', 'Help Centre']]],
    ['Company', [['/about', 'About'], ['/contact', 'Contact']]],
    ['Legal', [['/privacy', 'Privacy'], ['/terms', 'Terms']]],
  ]
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1280px] px-5 pt-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-[15px]" />
            <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-paper/55">The financial operating system for independent work. Built for your phone, because that is where your working day already lives.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {groups.map(([h, ls]) => (
              <div key={h}>
                <p className="label text-paper/45">{h}</p>
                <ul className="mt-5 space-y-3">{ls.map(([to, l]) => <li key={l}><Link to={to} className="text-[14px] text-paper/65 transition-colors hover:text-signal">{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-24 select-none text-[clamp(4rem,17vw,15.5rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-paper" aria-hidden>FINLANCER</p>
        <div className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-[12px] text-paper/45 sm:flex-row">
          <span>© 2026 Finlancer</span>
          <span>Finlancer does not provide tax, legal or financial advice.</span>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
