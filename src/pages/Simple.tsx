import { useState } from 'react'
import { ArrowRight, ChevronDown, Home, SearchX } from 'lucide-react'
import { Link } from 'react-router'
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
  const destinations = [
    { to: '/product', label: 'Explore the product', detail: 'See how Finlancer brings your money together.' },
    { to: '/resources', label: 'Visit resources', detail: 'Practical notes for independent work.' },
    { to: '/contact', label: 'Get in touch', detail: 'Ask a question or join early access.' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-paper px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border-[42px] border-[#ffce31] md:-left-10 md:h-[29rem] md:w-[29rem] md:border-[58px]" />
        <div className="absolute -right-24 bottom-[-7rem] h-80 w-80 rounded-full bg-[#b9f2ca] md:right-[-3rem] md:h-[34rem] md:w-[34rem]" />
        <div className="absolute right-[17%] top-[16%] h-14 w-14 rounded-full bg-[#9c7ced] md:h-20 md:w-20" />
      </div>

      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-mute">Error 404</p>
            <h1 className="mt-6 max-w-[760px] text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em]">Looks like this route took a detour.</h1>
            <p className="mt-8 max-w-[480px] text-[17px] leading-relaxed text-ink-2">The page you are looking for may have moved, or it may not exist yet. Your financial home is still right where you left it.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/" className="!bg-ink !text-paper hover:!bg-[#353537]">Back home</Button>
              <Button to="/product" variant="secondary">Explore Finlancer</Button>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-ink bg-ink text-paper shadow-[10px_10px_0_rgba(29,29,31,.12)] md:min-h-[410px] lg:col-span-5">
            <img src="/finlancer-404-cafe.png" alt="Freelancer working at a cafe" className="absolute inset-0 z-0 h-full w-full object-cover object-[62%_center]" />
            <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-[#06132b]/80 via-transparent to-transparent" />
            <p className="relative z-20 p-6 label text-paper/85 md:p-9">Wrong turn</p>
            <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[14px] border-[#ffce31] bg-paper/95 text-ink shadow-[0_18px_0_rgba(6,19,43,.35)] md:h-44 md:w-44 md:border-[18px]">
              <SearchX size={58} strokeWidth={1.7} aria-hidden />
            </div>
            <div className="absolute bottom-7 left-7 right-7 z-20 flex items-center justify-between border-t border-white/35 pt-4 text-[13px] md:bottom-9 md:left-9 md:right-9">
              <span>Finlancer navigator</span>
              <span className="rounded-full bg-paper px-3 py-1.5 font-medium text-ink">Re-routing</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-7 md:mt-24">
          <p className="label text-mute">Try one of these instead</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-3">
            {destinations.map(({ to, label, detail }, index) => (
              <Link key={to} to={to} className="group bg-paper p-6 transition-colors hover:bg-[#e8f8ed] md:min-h-[190px]">
                <span className="label text-mute">0{index + 1}</span>
                <p className="mt-9 flex items-center justify-between gap-3 text-[19px] font-medium tracking-[-0.03em]">{label}<ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" /></p>
                <p className="mt-2 max-w-[250px] text-[14px] leading-relaxed text-ink-2">{detail}</p>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-[14px] text-ink-2 transition-colors hover:text-ink"><Home size={16} strokeWidth={1.8} />Finlancer home</Link>
      </div>
    </section>
  )
}
