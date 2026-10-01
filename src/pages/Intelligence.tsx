import { useState } from 'react'
import { Phone, IncomeScreen, ExpensesScreen, ClientsScreen, InvoiceFlowScreen, TaxScreen, GoalsScreen } from '../components/Phone'
import { PageHero, SectionHead, Reveal, Eyebrow } from '../components/ui'
import { FinalCTA } from '../components/Stories'

const AREAS = [
  { k: 'Income', s: <IncomeScreen />, c: 'bg-signal', ins: [['Your freelance income is above your recent average.', 'Compared with your trailing six months.'], ['Licensing is becoming a steadier source.', 'It has contributed every month since May.']] },
  { k: 'Expenses', s: <ExpensesScreen />, c: 'bg-coral', ins: [['Software expenses increased this month.', 'Two new subscriptions started in October.'], ['This purchase may be deductible.', 'Flagged for you to review, not decided for you.']] },
  { k: 'Clients', s: <ClientsScreen />, c: 'bg-amber', ins: [['Acme Studio typically pays after the due date.', 'Average of 34 days across 9 invoices.'], ['Most of your income comes from two clients.', 'Worth knowing when planning the next quarter.']] },
  { k: 'Invoices', s: <InvoiceFlowScreen step={2} />, c: 'bg-sky', ins: [['A reminder could help with #0138.', 'It is 6 days past due.'], ['Invoices sent early in the week tend to be paid sooner.', 'Based on your own history.']] },
  { k: 'Tax', s: <TaxScreen />, c: 'bg-amber', ins: [['Your current reserve may need adjusting.', 'Income this quarter is higher than when you set it.'], ['3 expenses are missing receipts.', 'Add them to keep documents complete.']] },
  { k: 'Goals', s: <GoalsScreen boost={420} />, c: 'bg-signal', ins: [["At your current pace, you'll reach this goal early.", 'Emergency Fund, projected January instead of March.'], ['A strong month is a good moment to top up.', 'Only a suggestion. You decide.']] },
]

export default function Intelligence() {
  const [a, setA] = useState(0)
  const x = AREAS[a]
  return (
    <>
      <PageHero eyebrow="Finlancer Intelligence" title={<>Your money has patterns.<br /><span className="text-mute">Finlancer finds them.</span></>} body="Intelligence isn't a separate place you go to ask questions. It's a quiet layer across income, clients, tax and goals, surfacing what matters where it matters." />
      <section className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <Eyebrow>Financial canvas · select an area</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-2" role="tablist">
            {AREAS.map((r, i) => (
              <button key={r.k} role="tab" aria-selected={a === i} onClick={() => setA(i)} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors ${a === i ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink/40'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.c}`} />{r.k}
              </button>
            ))}
          </div>
          <div className="mt-14 grid items-center gap-14 lg:grid-cols-12">
            <div key={a} className="menu-in lg:col-span-6">
              {x.ins.map(([t, d], i) => (
                <div key={t} className="border-t border-line py-7">
                  <p className="label flex items-center gap-2 text-mute"><span className={`h-1.5 w-1.5 rounded-full ${x.c}`} />{x.k} · 0{i + 1}</p>
                  <p className="mt-3 text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.03em]">{t}</p>
                  <p className="mt-2 text-[14px] text-mute">{d}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:col-span-5 lg:col-start-8"><Phone><div key={a} className="menu-in h-full">{x.s}</div></Phone></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead className="lg:col-span-5" eyebrow="Principles" title="Precise, contextual, and always yours to act on." />
          <div className="lg:col-span-6 lg:col-start-7">
            {[['In context', 'Observations appear on the screen they relate to, not in a separate feed.'], ['Explained', 'Each one says what it is based on, in plain language.'], ['Suggestive, never automatic', 'Finlancer points things out. Decisions stay with you.'], ['Not advice', 'Intelligence describes your own data. It is not financial, tax or legal advice.']].map(([t, d]) => (
              <Reveal key={t} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[220px_1fr]"><p className="text-[17px]">{t}</p><p className="text-[15px] leading-relaxed text-ink-2">{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
