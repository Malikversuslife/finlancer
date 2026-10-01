import { Phone, OverviewScreen, IncomeScreen, ClientsScreen, ExpensesScreen, TaxScreen, GoalsScreen } from '../components/Phone'
import { Eyebrow, PageHero, Reveal, useScrollProgress } from '../components/ui'
import { SpendCalc, FinalCTA, PhotoBand } from '../components/Stories'
import { PHOTOS } from '../components/ui'

const AREAS = [
  { k: 'Earn', d: 'Income tracking and trends.', to: '/money', s: <IncomeScreen /> },
  { k: 'Get paid', d: 'Clients, invoices and receivables.', to: '/invoicing', s: <ClientsScreen /> },
  { k: 'Manage', d: 'Expenses and cash flow.', to: '/money', s: <ExpensesScreen /> },
  { k: 'Prepare', d: 'Tax reserves, deductions and documents.', to: '/tax', s: <TaxScreen /> },
  { k: 'Grow', d: 'Goals and financial intelligence.', to: '/goals', s: <GoalsScreen /> },
]

function Chain() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const steps = [
    ['Invoice paid', 'Acme Studio pays #0143', '+$4,200'],
    ['Income updated', 'October income', '$13,620'],
    ['Tax reserve recalculated', 'Reserve set aside', '$7,410'],
    ['Goal opportunity identified', 'Emergency Fund', '+$420'],
    ['Available money updated', 'Yours to spend', '$6,840'],
  ]
  const n = Math.min(steps.length, Math.floor(p * (steps.length + 0.6)) + 1)
  return (
    <section ref={ref} className="relative h-[220vh] bg-ink text-paper md:h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="!text-paper/50">One event, everywhere</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.04em]">A single payment moves the whole picture.</h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map(([a, b, c], i) => (
              <li key={a} className={`grid grid-cols-[40px_1fr_auto] items-baseline gap-4 border-t border-white/12 py-4 transition-all duration-500 md:py-5 ${i < n ? 'opacity-100' : 'translate-y-2 opacity-20'}`}>
                <span className={`label ${i < n ? 'text-signal' : 'text-paper/40'}`}>{i === 0 ? '' : '↓'}</span>
                <span><span className="block text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold">{a}</span><span className="text-[13px] text-paper/50">{b}</span></span>
                <span className="text-[clamp(1.1rem,2.2vw,1.7rem)] font-semibold tnum">{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default function Product() {
  return (
    <>
      <PageHero eyebrow="Product overview" title={<>Everything between getting paid and knowing what to do with it.</>} body="Finlancer is a mobile financial operating system for independent professionals. Five connected areas, one app, the whole financial side of your work.">
        <div className="flex justify-center lg:justify-end"><Phone><OverviewScreen /></Phone></div>
      </PageHero>
      <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-10">
        <div className="grid gap-px overflow-hidden border-y border-line bg-line md:grid-cols-5">
          {AREAS.map((a, i) => (
            <Reveal key={a.k} delay={i * 60} className="bg-paper">
              <a href={a.to} className="group block h-full p-6 transition-colors hover:bg-paper-2">
                <p className="label tnum text-mute">0{i + 1}</p>
                <p className="mt-8 text-[28px] font-medium tracking-[-0.03em]">{a.k}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{a.d}</p>
                <p className="mt-6 text-[13px] text-signal-deep opacity-0 transition-opacity group-hover:opacity-100">Learn more →</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-24 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] md:justify-center">
          {AREAS.map((a, i) => <div key={a.k} className={`shrink-0 ${i % 2 ? 'md:mt-16' : ''}`}><Phone className="!w-[220px]">{a.s}</Phone></div>)}
        </div>
      </section>
      <Chain />
      <SpendCalc />
      <PhotoBand id={PHOTOS.phoneCafe} alt="A coffee, a laptop and earphones on a wooden cafe table" caption="Built for the moments between the work: a coffee, a train, ten minutes before the next call." />
      <FinalCTA />
    </>
  )
}
