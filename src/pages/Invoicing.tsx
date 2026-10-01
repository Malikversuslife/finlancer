import { useState } from 'react'
import { Bell, Clock, FileText, History, Link2, Users } from 'lucide-react'
import { Phone, InvoiceFlowScreen, ClientsScreen, Row } from '../components/Phone'
import { PageHero, Reveal, SectionHead, Eyebrow } from '../components/ui'
import { InvoiceStory, FinalCTA } from '../components/Stories'

const STATUSES = [
  { s: 'Draft', c: 'bg-stone text-ink-2', n: 1, d: 'Being prepared. Nothing sent yet.' },
  { s: 'Sent', c: 'bg-sky/10 text-sky', n: 3, d: 'Delivered with a payment link attached.' },
  { s: 'Due soon', c: 'bg-amber/15 text-[#9a6a10]', n: 2, d: 'Due within the next seven days.' },
  { s: 'Overdue', c: 'bg-coral/10 text-coral', n: 2, d: 'Past the due date. A reminder is ready.' },
  { s: 'Paid', c: 'bg-mint text-signal-deep', n: 11, d: 'Settled and recorded as income.' },
]

export default function Invoicing() {
  const [st, setSt] = useState(3)
  const [client, setClient] = useState(0)
  const clients = [
    { n: 'Acme Studio', life: '$38,400', avg: '34 days', late: '3 of 9 late', note: 'Acme Studio typically pays after the due date.' },
    { n: 'Northwind Press', life: '$12,900', avg: '12 days', late: '0 of 6 late', note: 'Northwind Press consistently pays early.' },
    { n: 'Hollis & Co.', life: '$7,440', avg: '21 days', late: '1 of 4 late', note: 'One invoice is overdue by 6 days.' },
  ]
  const c = clients[client]
  return (
    <>
      <PageHero eyebrow="Invoicing & Clients" title={<>Do the work.<br /><span className="text-mute">We'll help with the getting-paid part.</span></>} body="Professional invoices from your phone, payment links, reminders and a clear view of who owes what.">
        <div className="flex justify-center lg:justify-end"><Phone><InvoiceFlowScreen step={1} /></Phone></div>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10">
        <div className="grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[[FileText, 'Professional invoices', 'Your details, line items and terms, laid out cleanly.'], [Link2, 'Payment links', 'Clients pay from the invoice itself.'], [Bell, 'Reminders', 'Polite follow-ups scheduled around due dates.'], [History, 'Payment history', 'Every invoice and payment, per client.']].map(([I, t, d]) => {
            const Icon = I as typeof FileText
            return <Reveal key={t as string}><Icon size={20} strokeWidth={1.9} /><p className="mt-5 text-[17px]">{t as string}</p><p className="mt-2 text-[14px] leading-relaxed text-mute">{d as string}</p></Reveal>
          })}
        </div>
      </section>

      <InvoiceStory />

      <section className="bg-paper-2 py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <SectionHead eyebrow="Invoice statuses" title="Every invoice, in one of five states." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="flex flex-wrap gap-2 lg:col-span-5 lg:flex-col lg:items-start">
              {STATUSES.map((x, i) => (
                <button key={x.s} onClick={() => setSt(i)} aria-pressed={st === i} className={`flex items-center gap-3 rounded-full px-4 py-2 text-[14px] transition-colors ${st === i ? x.c + ' ring-1 ring-current' : 'text-mute hover:text-ink'}`}>
                  {x.s}<span className="tnum text-[12px] opacity-70">{x.n}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[clamp(2.2rem,5vw,4rem)] font-semibold tracking-[-0.04em]">{STATUSES[st].s}</p>
              <p className="mt-3 text-[16px] text-ink-2">{STATUSES[st].d}</p>
              <div className="mt-8 border-t border-ink">
                {st === 3 ? <><Row l="Hollis & Co. · #0138" s="6 days overdue" r="$2,480" tone="text-coral" /><Row l="Field Notes · #0131" s="2 days overdue" r="$640" tone="text-coral" /></> :
                  st === 2 ? <><Row l="Northwind Press · #0141" s="Due in 3 days" r="$1,870" tone="text-amber" /><Row l="Acme Studio · #0142" s="Due in 6 days" r="$2,450" tone="text-amber" /></> :
                  st === 4 ? <><Row l="Lumen Records · #0139" s="Paid in 9 days" r="$2,800" pos /><Row l="Acme Studio · #0136" s="Paid in 41 days" r="$3,600" pos /></> :
                  <Row l="Acme Studio · #0143" s={st === 0 ? 'Draft' : 'Sent 2 Oct'} r="$4,200" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <SectionHead className="lg:col-span-6" eyebrow="Clients" title="Your client list should tell you more than their email address." body="Lifetime value, payment habits and open receivables, per client. So the next quote is better informed than the last." />
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex gap-1 border-b border-line">
              {clients.map((x, i) => <button key={x.n} onClick={() => setClient(i)} className={`-mb-px border-b px-3 py-3 text-[13px] ${client === i ? 'border-ink text-ink' : 'border-transparent text-mute'}`}>{x.n}</button>)}
            </div>
            <div key={client} className="menu-in pt-8">
              <p className="label text-mute">Lifetime billed</p>
              <p className="mt-1 text-[56px] font-semibold leading-none tracking-[-0.05em] tnum">{c.life}</p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div className="border-t border-line pt-3"><dt className="label flex items-center gap-1.5 text-mute"><Clock size={12} />Avg. payment</dt><dd className="mt-1 text-[18px] font-medium">{c.avg}</dd></div>
                <div className="border-t border-line pt-3"><dt className="label flex items-center gap-1.5 text-mute"><Users size={12} />Record</dt><dd className="mt-1 text-[18px] font-medium">{c.late}</dd></div>
              </dl>
              <p className="mt-8 flex gap-2 text-[14px] text-ink-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-signal" />{c.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <Eyebrow>The complete create invoice flow</Eyebrow>
          <div className="mt-10 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none]">
            {['Select client', 'Add line items', 'Send', 'Paid', 'Income updated'].map((t, i) => (
              <div key={t} className="shrink-0">
                <p className="label mb-4 text-mute"><span className="text-signal-deep">0{i + 1}</span> {t}</p>
                <Phone className="!w-[230px]">{i === 4 ? <InvoiceFlowScreen step={4} /> : i === 3 ? <InvoiceFlowScreen step={3} /> : <InvoiceFlowScreen step={i} />}</Phone>
              </div>
            ))}
            <div className="shrink-0"><p className="label mb-4 text-mute"><span className="text-signal-deep">06</span> Receivables</p><Phone className="!w-[230px]"><ClientsScreen /></Phone></div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
