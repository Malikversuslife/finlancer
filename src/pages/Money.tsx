import { useState } from 'react'
import { Phone, IncomeScreen, ExpensesScreen } from '../components/Phone'
import { PageHero, Reveal, SectionHead, Photo, PHOTOS, Parallax, money } from '../components/ui'
import { SpendCalc, FinalCTA } from '../components/Stories'

const SOURCES = [['Acme Studio', 3800, 'bg-ink'], ['Northwind Press', 2200, 'bg-signal'], ['Licensing', 1900, 'bg-sky'], ['Workshops', 1520, 'bg-violet']] as const
const SINKS = [['Equipment', 1120, 'bg-sky'], ['Workspace', 780, 'bg-amber'], ['Software', 640, 'bg-violet'], ['Travel', 410, 'bg-coral'], ['Other', 235, 'bg-stone']] as const

function Flow() {
  const [sel, setSel] = useState<string | null>(null)
  const inT = SOURCES.reduce((a, s) => a + s[1], 0), outT = SINKS.reduce((a, s) => a + s[1], 0)
  const col = (items: readonly (readonly [string, number, string])[], total: number, align: string) => (
    <div className="flex h-[360px] flex-col gap-1">
      {items.map(([l, v, c]) => (
        <button key={l} onClick={() => setSel(sel === l ? null : l)} onMouseEnter={() => setSel(l)} onMouseLeave={() => setSel(null)}
          className={`flex items-end justify-between rounded-[6px] px-3 py-2 text-left transition-opacity ${c} ${c === 'bg-ink' ? 'text-paper' : c === 'bg-stone' ? 'text-ink' : 'text-ink'} ${sel && sel !== l ? 'opacity-30' : ''} ${align}`} style={{ flex: v / total }}>
          <span className="text-[12px]">{l}</span><span className="text-[12px] tnum">{money(v)}</span>
        </button>
      ))}
    </div>
  )
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10">
      <SectionHead eyebrow="Cash flow · October" title="Where it came from. Where it went." body="Hover or tap any block. Income sources on the left, expense categories on the right, what's left in the middle." />
      <Reveal className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
        {col(SOURCES, inT, '')}
        <div className="text-center">
          <p className="label text-mute">Net</p>
          <p className="mt-1 text-[clamp(1.8rem,4vw,3.4rem)] font-semibold tracking-[-0.04em] text-signal-deep tnum">{money(inT - outT)}</p>
          <p className="mt-1 text-[12px] text-mute tnum">{money(inT)} in · {money(outT)} out</p>
        </div>
        {col(SINKS.map(s => [s[0], s[1], s[2]] as const), inT, '')}
      </Reveal>
    </section>
  )
}

export default function Money() {
  return (
    <>
      <PageHero eyebrow="Money Management" title={<>Know where your money came from.<br /><span className="text-mute">Know where it went.</span></>} body="Income, expenses and cash flow understood together, so the patterns in your working year become visible.">
        <div className="flex justify-center gap-4 lg:justify-end"><Phone className="!w-[240px]"><IncomeScreen /></Phone><Phone className="mt-16 hidden !w-[240px] sm:block"><ExpensesScreen /></Phone></div>
      </PageHero>
      <Flow />
      <section className="bg-paper-2 py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-10 lg:grid-cols-12">
          <div className="relative h-[420px] overflow-hidden rounded-[28px] lg:col-span-5 lg:h-auto">
            <Parallax speed={-0.05} className="absolute -inset-y-12 inset-x-0"><Photo id={PHOTOS.laptop} alt="A freelancer working on a laptop at a wooden table" className="h-full w-full" /></Parallax>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead eyebrow="Spending patterns" title="The patterns that only show up over months." />
            <dl className="mt-12">
              {[['Income sources', 'See which clients and channels carry your year, and how concentrated that is.'], ['Expense categories', 'Grouped around independent work: software, equipment, workspace, travel.'], ['Spending patterns', 'Recurring costs, seasonal swings and unusual spikes surfaced as they happen.'], ['Available money', 'What remains after obligations, tax and goals. Always one glance away.']].map(([t, d]) => (
                <Reveal key={t} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[200px_1fr]"><dt className="text-[17px]">{t}</dt><dd className="text-[15px] leading-relaxed text-ink-2">{d}</dd></Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <SpendCalc />
      <FinalCTA />
    </>
  )
}
