import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, set] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Older mobile WebViews can lack IntersectionObserver. Rendering the
    // content immediately is safer than letting an animation enhancement
    // crash the whole React tree.
    if (typeof IntersectionObserver === 'undefined') {
      set(true)
      return
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

/** 0..1 progress of an element travelling through a tall sticky track */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const total = r.height - window.innerHeight
        setP(Math.min(1, Math.max(0, total > 0 ? -r.top / total : 0)))
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return [ref, p] as const
}

/** Subtle translateY based on element position in viewport */
export function Parallax({ speed = 0.08, children, className = '' }: { speed?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reducedMotion()) return
    const s = window.innerWidth < 768 ? speed * 0.4 : speed
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = r.top + r.height / 2 - window.innerHeight / 2
        el.style.transform = `translate3d(0, ${(-d * s).toFixed(1)}px, 0)`
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [speed])
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}

/** Pointer-responsive depth on desktop only. Children read --px / --py (-1..1). */
export function Depth({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return
    const on = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
      el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
    }
    const off = () => { el.style.setProperty('--px', '0'); el.style.setProperty('--py', '0') }
    el.addEventListener('pointermove', on)
    el.addEventListener('pointerleave', off)
    return () => { el.removeEventListener('pointermove', on); el.removeEventListener('pointerleave', off) }
  }, [])
  return <div ref={ref} className={className} style={{ '--px': 0, '--py': 0 } as CSSProperties}>{children}</div>
}
export const depth = (n: number): CSSProperties => ({
  transform: `translate3d(calc(var(--px) * ${n}px), calc(var(--py) * ${n}px), 0)`,
  transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
})

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15)
  return <Tag ref={ref as never} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1200 }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4)
  const [v, setV] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    if (!inView) return
    if (reducedMotion()) { setV(to); return }
    const start = performance.now(), a = from.current
    let raf = 0
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / duration), e = 1 - Math.pow(1 - k, 3)
      setV(a + (to - a) * e)
      if (k < 1) raf = requestAnimationFrame(tick)
      else from.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref} className="tnum">{prefix}{v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}

export const money = (n: number, d = 0) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

type BtnProps = { to: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'dark'; className?: string; arrow?: boolean }
export function Button({ to, children, variant = 'primary', className = '', arrow = true }: BtnProps) {
  const base = 'group inline-flex items-center gap-2 text-[14px] font-medium transition-[transform,filter,background-color,border-color,color] duration-200 hover:-translate-y-px'
  const styles = {
    primary: 'grad-signal text-white px-6 h-11 rounded-full shadow-[0_10px_24px_-10px_rgba(31,143,63,.7),inset_0_1px_0_rgba(255,255,255,.35)] hover:brightness-105',
    secondary: 'bg-white/60 backdrop-blur-xl border border-white shadow-[0_6px_20px_-12px_rgba(29,29,31,.35)] text-ink hover:border-ink/40 px-5 h-11 rounded-full',
    dark: 'bg-gradient-to-b from-[#3a3a3c] to-ink text-white px-5 h-11 rounded-full',
    ghost: 'text-ink hover:text-signal-deep',
  }[variant]
  return (
    <Link to={to} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`label text-mute ${className}`}>{children}</p>
}

/** Realistic editorial photography. `id` is an Unsplash photo id. */
export function Photo({ id, alt, className = '', w = 1400 }: { id: string; alt: string; className?: string; w?: number }) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

/** Large soft 3D gradient forms for hero backdrops */
export function GradientField({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <Parallax speed={0.12} className="absolute right-[-8%] top-[-12%] w-[58vw] max-w-[760px]">
        <div className="aspect-square rounded-full" style={{ background: 'radial-gradient(circle at 30% 28%, #ffffff 0%, #9bf0b8 20%, #34c759 55%, #0f8b7e 100%)', opacity: .9 }} />
      </Parallax>
      <Parallax speed={0.04} className="absolute left-[-10%] bottom-[-18%] w-[38vw] max-w-[520px]">
        <div className="aspect-square rounded-full" style={{ background: 'radial-gradient(circle at 30% 28%, #ffffff 0%, #b9dcff 22%, #007aff 70%, #0040a8 100%)', opacity: .75 }} />
      </Parallax>
      <Parallax speed={0.2} className="absolute left-[44%] top-[16%] w-[9vw] max-w-[120px]">
        <div className="aspect-square rounded-full" style={{ background: 'radial-gradient(circle at 30% 28%, #fff 0%, #ffd28a 25%, #ff9f0a 75%)' }} />
      </Parallax>
      <div className="absolute inset-0 bg-paper/55 backdrop-blur-[60px]" />
    </div>
  )
}

export const PHOTOS = {
  studio: '1768471125958-78556538fadc',
  studio2: '1758437053633-0cf081264919',
  phoneHand: '1789724920077-eac097759d54',
  phoneCafe: '1534430071631-854ff55eec78',
  camera: '1495707902641-75cac588d2e9',
  cameraDesk: '1502982720700-bfff97f2ecac',
  laptop: '1602016736566-7ed6a58894bd',
  homeDesk: '1493934558415-9d19f0b2b4d2',
  mug: '1514228742587-6b1558fcca3d',
  remote: '1488751045188-3c55bbf9a3fa',
  macbook: '1496181133206-80ce9b88a853',
}

/** Shared page hero for product sub-pages */
export function PageHero({ eyebrow, title, body, children }: { eyebrow: string; title: ReactNode; body: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden">
      <GradientField className="-z-10" />
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 pb-16 pt-32 md:px-10 md:pt-40 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={80}><h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{title}</h1></Reveal>
          <Reveal delay={160}><p className="mt-8 max-w-[520px] text-[17px] leading-relaxed text-ink-2">{body}</p></Reveal>
          <Reveal delay={220} className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact">Get started</Button>
            <Button to="/pricing" variant="secondary" arrow={false}>See pricing</Button>
          </Reveal>
        </div>
        <div className="lg:col-span-5">{children}</div>
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, body, className = '' }: { eyebrow?: string; title: ReactNode; body?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
      <Reveal delay={60}><h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{title}</h2></Reveal>
      {body && <Reveal delay={120}><p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-ink-2">{body}</p></Reveal>}
    </div>
  )
}
