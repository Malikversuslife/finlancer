import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Phone, OverviewScreen, ClientsScreen, ExpensesScreen, IncomeScreen, TaxScreen, GoalsScreen, Insight } from '../components/Phone'
import { GradientField, Button, CountUp, Depth, depth, Eyebrow, Parallax, Photo, PHOTOS, Reveal, SectionHead, useScrollProgress, useInView } from '../components/ui'
import { InvoiceStory, TaxStory, GoalsStory, SpendCalc, Loop, Trust, FinalCTA, LifeToProduct } from '../components/Stories'
import { Link } from 'react-router'

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <GradientField className="-z-10" />
      <Depth className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-20 pt-28 md:px-10 md:pt-36 lg:grid-cols-12 lg:pb-28">
        <div className="relative z-10 lg:col-span-7 lg:pt-10" style={depth(-4)}>
          <Reveal><Eyebrow>Finlancer · for independent work</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 text-[clamp(2.7rem,6.6vw,6rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
              Your work is independent.<br />
              <span className="text-mute">Your finances shouldn't be </span><span className="grad-text">scattered.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}><p className="mt-8 max-w-[470px] text-[17px] leading-relaxed text-ink-2">Income, clients, invoices, expenses, tax and goals. Finlancer brings the financial side of independent work into one place.</p></Reveal>
          <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact">Get started</Button>
            <Button to="/product" variant="secondary">Explore Finlancer</Button>
          </Reveal>
          <Reveal delay={320} className="mt-16 hidden max-w-[440px] grid-cols-3 gap-6 border-t border-line pt-5 md:grid">
            {[['Earn', 'Income'], ['Get paid', 'Invoices'], ['Prepare', 'Tax']].map(([a, b]) => <div key={a}><p className="label text-mute">{a}</p><p className="mt-1 text-[14px]">{b}</p></div>)}
          </Reveal>
        </div>
        <div className="relative h-[560px] lg:col-span-5 lg:h-[680px]">
          <Parallax speed={0.05} className="absolute right-0 top-0 h-[78%] w-[82%]">
            <div style={depth(6)} className="h-full w-full">
              <Photo id={PHOTOS.studio} alt="A designer working at a desk in a bright, plant-filled studio" className="h-full w-full rounded-[28px]" />
            </div>
          </Parallax>
          <div className="absolute bottom-0 left-0 sm:left-4" style={depth(14)}>
            <Parallax speed={-0.04}><Phone className="!w-[250px] md:!w-[270px]"><OverviewScreen /></Phone></Parallax>
          </div>
          <div className="absolute right-2 top-[58%] hidden w-[210px] sm:block" style={depth(22)}>
            <div className="rounded-[18px] border border-line bg-white p-3 shadow-[0_18px_40px_-22px_rgba(22,24,26,.35)]">
              <p className="label !text-[9px] text-mute">Invoice #0142</p>
              <div className="mt-1 flex items-baseline justify-between"><p className="text-[20px] font-medium tnum">$2,400</p><span className="rounded-full bg-mint px-2 py-0.5 text-[10px] text-signal-deep">Paid</span></div>
              <p className="text-[11px] text-mute">Acme Studio · just now</p>
            </div>
          </div>
        </div>
      </Depth>
    </section>
  )
}

const PIECES = [
  { l: 'Income', c: 'text-signal-deep', x: -34, y: -30, r: -6 },
  { l: 'Invoices', c: 'text-ink', x: 30, y: -38, r: 5 },
  { l: 'Clients', c: 'text-sky', x: -40, y: 18, r: 4 },
  { l: 'Expenses', c: 'text-coral', x: 36, y: 10, r: -4 },
  { l: 'Tax', c: 'text-amber', x: -12, y: 40, r: -3 },
  { l: 'Goals', c: 'text-violet', x: 22, y: 42, r: 6 },
]
function Problem() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const k = Math.min(1, Math.max(0, (p - 0.3) / 0.5))
  const e = 1 - Math.pow(1 - k, 3)
  return (
    <section ref={ref} className="relative h-[240vh] bg-paper-2 md:h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>The freelancer money problem</Eyebrow>
            <div className="mt-6 space-y-5 text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold leading-[1.18] tracking-[-0.03em]">
              <p style={{ opacity: 0.35 + Math.min(1, p * 4) * 0.65 }}>One client pays today.<br />Another pays next month.</p>
              <p style={{ opacity: 0.35 + Math.min(1, Math.max(0, p - 0.12) * 4) * 0.65 }}>Expenses keep moving.<br />Tax is coming.</p>
              <p style={{ opacity: 0.35 + Math.min(1, Math.max(0, p - 0.25) * 4) * 0.65 }} className="text-ink">And somehow you're supposed to know what's actually <span className="text-signal-deep">yours to spend.</span></p>
            </div>
          </div>
          <div className="relative h-[46vh] min-h-[320px] lg:col-span-6 lg:col-start-7 lg:h-[70vh]">
            {PIECES.map((pc, i) => (
              <div key={pc.l} className="absolute left-1/2 top-1/2 will-change-transform"
                style={{ transform: `translate(-50%, -50%) translate(${pc.x * (1 - e)}vw, ${pc.y * (1 - e) * 0.6 + (i - 2.5) * 34 * e}px) rotate(${pc.r * (1 - e)}deg)` }}>
                <span className={`block whitespace-nowrap rounded-[8px] border border-line bg-white px-4 py-2 text-[clamp(1rem,1.8vw,1.4rem)] font-semibold ${pc.c}`} style={{ width: e > 0.95 ? 220 : undefined, textAlign: 'left' }}>
                  {pc.l}
                </span>
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transition-opacity" style={{ opacity: e, transform: `translate(-50%, ${-140 - 20 * (1 - e)}px)` }}>
              <p className="label text-signal-deep">One Finlancer system</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const AREAS = [
  { k: 'Earn', d: 'Income tracking and trends across every client and source.', screen: <IncomeScreen />, links: [1] },
  { k: 'Get paid', d: 'Clients, invoices and receivables, from first draft to paid.', screen: <ClientsScreen />, links: [0, 2] },
  { k: 'Manage', d: 'Expenses and cash flow, sorted into categories that make sense for independent work.', screen: <ExpensesScreen />, links: [3] },
  { k: 'Prepare', d: 'Tax reserves, deductions and documents, building up as you work.', screen: <TaxScreen />, links: [4] },
  { k: 'Grow', d: 'Goals and financial intelligence that turn income into progress.', screen: <GoalsScreen />, links: [0] },
]
function System() {
  const [a, setA] = useState(0)
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead eyebrow="The Finlancer system" title={<>Five areas.<br />One connected picture.</>} body="Every part of Finlancer feeds the next. A paid invoice is income, which shapes your tax reserve, which shapes what you can spend and save." />
          <div className="mt-14" role="tablist" aria-label="Finlancer areas">
            {AREAS.map((x, i) => {
              const linked = AREAS[a].links.includes(i)
              return (
                <button key={x.k} role="tab" aria-selected={a === i} onClick={() => setA(i)} onMouseEnter={() => setA(i)}
                  className="group grid w-full grid-cols-[48px_1fr_auto] items-baseline gap-4 border-t border-line py-5 text-left last:border-b">
                  <span className={`label tnum ${a === i ? 'text-signal-deep' : 'text-mute'}`}>0{i + 1}</span>
                  <span>
                    <span className={`block text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.04em] transition-colors ${a === i ? 'text-ink' : 'text-mute/70 group-hover:text-ink-2'}`}>{x.k}</span>
                    <span className={`block overflow-hidden text-[14px] leading-relaxed text-ink-2 transition-all duration-500 ${a === i ? 'mt-3 max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>{x.d}</span>
                  </span>
                  <span className={`label transition-opacity ${linked ? 'text-signal-deep opacity-100' : 'opacity-0'}`}>feeds</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-x-10 inset-y-10 rounded-[28px] bg-mint" />
            <div className="relative"><Phone><div key={a} className="menu-in h-full">{AREAS[a].screen}</div></Phone></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Income() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)
  const months = [['May', 6.2, 2.9], ['Jun', 8.4, 3.1], ['Jul', 5.1, 3.4], ['Aug', 9.8, 2.8], ['Sep', 7.6, 3.6], ['Oct', 9.4, 3.2]] as const
  return (
    <section className="relative overflow-hidden bg-paper-2">
      <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead className="lg:col-span-6" eyebrow="Income" title="Know what your work is actually earning you." body="Your income changes. Your financial visibility shouldn't." />
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <p className="label text-mute">Total income · last 6 months</p>
            <p className="mt-2 text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-none tracking-[-0.05em]"><CountUp to={46500} prefix="$" /></p>
            <div className="mt-6 flex gap-8 text-[14px]">
              <p><span className="text-mute">Money in </span><span className="tnum text-signal-deep">$46.5k</span></p>
              <p><span className="text-mute">Money out </span><span className="tnum text-coral">$19.0k</span></p>
            </div>
          </div>
        </div>
        <div ref={ref} className="mt-16 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex h-[260px] items-end gap-3 border-b border-ink md:gap-6">
              {months.map(([m, i, o], idx) => (
                <div key={m} className="flex h-full flex-1 flex-col justify-end">
                  <div className="flex h-full items-end gap-1">
                    <div className="flex-1 rounded-t-[3px] bg-signal transition-[height] duration-1000 ease-out" style={{ height: inView ? `${(i / 10) * 100}%` : '0%', transitionDelay: `${idx * 70}ms` }} />
                    <div className="flex-1 rounded-t-[3px] bg-stone transition-[height] duration-1000 ease-out" style={{ height: inView ? `${(o / 10) * 100}%` : '0%', transitionDelay: `${idx * 70 + 40}ms` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3 md:gap-6">{months.map(([m]) => <span key={m} className="label flex-1 text-mute">{m}</span>)}</div>
          </div>
          <div className="space-y-0 lg:col-span-4">
            <p className="label mb-3 text-mute">Income sources</p>
            {[['Client work', 78, 'bg-ink'], ['Licensing', 14, 'bg-signal'], ['Workshops', 8, 'bg-sky']].map(([l, v, c]) => (
              <div key={l as string} className="border-t border-line py-3">
                <div className="flex justify-between text-[14px]"><span>{l}</span><span className="tnum text-mute">{v}%</span></div>
                <div className="mt-2 h-1 bg-stone"><div className={`h-full ${c} transition-[width] duration-1000`} style={{ width: inView ? `${v}%` : 0 }} /></div>
              </div>
            ))}
            <div className="pt-4"><Insight>Your freelance income is above your recent average.</Insight></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <div className="relative">
            <Phone><ClientsScreen /></Phone>
            <div className="absolute -right-16 top-16 hidden rounded-[18px] border border-line bg-white px-4 py-3 shadow-[0_18px_40px_-22px_rgba(22,24,26,.35)] md:block">
              <p className="label !text-[9px] text-mute">Avg. payment time</p>
              <p className="text-[24px] font-medium tnum"><CountUp to={19} suffix=" days" /></p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHead eyebrow="Clients" title={<>Who's paid you?<br /><span className="text-mute">Who hasn't?</span></>} />
          <Reveal className="mt-12">
            <p className="label text-mute">Outstanding</p>
            <p className="mt-2 text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-none tracking-[-0.05em]"><CountUp to={11350} prefix="$" /></p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
              {[['Overdue', '2 invoices', 'text-coral'], ['Due soon', '$4,320', 'text-amber'], ['Paid clients', '4 this month', 'text-signal-deep']].map(([a, b, c]) => (
                <div key={a} className="border-t border-line pt-3"><dt className={`label ${c}`}>{a}</dt><dd className="mt-1 text-[18px] font-medium tnum">{b}</dd></div>
              ))}
            </dl>
            <p className="mt-10 max-w-[420px] text-[15px] leading-relaxed text-ink-2">Every client carries their own payment history, so you know who pays early, who needs a nudge and who's worth a deposit up front.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Expenses() {
  const cats = [['Equipment', 1120, 'bg-sky'], ['Workspace', 780, 'bg-amber'], ['Software', 640, 'bg-violet'], ['Travel', 410, 'bg-coral'], ['Other', 235, 'bg-stone']] as const
  const [hover, setHover] = useState<string | null>(null)
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative h-[460px] overflow-hidden rounded-[28px] lg:col-span-5 lg:h-[620px]">
            <Parallax speed={-0.05} className="absolute -inset-y-12 inset-x-0"><Photo id={PHOTOS.homeDesk} alt="A tidy home workspace with a desktop computer on a wooden desk" className="h-full w-full" /></Parallax>
            <div className="absolute bottom-5 left-5 right-5"><Insight tone="coral">Software expenses increased this month.</Insight></div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:py-10">
            <SectionHead eyebrow="Expenses" title="Know where your money went." body="Categories that match how you actually work. Unusual spending flagged. Potentially deductible expenses marked as they happen." />
            <Reveal className="mt-12">
              <div className="flex h-12 gap-[3px] overflow-hidden rounded-[6px]">
                {cats.map(([l, v, c]) => (
                  <button key={l} onMouseEnter={() => setHover(l)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(l)} onClick={() => setHover(l)} aria-label={`${l} $${v}`}
                    className={`${c} transition-opacity ${hover && hover !== l ? 'opacity-30' : ''}`} style={{ flex: v }} />
                ))}
              </div>
              <div className="mt-6">
                {cats.map(([l, v, c]) => (
                  <div key={l} className={`flex items-center justify-between border-b border-line py-3 text-[15px] transition-opacity ${hover && hover !== l ? 'opacity-40' : ''}`}>
                    <span className="flex items-center gap-3"><span className={`h-2 w-2 rounded-[2px] ${c}`} />{l}{l === 'Software' && <span className="rounded-full bg-coral/10 px-2 py-0.5 text-[11px] text-coral">Unusual</span>}{l === 'Equipment' && <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] text-signal-deep">Possibly deductible</span>}</span>
                    <span className="tnum">${v.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intelligence() {
  const items = [
    ['Income', 'Your freelance income is above your recent average.', 'bg-signal'],
    ['Client', 'Acme Studio typically pays after the due date.', 'bg-amber'],
    ['Tax', 'Your current reserve may need adjusting.', 'bg-amber'],
    ['Spending', 'Software expenses increased this month.', 'bg-coral'],
    ['Goal', "At your current pace, you'll reach this goal early.", 'bg-signal'],
  ]
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <SectionHead className="lg:col-span-5" eyebrow="Finlancer Intelligence" title={<>Your money has patterns.<br /><span className="text-mute">Finlancer helps you see them.</span></>} body="Not a chatbot. Small, precise observations that appear where they're useful: on an invoice, a goal, a category." />
        <ul className="lg:col-span-6 lg:col-start-7">
          {items.map(([k, t, c], i) => (
            <Reveal as="li" key={k} delay={i * 70} className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-t border-line py-6 last:border-b">
              <span className="label flex items-center gap-2 text-mute"><span className={`h-1.5 w-1.5 rounded-full ${c}`} />{k}</span>
              <span className="text-[clamp(1.1rem,1.8vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em]">{t}</span>
            </Reveal>
          ))}
          <li className="pt-6"><Link to="/intelligence" className="group inline-flex items-center gap-1.5 text-[14px] text-signal-deep">See how Intelligence works <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <System />
      <Income />
      <InvoiceStory />
      <LifeToProduct />
      <Clients />
      <Expenses />
      <div className="h-24 md:h-32" />
      <TaxStory />
      <GoalsStory />
      <Intelligence />
      <div className="bg-paper-2"><SpendCalc /></div>
      <Trust />
      <Loop />
      <FinalCTA />
    </>
  )
}
