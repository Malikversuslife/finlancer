import { useState } from 'react'
import { Phone, TaxScreen } from '../components/Phone'
import { PageHero, SectionHead, Reveal, CountUp } from '../components/ui'
import { TaxStory, FinalCTA } from '../components/Stories'

const STEPS = [
  { k: 'Know', d: 'An estimate of your liability, based on income so far and the settings you choose.', v: 'Estimated liability', n: '$9,500' },
  { k: 'Reserve', d: 'A share of each payment set aside automatically, kept separate from spending money.', v: 'Reserved', n: '$7,410' },
  { k: 'Deduct', d: 'Potentially deductible expenses flagged as they happen, ready to review.', v: 'Deductions tracked', n: '$3,180' },
  { k: 'Organise', d: 'Receipts, invoices and statements stored against the right period.', v: 'Documents', n: '12' },
  { k: 'Prepare', d: 'Income summaries and reminders, so you arrive ready, whether you file yourself or with an accountant.', v: 'Tax ready', n: '78%' },
]

export default function Tax() {
  const [a, setA] = useState(0)
  return (
    <>
      <PageHero eyebrow="Tax" title={<>Tax shouldn't<br />surprise you.</>} body="Finlancer helps you reserve, organise and prepare throughout the year. It doesn't give tax advice, and it works alongside whoever helps you file.">
        <div className="flex items-end justify-center gap-8 lg:justify-end">
          <div className="hidden pb-10 text-right sm:block"><p className="text-[96px] font-semibold leading-none tracking-[-0.06em]"><CountUp to={78} suffix="%" /></p><p className="label mt-1 text-mute">Tax ready</p></div>
          <Phone><TaxScreen /></Phone>
        </div>
      </PageHero>
      <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-10">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ink pt-8" role="tablist">
          {STEPS.map((s, i) => (
            <button key={s.k} role="tab" aria-selected={a === i} onClick={() => setA(i)} className={`text-[clamp(1.6rem,4vw,3.4rem)] font-semibold tracking-[-0.04em] transition-colors ${a === i ? 'text-ink' : 'text-mute/50 hover:text-ink-2'}`}>
              {s.k}{i < STEPS.length - 1 && <span className="ml-6 text-mute/40">→</span>}
            </button>
          ))}
        </div>
        <div key={a} className="menu-in mt-12 grid gap-10 md:grid-cols-12">
          <p className="text-[18px] leading-relaxed text-ink-2 md:col-span-5">{STEPS[a].d}</p>
          <div className="md:col-span-5 md:col-start-8"><p className="label text-mute">{STEPS[a].v}</p><p className="mt-2 text-[72px] font-semibold leading-none tracking-[-0.05em] tnum">{STEPS[a].n}</p></div>
        </div>
      </section>
      <TaxStory />
      <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHead className="lg:col-span-5" eyebrow="Throughout the year" title="Preparation happens quietly, payment by payment." />
          <div className="lg:col-span-6 lg:col-start-7">
            {[['Income summaries', 'Period totals by client and source, ready to export.'], ['Reminders', 'Reminders for dates you add yourself, or that your accountant gives you.'], ['Remaining reserve', 'How much more to set aside, recalculated as income lands.'], ['Your settings, your rate', 'You decide the reserve percentage. Finlancer does not assume rules for where you live.']].map(([t, d]) => (
              <Reveal key={t} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[220px_1fr]"><p className="text-[17px]">{t}</p><p className="text-[15px] leading-relaxed text-ink-2">{d}</p></Reveal>
            ))}
            <p className="mt-6 text-[13px] text-mute">Finlancer does not provide tax, legal or financial advice. Estimates depend on the settings you provide.</p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
