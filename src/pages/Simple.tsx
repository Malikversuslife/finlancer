import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button, Eyebrow } from '../components/ui'

function Shell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]">{title}</h1>
          {intro && <p className="mt-6 max-w-[360px] text-[16px] leading-relaxed text-ink-2">{intro}</p>}
        </div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  )
}

const Prose = ({ items }: { items: [string, string][] }) => (
  <div>{items.map(([h, p]) => <div key={h} className="border-t border-line py-7"><h2 className="text-[19px]">{h}</h2><p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p}</p></div>)}</div>
)

export function Help() {
  const faqs: [string, string][] = [
    ['Is Finlancer a mobile app?', 'Yes. Finlancer is designed for your phone. This website exists to explain it.'],
    ['Does Finlancer give tax advice?', 'No. It helps you estimate, reserve and organise based on settings you choose. For advice, speak to a qualified professional.'],
    ['Can I send invoices with payment links?', 'Yes. Each invoice can include a payment link so clients can pay directly from it.'],
    ['How is available money calculated?', 'Your balance, minus upcoming obligations, your tax reserve and committed goal contributions.'],
    ['What does Finlancer Intelligence do?', 'It notices patterns in your own data, such as a client who usually pays late, and shows them where they are useful. It is not a chatbot.'],
    ['How much does Finlancer cost?', 'Pricing has not been finalised yet. The pricing page will be updated when it is.'],
  ]
  const [o, setO] = useState(0)
  return (
    <Shell eyebrow="Help Centre" title="How can we help?" intro="Answers to common questions. If yours isn't here, get in touch.">
      <div className="border-b border-line">
        {faqs.map(([q, a], i) => (
          <div key={q} className="border-t border-line">
            <button className="flex w-full items-center justify-between gap-6 py-6 text-left text-[18px]" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>{q}<ChevronDown size={18} strokeWidth={1.9} className={`shrink-0 transition-transform ${o === i ? 'rotate-180' : ''}`} /></button>
            {o === i && <p className="menu-in max-w-[560px] pb-7 text-[15px] leading-relaxed text-ink-2">{a}</p>}
          </div>
        ))}
      </div>
      <Button to="/contact" variant="secondary" className="mt-10">Contact us</Button>
    </Shell>
  )
}

export function Privacy() {
  return (
    <Shell eyebrow="Legal" title="Privacy" intro="Our approach, in plain language. A full policy will be published before launch.">
      <Prose items={[
        ['What we collect', 'The information you choose to add or connect to Finlancer, such as income, expenses, clients and invoices, plus basic account details.'],
        ['How we use it', 'To provide the product to you: calculations, summaries and the observations shown by Finlancer Intelligence.'],
        ['What we do not do', 'We do not sell your personal data.'],
        ['Your control', 'You decide what is connected, and you can request export or deletion of your data.'],
        ['Questions', 'Contact us through the contact page and we will respond.'],
      ]} />
    </Shell>
  )
}

export function Terms() {
  return (
    <Shell eyebrow="Legal" title="Terms" intro="A summary of the terms that will govern use of Finlancer. Final terms will be published before launch.">
      <Prose items={[
        ['Using Finlancer', 'Finlancer is a tool to help you organise and understand your finances as an independent professional.'],
        ['No advice', 'Finlancer does not provide tax, legal or financial advice. Estimates depend on the information and settings you provide.'],
        ['Your account', 'You are responsible for keeping your login details secure and the information you add accurate.'],
        ['Changes', 'We will let you know when these terms change in a meaningful way.'],
      ]} />
    </Shell>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const field = 'mt-2 h-12 w-full rounded-[8px] border border-line bg-white px-4 text-[15px] outline-none transition-colors focus:border-ink'
  return (
    <Shell eyebrow="Contact" title="Get started with Finlancer." intro="Join the early access list, or send us a question. We read everything.">
      {sent ? (
        <div className="menu-in border-t border-ink pt-8"><p className="text-[28px] font-medium tracking-[-0.03em]">Thanks. You're on the list.</p><p className="mt-3 text-[15px] text-ink-2">We'll be in touch when there's something to share.</p></div>
      ) : (
        <form className="space-y-6 border-t border-ink pt-8" onSubmit={e => { e.preventDefault(); setSent(true) }}>
          <label className="block text-[13px] text-mute">Name<input required className={field} autoComplete="name" /></label>
          <label className="block text-[13px] text-mute">Email<input required type="email" className={field} autoComplete="email" /></label>
          <label className="block text-[13px] text-mute">What kind of work do you do?<input className={field} placeholder="Designer, photographer, developer, consultant…" /></label>
          <label className="block text-[13px] text-mute">Message (optional)<textarea rows={4} className={field + ' h-auto py-3'} /></label>
          <button className="group inline-flex h-11 items-center gap-2 rounded-full bg-signal px-6 text-[14px] font-medium leading-none text-ink shadow-[0_10px_24px_-10px_rgba(31,143,63,.45)] transition-[transform,background-color] hover:-translate-y-px hover:bg-[#58df72]">Request early access →</button>
        </form>
      )}
    </Shell>
  )
}

export function NotFound() {
  return <Shell eyebrow="404" title="This page doesn't exist."><Button to="/">Back to Finlancer</Button></Shell>
}
