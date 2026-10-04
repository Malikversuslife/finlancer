import { useState } from 'react'
import { Phone, InvoiceFlowScreen, TaxScreen, GoalsScreen, GoalCreateScreen } from './Phone'
import { Button, CountUp, Eyebrow, Reveal, money, useScrollProgress, Photo, PHOTOS, Parallax } from './ui'
import { EditorialIllustration } from './Illustration'

/* Generic sticky story: narrative steps left, phone right */
function StickyStory({ eyebrow, title, steps, render, tall = 'h-[260vh] md:h-[340vh]', bg = '' }: {
  eyebrow: string; title: React.ReactNode; steps: { k: string; t: string; d: string }[]; render: (i: number, p: number) => React.ReactNode; tall?: string; bg?: string
}) {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const i = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999))
  return (
    <section ref={ref} className={`relative ${tall} ${bg}`}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-6 lg:col-span-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{title}</h2>
            <ol className="mt-8 hidden space-y-0 md:block">
              {steps.map((s, k) => (
                <li key={s.k} className={`border-t py-4 transition-colors duration-300 ${k === i ? 'border-ink' : 'border-line'}`}>
                  <div className="flex items-baseline gap-4">
                    <span className={`label tnum ${k <= i ? 'text-signal-deep' : 'text-mute'}`}>0{k + 1}</span>
                    <div>
                      <p className={`text-[16px] transition-colors ${k === i ? 'text-ink' : 'text-mute'}`}>{s.t}</p>
                      <p className={`overflow-hidden text-[14px] leading-relaxed text-ink-2 transition-all duration-500 ${k === i ? 'mt-1 max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>{s.d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 md:hidden">
              <p className="label text-signal-deep">0{i + 1} / 0{steps.length}</p>
              <p className="mt-1 text-[15px]">{steps[i].t}</p>
            </div>
          </div>
          <div className="flex justify-center md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="origin-top scale-[.78] md:scale-100">{render(i, p)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function InvoiceStory() {
  return (
    <StickyStory
      eyebrow="Invoicing"
      title={<>Send the invoice.<br />Get back to work.</>}
      steps={[
        { k: 'c', t: 'Client selected', d: 'Pick a client and Finlancer brings their rates, terms and payment habits with them.' },
        { k: 'i', t: 'Invoice created', d: 'Line items, due date and a payment link. Done from your phone, between sessions.' },
        { k: 's', t: 'Invoice sent', d: 'Status is tracked from sent to viewed, with a reminder scheduled for you.' },
        { k: 'p', t: 'Payment received', d: 'The invoice closes itself the moment the money lands.' },
        { k: 'u', t: 'Income updated', d: 'Income, tax reserve and available money all adjust. No spreadsheet.' },
      ]}
      render={i => (
        <div className="relative">
          <Phone><InvoiceFlowScreen step={i} /></Phone>
          <div className={`absolute -left-28 top-24 hidden w-48 rounded-[18px] border border-line bg-white p-3 shadow-[0_16px_40px_-20px_rgba(22,24,26,.3)] transition-all duration-500 lg:block ${i >= 3 ? 'opacity-100' : 'translate-y-2 opacity-0'}`}>
            <p className="label !text-[9px] text-mute">Payment</p>
            <p className="mt-1 text-[20px] font-medium tnum">+$4,200</p>
            <p className="text-[11px] text-signal-deep">Acme Studio</p>
          </div>
        </div>
      )}
    />
  )
}

export function TaxStory() {
  return (
    <StickyStory
      eyebrow="Tax"
      bg="bg-paper-2"
      title={<>Tax shouldn't<br />surprise you.</>}
      steps={[
        { k: 'a', t: 'Income enters', d: 'A $4,200 payment arrives from a client.' },
        { k: 'b', t: 'Estimated reserve adjusts', d: 'Your estimate updates using the reserve settings you choose.' },
        { k: 'c', t: 'Money is reserved', d: 'A share moves into your tax pot so it is never mistaken for spending money.' },
        { k: 'd', t: 'Readiness progresses', d: 'Deductions and documents are organised alongside, so preparation is already underway.' },
      ]}
      render={(i, p) => {
        const est = i >= 1 ? 9500 : 8640
        const res = i >= 2 ? 7410 : 6400
        const ready = i >= 3 ? 78 : i >= 2 ? 74 : 67
        return (
          <div className="flex items-center gap-10">
            <div className="hidden text-right lg:block">
              <p className="text-[clamp(5rem,9vw,8.5rem)] font-semibold leading-none tracking-[-0.06em] tnum">{ready}<span className="text-signal-deep">%</span></p>
              <p className="label mt-2 text-mute">Tax ready</p>
              <p className="mt-6 text-[13px] text-mute tnum">Reserved {money(res)} of {money(est)}</p>
              <div className="ml-auto mt-2 h-px w-40 bg-line"><div className="h-px bg-ink" style={{ width: `${p * 100}%` }} /></div>
            </div>
            <Phone><TaxScreen ready={ready} reserved={res} estimate={est} /></Phone>
          </div>
        )
      }}
    />
  )
}

export function GoalsStory() {
  return (
    <StickyStory
      eyebrow="Goals"
      tall="h-[220vh] md:h-[280vh]"
      title={<>Give your money<br />somewhere to go.</>}
      steps={[
        { k: 'a', t: 'A goal with a date', d: 'Emergency Fund, $12,000 by March 2027.' },
        { k: 'b', t: 'Income arrives', d: 'A client payment lands and 10% moves to the goal automatically.' },
        { k: 'c', t: 'Projection moves', d: 'Completion moves forward. Finlancer tells you when you are ahead.' },
      ]}
      render={i => <Phone><GoalsScreen boost={i >= 1 ? 420 : 0} /></Phone>}
    />
  )
}

export function GoalCreateStory() {
  return (
    <StickyStory
      eyebrow="Create a goal"
      tall="h-[240vh] md:h-[320vh]"
      title={<>Four taps from<br />idea to plan.</>}
      steps={[
        { k: 'a', t: 'Choose what it is for', d: 'Start from a common goal or name your own.' },
        { k: 'b', t: 'Set a target and date', d: 'An amount and a date you can actually picture.' },
        { k: 'c', t: 'Decide how it fills', d: 'A percentage of income, a fixed automatic amount, or manual top-ups.' },
        { k: 'd', t: 'See the projection', d: 'Finlancer estimates completion from your recent income before you commit.' },
      ]}
      render={i => <Phone><GoalCreateScreen step={i} /></Phone>}
    />
  )
}

/* What can I actually spend? */
export function SpendCalc() {
  const rows = [
    { k: 'bal', l: 'Balance', v: 18240, c: 'bg-ink', note: 'Across connected accounts' },
    { k: 'ob', l: 'Upcoming obligations', v: -3860, c: 'bg-coral', note: 'Rent, subscriptions, bills due' },
    { k: 'tax', l: 'Tax reserve', v: -5140, c: 'bg-amber', note: 'Held back for later' },
    { k: 'goal', l: 'Committed goals', v: -2400, c: 'bg-sky', note: 'This month’s contributions' },
  ]
  const [on, setOn] = useState<Record<string, boolean>>({ ob: true, tax: true, goal: true })
  const total = rows.reduce((a, r) => a + (r.k === 'bal' || on[r.k] ? r.v : 0), 0)
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>The question that matters</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]">What can I actually spend?</h2></Reveal>
          <Reveal delay={120}><p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-ink-2">Your balance isn't the answer. Finlancer subtracts what's already spoken for, so the number you see is yours. Toggle each line to see how it changes.</p></Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <div className="border-t border-ink">
            {rows.map((r, idx) => {
              const active = r.k === 'bal' || on[r.k]
              return (
                <button key={r.k} disabled={r.k === 'bal'} onClick={() => setOn(s => ({ ...s, [r.k]: !s[r.k] }))}
                  className={`group grid w-full grid-cols-[28px_1fr_auto] items-center gap-4 border-b border-line py-5 text-left transition-opacity ${active ? '' : 'opacity-40'} ${r.k !== 'bal' ? 'cursor-pointer' : 'cursor-default'}`} aria-pressed={r.k === 'bal' ? undefined : active}>
                  <span className="label text-mute">{idx === 0 ? '' : '−'}</span>
                  <span>
                    <span className="flex items-center gap-2.5 text-[17px]"><span className={`h-2 w-2 rounded-[2px] ${r.c}`} />{r.l}</span>
                    <span className="mt-0.5 block pl-[18px] text-[13px] text-mute">{r.note}</span>
                  </span>
                  <span className={`text-[clamp(1.2rem,2.4vw,1.8rem)] font-semibold tnum ${active ? '' : 'line-through'}`}>{money(Math.abs(r.v))}</span>
                </button>
              )
            })}
            <div className="grid grid-cols-[28px_1fr_auto] items-end gap-4 pt-7">
              <span className="label text-signal-deep">=</span>
              <span className="label text-ink">Available money</span>
              <span className="text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] grad-text tnum transition-all">{money(total)}</span>
            </div>
            <div className="mt-6 flex h-2 w-full gap-[2px] overflow-hidden rounded-[3px]">
              <span className="bg-signal transition-all duration-500" style={{ width: `${(total / 18240) * 100}%` }} />
              {rows.slice(1).map(r => <span key={r.k} className={`${r.c} transition-all duration-500`} style={{ width: on[r.k] ? `${(Math.abs(r.v) / 18240) * 100}%` : '0%' }} />)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Loop() {
  const steps = ['Work', 'Invoice', 'Get paid', 'Manage', 'Prepare', 'Save', 'Grow']
  const [a, setA] = useState(2)
  const desc = ['You do the job you are good at.', 'An invoice leaves your phone in a minute.', 'Payment lands and matches itself.', 'Income and expenses sort into place.', 'Tax is reserved as you go.', 'Goals take their share.', 'You see the bigger picture, and plan the next stretch.']
  return (
    <section className="bg-ink py-28 text-paper md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="!text-paper/50">The financial loop</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">Finlancer connects the entire cycle.</h2>
            <p className="mt-8 min-h-[56px] max-w-[320px] text-[16px] leading-relaxed text-paper/70" aria-live="polite">{desc[a]}</p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {steps.map((s, i) => (
              <li key={s}>
                <button onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} className="group flex w-full items-baseline gap-6 border-t border-white/12 py-3 text-left md:py-4">
                  <span className={`label tnum transition-colors ${i === a ? 'text-signal' : 'text-paper/40'}`}>0{i + 1}</span>
                  <span className={`text-[clamp(1.8rem,4.6vw,3.8rem)] font-semibold leading-none tracking-[-0.04em] transition-[color,transform] duration-300 ${i === a ? 'translate-x-2 text-paper' : 'text-paper/30'}`}>{s}</span>
                  {i < steps.length - 1 && <span className={`ml-auto text-[13px] transition-opacity ${i === a ? 'opacity-60' : 'opacity-0'}`}>↓</span>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Trust() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 md:px-10">
      <div className="grid gap-10 border-t border-ink pt-10 md:grid-cols-12">
        <p className="label text-mute md:col-span-3">Trust</p>
        <h3 className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.03em] md:col-span-5">Your financial data is personal. We treat it that way.</h3>
        <div className="space-y-5 text-[15px] leading-relaxed text-ink-2 md:col-span-4">
          <p>Finlancer is designed so you stay in control of what is connected, what is shared and what is kept.</p>
          <p>We will publish the specifics of how data is stored and protected before launch. Until then, we would rather say nothing than claim something we can't show you. <a href="/privacy" className="text-signal-deep underline underline-offset-4">Read our privacy approach</a>.</p>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] items-end gap-10 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <h2 className="text-[clamp(2.6rem,7vw,6.4rem)] font-semibold leading-[0.96] tracking-[-0.05em] md:col-span-9">
          Your finances should work <span className="grad-text">as hard as you do.</span>
        </h2>
        <div className="md:col-span-3 md:pb-3"><Button to="/contact">Get started with Finlancer</Button></div>
      </div>
    </section>
  )
}

/* Photo → product transition */
export function LifeToProduct() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const k = Math.min(1, p * 1.4)
  const stage = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3
  const caps = ['The work is done.', 'A quick look at the phone.', 'One invoice still unpaid.', 'Sent. Paid. Income updated.']
  return (
    <section ref={ref} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `scale(${1 + k * 0.08})`, opacity: 1 - Math.max(0, k - 0.4) * 1.5 }}>
          <Photo id={PHOTOS.camera} alt="A photographer's camera and lens resting on a table after a shoot" className="h-full w-full" w={1800} />
          <div className="absolute inset-0 bg-ink/25" />
        </div>
        <div className="absolute inset-0 bg-paper" style={{ opacity: Math.max(0, k - 0.45) * 1.9 }} />
        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-between px-5 py-24 md:flex-row md:items-center md:px-10">
          <p className={`max-w-[460px] text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] transition-colors duration-500 ${k > 0.6 ? 'text-ink' : 'text-paper'}`} aria-live="polite">{caps[stage]}</p>
          <div className="self-center" style={{ transform: `translateY(${(1 - k) * 120}px)`, opacity: Math.min(1, k * 2.2) }}>
            <div className="origin-top scale-[.78] md:scale-100"><Phone><InvoiceFlowScreen step={stage <= 1 ? 1 : stage === 2 ? 2 : 4} /></Phone></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PhotoBand({ id, alt, caption }: { id: string; alt: string; caption: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 md:px-10">
      <div className="kinetic-panel relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[28px] bg-[#dcecff] p-8">
        <EditorialIllustration scene={id.includes('studio') ? 'goals' : id.includes('cafe') ? 'invoice' : 'money'} className="max-h-[500px] max-w-[680px]" />
        <p className="absolute bottom-6 left-6 max-w-[360px] rounded-[12px] bg-ink px-4 py-3 text-[15px] text-paper">{caption}</p>
      </div>
    </section>
  )
}

export { CountUp }
