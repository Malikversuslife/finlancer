import { useEffect, useRef, type ReactNode, type CSSProperties, type ComponentType } from 'react'
import {
  Bell, Check, ChevronLeft, ChevronRight, FileText, Plus, Send, Lightbulb, TrendingUp, Home, Users, Wallet, BarChart3, User, Target, Receipt,
  Link2, Clock, AlertCircle, Signal, Wifi, BatteryFull, Briefcase, Laptop, Plane, GraduationCap, ShieldCheck, Camera,
  Building2, PiggyBank, Percent, CalendarDays, Hand, Repeat, ArrowDownLeft, ArrowUpRight, Search, Landmark, Coffee,
} from 'lucide-react'
import { money, reducedMotion } from './ui'

type Icon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

/* ======================================================================
   3D device
   ====================================================================== */
export function Phone({ children, className = '', tone = 'light', pose = -16 }: { children: ReactNode; className?: string; tone?: 'light' | 'dark'; pose?: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const shine = useRef<HTMLDivElement>(null)
  const shadow = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const w = wrap.current, b = body.current
    if (!w || !b) return
    const still = reducedMotion()
    const fine = window.matchMedia('(hover: hover)').matches
    const k = window.innerWidth < 768 ? 0.55 : 1
    let hx = 0, hy = 0, hz = 0, raf = 0
    const paint = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = w.getBoundingClientRect()
        const d = still ? 0 : Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight))
        const ry = (pose - d * 22 + hx * 26) * k
        const rx = (6 + d * 12 - hy * 16) * k
        const rz = (-d * 2.5) * k
        b.style.transform = `translateZ(${hz}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`
        b.style.setProperty('--edge', `${50 + ry * 1.6}%`)
        if (shine.current) shine.current.style.transform = `translateX(${(-ry * 3).toFixed(1)}%)`
        if (shadow.current) shadow.current.style.transform = `translate(${(ry * 1.6).toFixed(1)}px, ${(40 + hz * 0.5).toFixed(1)}px) scale(${(1 - hz / 260).toFixed(3)})`
      })
    }
    const move = (e: PointerEvent) => { const r = w.getBoundingClientRect(); hx = ((e.clientX - r.left) / r.width) * 2 - 1; hy = ((e.clientY - r.top) / r.height) * 2 - 1; hz = 70; paint() }
    const leave = () => { hx = hy = hz = 0; paint() }
    paint()
    if (still) return
    window.addEventListener('scroll', paint, { passive: true })
    if (fine) { w.addEventListener('pointermove', move); w.addEventListener('pointerleave', leave) }
    return () => { window.removeEventListener('scroll', paint); w.removeEventListener('pointermove', move); w.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf) }
  }, [pose])

  const T = 16 // device thickness in px
  const R = 'rounded-[48px]'
  return (
    <div ref={wrap} className={`relative aspect-[9/19.2] w-[280px] [perspective:1100px] ${className}`}>
      {/* contact shadow, moves with the device */}
      <div ref={shadow} aria-hidden className="pointer-events-none absolute inset-x-[6%] bottom-0 h-14 rounded-[50%] bg-[radial-gradient(closest-side,rgba(29,29,31,.38),transparent)] transition-transform duration-[600ms]" />
      <div ref={body} className="relative h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d]" style={{ '--edge': '50%' } as CSSProperties}>
        {/* back glass */}
        <div className={`absolute inset-0 ${R} bg-[linear-gradient(145deg,#eef0f3,#c9ced6_45%,#9aa1ab)] [backface-visibility:hidden]`} style={{ transform: `translateZ(-${T}px) rotateY(180deg)` }}>
          <div className="absolute right-5 top-5 h-[92px] w-[92px] rounded-[26px] bg-[linear-gradient(145deg,#f6f7f9,#bfc5cd)] p-2.5 shadow-[inset_0_1px_2px_rgba(255,255,255,.9),0_6px_14px_rgba(0,0,0,.25)]">
            {[[6, 6], [46, 6], [6, 46]].map(([x, y], i) => <span key={i} className="absolute h-[34px] w-[34px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#4a5160,#0b0c10_60%)] ring-[3px] ring-[#aab1bb]" style={{ left: x + 3, top: y + 3 }} />)}
            <span className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full bg-[#f3e9c6]" />
          </div>
          <div className="absolute inset-x-0 bottom-[42%] text-center text-[22px] font-semibold text-white/60"></div>
        </div>
        {/* frame thickness: stacked slices for a true rounded edge */}
        {Array.from({ length: T }).map((_, i) => (
          <div key={i} aria-hidden className={`absolute inset-0 ${R}`} style={{ transform: `translateZ(-${i + 0.5}px)`, background: `linear-gradient(90deg,#5a5f68 0%,#d9dce1 var(--edge),#4d5159 100%)` }} />
        ))}
        {/* side buttons sit on the edge */}
        <div aria-hidden className="absolute -left-[3px] top-[19%] h-[6%] w-[4px] rounded-l-[3px] bg-[linear-gradient(90deg,#7b808a,#c7cbd1)]" style={{ transform: `translateZ(-${T / 2}px)` }} />
        <div aria-hidden className="absolute -left-[3px] top-[28%] h-[9%] w-[4px] rounded-l-[3px] bg-[linear-gradient(90deg,#7b808a,#c7cbd1)]" style={{ transform: `translateZ(-${T / 2}px)` }} />
        <div aria-hidden className="absolute -right-[3px] top-[25%] h-[12%] w-[4px] rounded-r-[3px] bg-[linear-gradient(270deg,#7b808a,#c7cbd1)]" style={{ transform: `translateZ(-${T / 2}px)` }} />
        {/* front */}
        <div className={`absolute inset-0 ${R} bg-[linear-gradient(160deg,#9aa0a9,#3d4148_30%,#1d1f23)] p-[3px] shadow-[0_60px_90px_-40px_rgba(29,29,31,.55)]`}>
          <div className="h-full w-full rounded-[45px] bg-black p-[8px]">
            <div className={`relative h-full w-full overflow-hidden rounded-[37px] ${tone === 'light' ? 'bg-[linear-gradient(180deg,#eef0f9_0%,#f8f8fb_45%,#edf2fb_100%)]' : 'bg-black'} text-[#000]`}>
              <div className="absolute left-1/2 top-2.5 z-30 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
              <div className="relative z-20 flex h-10 items-end justify-between px-7 pb-1 text-[11px] font-semibold tnum"><span>9:41</span><span className="flex items-center gap-1"><Signal size={11} strokeWidth={2.6} /><Wifi size={11} strokeWidth={2.6} /><BatteryFull size={15} strokeWidth={2} /></span></div>
              <div className="h-[calc(100%-40px)] overflow-hidden">{children}</div>
              <div className="absolute bottom-1.5 left-1/2 z-30 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-black/85" />
              {/* glass reflection, shifts with rotation */}
              <div ref={shine} aria-hidden className="pointer-events-none absolute -inset-x-1/2 inset-y-0 z-40 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.22)_45%,rgba(255,255,255,0)_58%)] transition-transform duration-[650ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ======================================================================
   iOS primitives
   ====================================================================== */
const CARD = 'bg-[radial-gradient(120%_140%_at_85%_100%,#3a3b44_0%,#1b1b20_45%,#0d0d10_100%)] text-white shadow-[0_18px_30px_-16px_rgba(13,13,16,.8),inset_0_1px_0_rgba(255,255,255,.12)]'
const TINT = {
  green: 'bg-[#16171b]', blue: 'bg-[#16171b]', orange: 'bg-[#16171b]', red: 'bg-[#16171b]',
  purple: 'bg-[#16171b]', teal: 'bg-[#16171b]', indigo: 'bg-[#16171b]', gray: 'bg-[#8e8e93]',
}
export type Tint = keyof typeof TINT

/** Icon chip. Outline glyph on a soft white disc; `solid` gives the black disc used on actions. */
export function Tile({ icon: I, size = 44, solid = false }: { icon: Icon; tint?: Tint; size?: number; solid?: boolean }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full ${solid ? 'bg-[#16171b] text-white' : 'bg-white text-[#1d1d22] shadow-[0_4px_12px_-6px_rgba(20,22,40,.25)]'}`} style={{ width: size, height: size }}>
      <I size={size * 0.48} strokeWidth={1.8} />
    </span>
  )
}

const Bell2 = () => (
  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_-6px_rgba(20,22,40,.25)]"><Bell size={17} strokeWidth={1.8} /><span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#ff3b30]" /></span>
)

function Nav({ title, back, action }: { title: string; back?: string; action?: ReactNode; large?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 pb-1 pt-2">
      <div className="flex items-center gap-2">
        {back && <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_-6px_rgba(20,22,40,.25)]"><ChevronLeft size={18} strokeWidth={2} /></span>}
        <div>{back && <p className="text-[9.5px] text-[#8a8b94]">{back}</p>}<h3 className="text-[17px] font-semibold leading-tight tracking-[-0.01em]">{title}</h3></div>
      </div>
      {action ?? <Bell2 />}
    </div>
  )
}

const Head = ({ title, link = 'View All' }: { title: string; link?: string }) => (
  <div className="mx-4 mb-1.5 flex items-baseline justify-between"><p className="text-[13px] font-semibold">{title}</p><span className="text-[10px] text-[#8a8b94]">{link}</span></div>
)

const Group = ({ children, title, className = '' }: { children: ReactNode; title?: string; className?: string }) => (
  <div className={className}>
    {title && <Head title={title} link="" />}
    <div className="mx-4">{children}</div>
  </div>
)

function Cell({ icon, title, sub, value, valueClass = '', chevron = true }: { icon?: Icon; tint?: Tint; title: string; sub?: string; value?: string; valueClass?: string; chevron?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      {icon && <Tile icon={icon} size={34} />}
      <div className="min-w-0 flex-1"><p className="truncate text-[11.5px] font-semibold">{title}</p>{sub && <p className="truncate text-[9.5px] text-[#8a8b94]">{sub}</p>}</div>
      <span className="flex shrink-0 items-center gap-0.5">
        {value && <span className={`text-[11.5px] font-semibold tnum ${valueClass}`}>{value}</span>}
        {chevron && <ChevronRight size={13} strokeWidth={2} className="text-[#b8b9c0]" />}
      </span>
    </div>
  )
}
// Kept for page-level tables
export function Row({ l, s, r, pos, tone }: { l: string; s: string; r: string; pos?: boolean; tone?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line/70 py-2">
      <div><p className="text-[13px] font-medium">{l}</p><p className="text-[11px] text-mute">{s}</p></div>
      <p className={`text-[13px] tnum ${tone ?? (pos ? 'text-signal-deep' : 'text-ink')}`}>{r}</p>
    </div>
  )
}

const Btn = ({ children, icon: I }: { children: ReactNode; icon?: Icon }) => (
  <div className="mx-4 flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#16171b] text-[12.5px] font-semibold text-white shadow-[0_10px_20px_-10px_rgba(13,13,16,.7)]">{I && <I size={15} strokeWidth={2} />}{children}</div>
)

/** White action tile with black icon disc, as in the reference */
const Action = ({ icon: I, label, on = false }: { icon: Icon; label: string; on?: boolean }) => (
  <span className={`flex flex-col items-center gap-1.5 rounded-[14px] py-2.5 ${on ? 'bg-[#16171b] text-white' : 'bg-white shadow-[0_6px_16px_-10px_rgba(20,22,40,.25)]'}`}>
    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${on ? 'bg-white text-[#16171b]' : 'bg-[#16171b] text-white'}`}><I size={15} strokeWidth={2} /></span>
    <span className="text-[10px] font-medium">{label}</span>
  </span>
)

export function TabBar({ active = 0 }: { active?: number }) {
  const items: Icon[] = [Home, BarChart3, Wallet, User]
  const a = Math.min(active, 3)
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#eef1f8] via-[#eef1f8]/80 to-transparent px-6 pb-5 pt-6">
      <div className="flex items-center justify-between rounded-full bg-white px-1.5 py-1.5 shadow-[0_10px_24px_-12px_rgba(20,22,40,.3)]">
        {items.map((I, i) => (
          <span key={i} className={`flex h-10 w-10 items-center justify-center rounded-full ${i === a ? 'bg-[#16171b] text-white' : 'text-[#3a3b44]'}`}><I size={19} strokeWidth={1.8} /></span>
        ))}
      </div>
    </div>
  )
}

export const Insight = ({ children }: { children: ReactNode; tone?: 'signal' | 'amber' | 'coral' | 'sky' }) => (
  <div className="flex items-center gap-2.5 rounded-[14px] bg-white p-2.5 shadow-[0_6px_16px_-10px_rgba(20,22,40,.25)] text-[#000] shadow-[0_6px_16px_-10px_rgba(20,22,40,.25)]">
    <Tile icon={Lightbulb} solid size={30} />
    <p className="text-[10px] leading-snug">{children}</p>
  </div>
)

const Panel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-4 rounded-[18px] bg-white p-3.5 shadow-[0_6px_16px_-10px_rgba(20,22,40,.25)] ${className}`}>{children}</div>
)

/* ======================================================================
   Screens
   ====================================================================== */
export function OverviewScreen({ available = 6840 }: { available?: number }) {
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,#3a3b44,#0d0d10)] text-[12px] font-semibold text-white">MR</span>
          <div><p className="text-[10px] text-[#8a8b94]">Good Morning</p><p className="text-[14px] font-semibold leading-tight">Maya Reyes</p></div>
        </div>
        <Bell2 />
      </div>
      <p className="mx-4 mt-4 text-[13px] font-semibold">My Money</p>
      <div className={`mx-4 mt-2 rounded-[18px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between"><span className="text-[12px] font-semibold text-white/85">Finlancer</span><span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/60">Available</span></div>
        <p className="mt-3 text-[9.5px] text-white/55">Available to spend</p>
        <p className="bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-[28px] font-semibold tracking-[-0.02em] text-transparent tnum">{money(available)}.00</p>
        <div className="mt-2 flex justify-between text-[9.5px] text-white/60"><span>Tax reserved $7,410</span><span className="text-right">This month<br /><b className="text-white/90">+$9,420</b></span></div>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        <Action icon={ArrowUpRight} label="Invoice" />
        <Action icon={ArrowDownLeft} label="Request" />
        <Action icon={Receipt} label="Expense" />
      </div>
      <div className="mt-4"><Head title="Transactions" /></div>
      <div className="mx-4">
        <Cell icon={Briefcase} title="Acme Studio" sub="Invoice · Oct 16" value="+$2,400" chevron={false} />
        <Cell icon={Laptop} title="Figma" sub="Software · Oct 12" value="$45.00" chevron={false} />
        <Cell icon={Coffee} title="Studio coffee" sub="Workspace · Oct 9" value="$6.20" chevron={false} />
      </div>
      <TabBar />
    </div>
  )
}

export function InvoiceFlowScreen({ step }: { step: number }) {
  const clients: [string, string, Tint][] = [['Acme Studio', 'Usually pays in 34 days', 'blue'], ['Northwind Press', 'Usually pays in 12 days', 'teal'], ['Hollis & Co.', 'Usually pays in 21 days', 'orange'], ['Lumen Records', 'New client', 'purple']]
  return (
    <div className="relative h-full">
      {step === 0 && (
        <div className="menu-in">
          <Nav title="Bill to" back="Invoices" action={<Plus size={20} strokeWidth={2.4} />} />
          <div className="mx-4 mt-2 flex h-8 items-center gap-1.5 rounded-[10px] bg-[#e3e3e8] px-2.5 text-[11px] text-[#8e8e93]"><Search size={13} strokeWidth={2.4} />Search clients</div>
          <Group className="mt-3">
            {clients.map(([c, s, t], i) => (
              <div key={c} className="flex items-center gap-2.5 pl-3">
                <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-full text-[12px] font-semibold text-white ${TINT[t]}`}>{c.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                <div className="flex flex-1 items-center justify-between border-b border-[#e5e5ea] py-2.5 pr-3">
                  <div><p className="text-[12px] font-medium">{c}</p><p className="text-[10px] text-[#8e8e93]">{s}</p></div>
                  {i === 0 && <Check size={18} strokeWidth={2.8} className="text-[#16171b]" />}
                </div>
              </div>
            ))}
          </Group>
        </div>
      )}
      {step === 1 && (
        <div className="menu-in">
          <Nav title="New Invoice" back="Bill to" action={<span className="text-[13px] font-semibold">Send</span>} />
          <Group className="mt-2" title="Acme Studio · #0143">
            <Cell title="Brand system, phase 2" sub="1 × $3,200" value="$3,200" chevron={false} />
            <Cell title="Motion guidelines" sub="8 h × $95" value="$760" chevron={false} />
            <Cell title="Asset export" sub="Fixed" value="$240" chevron={false} />
          </Group>
          <Group className="mt-3">
            <Cell icon={CalendarDays} tint="red" title="Due" value="15 Oct" />
            <Cell icon={Link2} tint="green" title="Payment link" value="On" />
          </Group>
          <div className="mx-4 mt-3 flex items-baseline justify-between px-1"><span className="text-[12px] text-[#8e8e93]">Total</span><span className="text-[26px] font-bold tracking-tight tnum">$4,200</span></div>
          <div className="mt-2"><Btn icon={Send}>Send Invoice</Btn></div>
        </div>
      )}
      {step === 2 && (
        <div className="menu-in flex h-full flex-col items-center px-5 pt-14 text-center">
          <Tile icon={Send} tint="blue" size={96} />
          <p className="mt-5 text-[20px] font-bold tracking-tight">Invoice Sent</p>
          <p className="mt-1 text-[11px] text-[#8e8e93]">#0143 to Acme Studio · $4,200</p>
          <div className="mt-6 w-full text-left"><Insight tone="amber">Acme Studio typically pays after the due date. A reminder is set for 13 Oct.</Insight></div>
          <div className="mt-4 w-full"><Status i={1} /></div>
        </div>
      )}
      {step >= 3 && (
        <div className="menu-in">
          <Nav title="#0143" back="Invoices" action={<span />} />
          <div className="flex flex-col items-center pt-3 text-center">
            <Tile icon={Check} tint="green" size={step === 4 ? 64 : 96} />
            <p className="mt-3 text-[34px] font-semibold tracking-[-0.02em] tnum">$4,200</p>
            <p className="text-[11px] text-[#8e8e93]">Paid by Acme Studio · 16 Oct</p>
          </div>
          <div className="mx-4 mt-4"><Status i={3} /></div>
          {step === 4 && (
            <Group className="menu-in mt-4" title="Updated">
              <Cell icon={TrendingUp} tint="green" title="Income this month" value="$13,620" valueClass="text-[#28a745]" chevron={false} />
              <Cell icon={Landmark} tint="orange" title="Tax reserve" value="$7,410" chevron={false} />
              <Cell icon={Wallet} tint="teal" title="Available" value="$6,840" chevron={false} />
            </Group>
          )}
        </div>
      )}
      <TabBar active={2} />
    </div>
  )
}

function Status({ i }: { i: number }) {
  const s = ['Draft', 'Sent', 'Viewed', 'Paid']
  return (
    <div className="flex rounded-[10px] bg-[#e3e3e8] p-0.5">
      {s.map((x, k) => <span key={x} className={`flex-1 rounded-[8px] py-1 text-center text-[10px] font-semibold ${k === i ? 'bg-white shadow-sm' : k < i ? 'text-[#28a745]' : 'text-[#8e8e93]'}`}>{x}</span>)}
    </div>
  )
}

export function ClientsScreen() {
  return (
    <div className="relative h-full">
      <Nav title="Clients" action={<Plus size={20} strokeWidth={2.4} />} />
      <Panel className="mt-2">
        <p className="text-[11px] text-[#8e8e93]">Outstanding</p>
        <p className="text-[30px] font-semibold tracking-[-0.02em] tnum">$11,350</p>
        <div className="mt-2 flex h-2 gap-0.5 overflow-hidden rounded-full"><span className="bg-[#ff3b30]" style={{ width: '22%' }} /><span className="bg-[#ff9500]" style={{ width: '38%' }} /><span className="flex-1 bg-[#e5e5ea]" /></div>
        <div className="mt-3 grid grid-cols-3 gap-1 text-center">
          {([[AlertCircle, 'red', '2', 'Overdue'], [Clock, 'orange', '3', 'Due soon'], [Check, 'green', '4', 'Paid']] as [Icon, Tint, string, string][]).map(([I, t, n, l]) => (
            <span key={l} className="flex flex-col items-center"><Tile icon={I} tint={t} size={40} /><span className="mt-1 text-[14px] font-bold tnum">{n}</span><span className="text-[9px] text-[#8e8e93]">{l}</span></span>
          ))}
        </div>
      </Panel>
      <Group className="mt-3">
        <Cell icon={Building2} tint="red" title="Hollis & Co." sub="Overdue 6 days" value="$2,480" valueClass="text-[#ff3b30]" />
        <Cell icon={Briefcase} tint="blue" title="Acme Studio" sub="Avg. 34 days" value="$4,200" />
        <Cell icon={FileText} tint="orange" title="Northwind Press" sub="Due in 3 days" value="$1,870" />
      </Group>
      <TabBar active={4} />
    </div>
  )
}

export function ExpensesScreen() {
  const cats: [string, number, Icon, Tint, string][] = [['Equipment', 1120, Camera, 'blue', '#0a84ff'], ['Workspace', 780, Building2, 'orange', '#ff9500'], ['Software', 640, Laptop, 'purple', '#af52de'], ['Travel', 410, Plane, 'red', '#ff3b30'], ['Coffee', 235, Coffee, 'gray', '#8e8e93']]
  const total = cats.reduce((a, c) => a + c[1], 0)
  return (
    <div className="relative h-full">
      <Nav title="Expenses" />
      <div className="mx-4 mt-1 flex rounded-[9px] bg-[#e3e3e8] p-0.5 text-center text-[10px] font-semibold">{['Week', 'Month', 'Year'].map((x, i) => <span key={x} className={`flex-1 rounded-[7px] py-1 ${i === 1 ? 'bg-white shadow-sm' : 'text-[#3c3c43]'}`}>{x}</span>)}</div>
      <div className="mx-4 mt-3">
        <p className="text-[30px] font-semibold tracking-[-0.02em] tnum">{money(total)}</p>
        <div className="mt-2 flex h-2.5 gap-0.5 overflow-hidden rounded-full">{cats.map(c => <span key={c[0]} style={{ width: `${(c[1] / total) * 100}%`, background: c[4] }} />)}</div>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
        {cats.slice(0, 4).map(([l, v, I, t]) => <span key={l} className="flex flex-col items-center"><Tile icon={I} tint={t} size={50} /><span className="mt-1 text-[9.5px] font-medium">{l}</span><span className="text-[9px] text-[#8e8e93] tnum">{money(v)}</span></span>)}
      </div>
      <div className="mx-4 mt-3"><Insight tone="coral">Software expenses increased this month.</Insight></div>
      <Group className="mt-3">
        <Cell icon={Laptop} tint="purple" title="Adobe Creative Cloud" sub="Possibly deductible" value="-$85" chevron={false} />
      </Group>
      <TabBar active={1} />
    </div>
  )
}

export function TaxScreen({ ready = 78, reserved = 7410, estimate = 9500 }: { ready?: number; reserved?: number; estimate?: number }) {
  const r = 46, c = 2 * Math.PI * r
  return (
    <div className="relative h-full">
      <Nav title="Tax" />
      <div className="mx-4 mt-2 flex items-center gap-3 rounded-[16px] bg-white p-3">
        <div className="relative h-[112px] w-[112px] shrink-0">
          <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
            <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a5b66" /><stop offset="1" stopColor="#0d0d10" /></linearGradient></defs>
            <circle cx="55" cy="55" r={r} fill="none" stroke="#e5e5ea" strokeWidth="11" />
            <circle cx="55" cy="55" r={r} fill="none" stroke="url(#tg)" strokeWidth="11" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - ready / 100)} style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.2,.7,.2,1)' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-[26px] font-bold tracking-tight tnum">{Math.round(ready)}%</span><span className="text-[9px] font-medium text-[#8e8e93]">Tax ready</span></div>
        </div>
        <div className="space-y-1.5 text-[10px]">
          <p className="text-[#8e8e93]">Estimated<br /><b className="text-[14px] text-black tnum">{money(estimate)}</b></p>
          <p className="text-[#8e8e93]">Reserved<br /><b className="text-[14px] text-[#28a745] tnum">{money(reserved)}</b></p>
        </div>
      </div>
      <Group className="mt-3">
        <Cell icon={PiggyBank} tint="orange" title="Remaining reserve" value={money(Math.max(0, estimate - reserved))} />
        <Cell icon={Percent} tint="green" title="Deductions" sub="34 expenses" value="$3,180" />
        <Cell icon={FileText} tint="blue" title="Documents" value="12" />
        <Cell icon={Bell} tint="red" title="Reminders" value="2" />
      </Group>
      <div className="mx-4 mt-3"><Insight tone="amber">Your current reserve may need adjusting.</Insight></div>
      <TabBar active={1} />
    </div>
  )
}

export const GOALS: { name: string; target: number; saved: number; date: string; color: string; icon: Icon; tint: Tint }[] = [
  { name: 'Emergency Fund', target: 12000, saved: 8160, date: 'Mar 2027', color: 'bg-signal', icon: ShieldCheck, tint: 'green' },
  { name: 'New MacBook', target: 2800, saved: 1960, date: 'Dec 2026', color: 'bg-sky', icon: Laptop, tint: 'blue' },
  { name: 'Studio Upgrade', target: 5000, saved: 1450, date: 'Jun 2027', color: 'bg-amber', icon: Building2, tint: 'orange' },
  { name: 'Travel', target: 3500, saved: 2240, date: 'Aug 2027', color: 'bg-violet', icon: Plane, tint: 'purple' },
  { name: 'Education', target: 1800, saved: 540, date: 'Sep 2027', color: 'bg-coral', icon: GraduationCap, tint: 'red' },
]
export function GoalsScreen({ boost = 0 }: { boost?: number }) {
  const g = GOALS[0], saved = g.saved + boost, pct = Math.min(100, (saved / g.target) * 100)
  return (
    <div className="relative h-full">
      <Nav title="Goals" action={<Plus size={20} strokeWidth={2.4} />} />
      <Panel className="mt-2">
        <div className="flex items-center gap-3">
          <Tile icon={g.icon} tint="green" size={56} />
          <div className="flex-1"><p className="text-[13px] font-semibold">{g.name}</p><p className="text-[10px] text-[#8e8e93]">Projected {boost > 0 ? 'Jan 2027' : 'Mar 2027'}</p></div>
          <span className="text-[20px] font-bold tnum">{Math.round(pct)}%</span>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-[#e5e5ea]"><div className="h-full rounded-full bg-[#16171b] transition-[width] duration-500" style={{ width: `${pct}%` }} /></div>
        <p className="mt-1.5 text-[10px] text-[#8e8e93] tnum">{money(saved)} of {money(g.target)}</p>
      </Panel>
      {boost > 0 && <div className="menu-in mx-4 mt-2 flex items-center gap-2 rounded-[12px] bg-white p-2 text-[10px]"><Tile icon={Repeat} tint="green" size={26} /><span className="flex-1">10% of Acme Studio payment</span><b className="text-[#28a745] tnum">+{money(boost)}</b></div>}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
        {GOALS.slice(1).map(x => {
          const p = Math.round((x.saved / x.target) * 100)
          return (
            <div key={x.name} className="rounded-[14px] bg-white p-2.5 shadow-[0_6px_16px_-10px_rgba(20,22,40,.25)]">
              <Tile icon={x.icon} tint={x.tint} size={42} />
              <p className="mt-2 truncate text-[11px] font-semibold">{x.name}</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-[#e5e5ea]"><div className={`h-full rounded-full ${TINT[x.tint]}`} style={{ width: `${p}%` }} /></div>
              <p className="mt-1 text-[9px] text-[#8e8e93] tnum">{p}% · {x.date}</p>
            </div>
          )
        })}
      </div>
      <TabBar active={3} />
    </div>
  )
}

export function GoalCreateScreen({ step }: { step: number }) {
  const opts: [string, Icon, Tint][] = [['Emergency Fund', ShieldCheck, 'green'], ['Studio Upgrade', Building2, 'orange'], ['Travel', Plane, 'purple'], ['Education', GraduationCap, 'red'], ['New MacBook', Laptop, 'blue'], ['Custom', Plus, 'gray']]
  return (
    <div className="relative h-full">
      <Nav title={['New Goal', 'Target', 'Contributions', 'Review'][step]} back={step ? 'Back' : 'Goals'} action={<span className="text-[12px] text-[#8e8e93]">{step + 1} of 4</span>} />
      <div className="menu-in" key={step}>
        {step === 0 && (
          <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
            {opts.map(([n, I, t], i) => (
              <span key={n} className={`flex flex-col items-center rounded-[14px] bg-white px-1 py-3 ${i === 1 ? '!bg-[#16171b] text-white' : ''}`}><Tile icon={I} tint={t} size={52} /><span className="mt-1.5 text-center text-[9.5px] font-medium leading-tight">{n}</span></span>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="mt-3">
            <div className="flex flex-col items-center"><Tile icon={Building2} tint="orange" size={80} /><p className="mt-3 text-[40px] font-semibold tracking-[-0.02em] tnum">$5,000</p><p className="text-[11px] text-[#8e8e93]">Studio Upgrade</p></div>
            <Group className="mt-4" title="Target date">
              {['March 2027', 'June 2027', 'September 2027'].map((d, i) => <Cell key={d} title={d} value={i === 1 ? '✓' : ''} valueClass="text-[#16171b] font-bold" chevron={false} />)}
            </Group>
          </div>
        )}
        {step === 2 && (
          <Group className="mt-3" title="How should it fill?">
            <Cell icon={Percent} tint="green" title="Percentage of income" sub="8% of each payment" value="✓" valueClass="text-[#16171b] font-bold" chevron={false} />
            <Cell icon={Repeat} tint="blue" title="Automatic" sub="$250 every month" chevron={false} />
            <Cell icon={Hand} tint="orange" title="Manual" sub="Add when you choose" chevron={false} />
          </Group>
        )}
        {step === 3 && (
          <div className="mt-3">
            <div className="flex flex-col items-center"><Tile icon={Check} tint="green" size={88} /><p className="mt-3 text-[17px] font-bold">Studio Upgrade</p></div>
            <Group className="mt-4">
              <Cell title="Target" value="$5,000" chevron={false} />
              <Cell title="Contribution" value="8% of income" chevron={false} />
              <Cell title="Projected" value="May 2027" valueClass="text-[#28a745]" chevron={false} />
            </Group>
            <div className="mt-4"><Btn>Create Goal</Btn></div>
          </div>
        )}
      </div>
      <TabBar active={3} />
    </div>
  )
}

export function IncomeScreen() {
  const pts = [30, 52, 38, 64, 44, 78, 70]
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / 6) * 240},${90 - p}`).join(' ')
  return (
    <div className="relative h-full">
      <Nav title="Income" />
      <Panel className="mt-2">
        <p className="text-[11px] text-[#8e8e93]">Last 6 months</p>
        <p className="text-[30px] font-semibold tracking-[-0.02em] tnum">$52,840</p>
        <p className="flex items-center gap-1 text-[10px] font-semibold text-[#28a745]"><TrendingUp size={13} strokeWidth={2.6} />Above your recent average</p>
        <svg viewBox="0 0 240 95" className="mt-2 w-full">
          <defs><linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16171b" stopOpacity=".35" /><stop offset="1" stopColor="#16171b" stopOpacity="0" /></linearGradient></defs>
          <path d={`${line} L240,95 L0,95 Z`} fill="url(#ig)" /><path d={line} fill="none" stroke="#16171b" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </Panel>
      <Group className="mt-3" title="Sources">
        <Cell icon={Briefcase} tint="blue" title="Client work" sub="6 clients" value="$41,200" />
        <Cell icon={Camera} tint="purple" title="Licensing" sub="Stock and fonts" value="$7,140" />
        <Cell icon={GraduationCap} tint="orange" title="Workshops" sub="2 sessions" value="$4,500" />
      </Group>
      <TabBar active={1} />
    </div>
  )
}

export const icons = { Lightbulb, Clock, AlertCircle }
