import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Phone, OverviewScreen } from '../components/Phone'
import { Button, CountUp, Eyebrow, Parallax, Photo, PHOTOS, Reveal } from '../components/ui'

const products = [
  { n: '01', t: 'Income that adds up', d: 'See what came in, where it came from and what is changing.', c: 'bg-[#d9f5df]', to: '/money', module: { l: 'October income', a: '$13,620', d: '+18% from September', c: 'bg-signal', rows: [['Acme Studio', '$4,200'], ['Northwind Press', '$2,200']] } },
  { n: '02', t: 'Invoices that move', d: 'Send, follow and get paid without leaving your flow.', c: 'bg-[#dcecff]', to: '/invoicing', module: { l: 'Invoices to follow', a: '$3,120', d: '2 need attention', c: 'bg-sky', rows: [['Hollis & Co.', '6 days late'], ['Field Notes', 'Due tomorrow']] } },
  { n: '03', t: 'Tax without the shock', d: 'Keep reserve, deductions and documents moving quietly.', c: 'bg-[#fff0cd]', to: '/tax', module: { l: 'Tax reserve', a: '$7,410', d: '78% of your estimate', c: 'bg-amber', rows: [['Estimated liability', '$9,500'], ['Receipts organised', '12 documents']] } },
  { n: '04', t: 'Goals with momentum', d: 'Turn the good months into progress you can see.', c: 'bg-[#eadfff]', to: '/goals', module: { l: 'Emergency Fund', a: '$7,560', d: '63% complete', c: 'bg-violet', rows: [['This month', '+$420'], ['On track for', 'January 2027']] } },
]

function MiniModule({ module }: { module: { l: string; a: string; d: string; c: string; rows: string[][] } }) {
  return <div className="relative mt-10 overflow-hidden rounded-[14px] border border-ink/10 bg-paper p-4 shadow-[0_14px_26px_-22px_rgba(29,29,31,.55)]"><div className="flex items-center justify-between"><p className="text-[11px] font-medium text-mute">{module.l}</p><span className={`h-2.5 w-2.5 rounded-full ${module.c}`} /></div><p className="mt-3 text-[26px] font-semibold leading-none tracking-[-.05em] tnum">{module.a}</p><p className="mt-1 text-[11px] text-signal-deep">{module.d}</p><div className="mt-4 space-y-2 border-t border-line pt-2.5">{module.rows.map(([l, v]) => <div key={l} className="flex items-center justify-between gap-3 text-[10px]"><span className="truncate text-ink-2">{l}</span><span className="shrink-0 font-medium text-ink">{v}</span></div>)}</div></div>
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#06132b] px-5 pb-14 pt-28 text-paper md:px-10 md:pb-20 md:pt-36">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div aria-hidden className="absolute -left-32 bottom-[-16rem] -z-10 h-[35rem] w-[35rem] rounded-full bg-[#1d9f55]/35 blur-3xl" />
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow className="text-signal">Finlancer for independent work</Eyebrow>
          <h1 className="mt-6 max-w-[800px] text-[clamp(3.5rem,8vw,7.7rem)] font-semibold leading-[.86] tracking-[-.07em]">The money side of <span className="text-[#ffce31]">freelancing.</span></h1>
          <p className="mt-8 max-w-[510px] text-[17px] leading-relaxed text-paper/70">Everything between getting paid and knowing what to do next. Income, invoices, tax and goals in one mobile financial home.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button to="/contact">Join the waitlist</Button><Button to="/product" variant="secondary" className="!border-white/25 !bg-white/8 !text-paper hover:!border-white/50">See how it works</Button></div>
        </div>
        <div className="relative mx-auto flex min-h-[470px] w-full items-end justify-center overflow-hidden rounded-[28px] border border-white/12 bg-[#153f78] pt-10 shadow-[14px_18px_0_rgba(52,199,89,.75)] lg:col-span-5">
          <div aria-hidden className="absolute -left-16 -top-20 h-60 w-60 rounded-full border-[34px] border-[#ffce31]" />
          <div aria-hidden className="absolute -bottom-20 right-[-4rem] h-56 w-56 rounded-full bg-[#34c759]" />
          <Parallax speed={0.08} className="absolute left-5 top-5 z-20"><div className="rounded-full border border-white/15 bg-[#06132b]/85 px-3 py-1.5 text-[11px] font-medium text-paper">Built for your phone</div></Parallax>
          <Phone className="relative z-10 !w-[250px] sm:!w-[280px]" pose={-8}><OverviewScreen /></Phone>
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1280px] border-t border-white/15 pt-5 sm:grid-cols-3">
        {[[13620, 'Income this month', '+18% from September'], [78, 'Tax ready', '$7,410 reserved'], [420, 'Moved towards goals', 'From your latest payment']].map(([n, label, detail], i) => (
          <div key={label as string} className={`py-4 sm:px-6 ${i ? 'sm:border-l sm:border-white/15' : ''}`}><p className="text-[clamp(1.85rem,3vw,2.7rem)] font-semibold leading-none tracking-[-.05em]"><CountUp to={n as number} prefix={i === 1 ? '' : i === 2 ? '+$' : '$'} suffix={i === 1 ? '%' : ''} /></p><p className="mt-2 text-[13px] font-medium text-paper">{label as string}</p><p className="mt-1 text-[12px] text-paper/50">{detail as string}</p></div>
        ))}
      </div>
    </section>
  )
}

function ProductGrid() {
  return <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-32"><div className="grid gap-8 lg:grid-cols-12"><div className="lg:col-span-5"><Eyebrow>One app. Four better habits.</Eyebrow><h2 className="mt-5 max-w-[500px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.065em]">Built around how your money actually moves.</h2></div><p className="self-end text-[16px] leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-8">Freelance money is connected. A paid invoice changes your available balance, your tax reserve and what you can move towards a goal.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2">{products.map((p, i) => <Reveal key={p.t} delay={i * 70}><Link to={p.to} className={`product-tile group block min-h-[370px] ${p.c} p-6 md:p-8`}><div className="flex items-start justify-between"><span className="label text-ink/55">{p.n}</span><ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></div><h3 className="mt-9 max-w-[310px] text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-[.9] tracking-[-.055em]">{p.t}</h3><p className="mt-4 max-w-[330px] text-[15px] leading-relaxed text-ink-2">{p.d}</p><MiniModule module={p.module} /></Link></Reveal>)}</div></section>
}

function WorkScene() {
  return <section className="mx-auto max-w-[1280px] px-5 pb-20 md:px-10 md:pb-32"><div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-6"><Eyebrow>For the work between the work</Eyebrow><h2 className="mt-5 max-w-[620px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.065em]">A clearer money picture, wherever the day takes you.</h2></div><p className="text-[16px] leading-relaxed text-ink-2 lg:col-span-4 lg:col-start-9">On a client call, at your desk or between projects, Finlancer gives your next decision a little more context.</p></div><div className="relative mt-12 h-[440px] overflow-hidden rounded-[24px] bg-ink md:h-[580px]"><Photo id={PHOTOS.studio} alt="A creative professional working in a bright studio" className="h-full w-full" w={1600} /><div className="absolute inset-0 bg-ink/15" /><Parallax speed={0.09} className="absolute left-4 top-5 md:left-8 md:top-8"><div className="rounded-[14px] bg-paper px-4 py-3 shadow-[0_14px_28px_-16px_rgba(0,0,0,.55)]"><p className="label text-mute">Invoice paid</p><p className="mt-1 text-[18px] font-semibold tnum">+$2,400</p><p className="mt-0.5 text-[11px] text-signal-deep">Acme Studio</p></div></Parallax><Parallax speed={0.16} className="absolute bottom-5 right-4 max-w-[230px] md:bottom-8 md:right-8"><div className="rounded-[14px] bg-paper px-4 py-3 shadow-[0_14px_28px_-16px_rgba(0,0,0,.55)]"><p className="label text-mute">Goal moved</p><p className="mt-1 text-[17px] font-semibold">Studio Upgrade</p><p className="mt-1 text-[12px] text-signal-deep">+$240 from this payment</p></div></Parallax></div></section>
}

function EditorialBreak() {
  return <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-32"><div className="mx-auto max-w-[1280px]"><Eyebrow className="text-signal">Independent work is not a salary</Eyebrow><p className="mt-8 max-w-[1080px] text-[clamp(3.1rem,8vw,7.6rem)] font-semibold leading-[.84] tracking-[-.078em]">Some months are full. Some are quiet. <span className="text-[#ffce31]">Your money needs a system that understands both.</span></p><div className="mt-16 grid gap-6 border-t border-white/15 pt-6 md:grid-cols-3"><p className="text-[14px] leading-relaxed text-paper/65">Income changes. Clients pay differently. Expenses arrive at inconvenient moments.</p><p className="text-[14px] leading-relaxed text-paper/65">Finlancer keeps the connected pieces visible, so the next decision is less of a guess.</p><Link to="/product" className="inline-flex items-center gap-2 self-start text-[14px] font-medium text-signal">Explore the product <ArrowUpRight size={16} /></Link></div></div></section>
}

function Flow() {
  const steps = [['Invoice paid', '+$4,200', 'bg-[#dcecff]'], ['Tax reserve', '$1,050', 'bg-[#fff0cd]'], ['Goal moved', '+$315', 'bg-[#eadfff]'], ['Available now', '$2,835', 'bg-[#d9f5df]']]
  return <section className="bg-[#06132b] px-5 py-20 text-paper md:px-10 md:py-32"><div className="mx-auto max-w-[1280px]"><div className="grid gap-8 lg:grid-cols-12"><div className="lg:col-span-6"><Eyebrow className="text-signal">A payment changes everything</Eyebrow><h2 className="mt-5 max-w-[650px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.065em]">One good payment can do more than sit in your account.</h2></div><p className="self-end text-[16px] leading-relaxed text-paper/65 lg:col-span-4 lg:col-start-9">Finlancer turns one payment into a plan, without requiring you to do the mental accounting.</p></div><div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-white/15 bg-white/15 md:grid-cols-4">{steps.map(([t, n, c], i) => <Reveal key={t} delay={i * 80}><div className="group min-h-[230px] bg-[#0d2143] p-5 transition-colors hover:bg-[#14335f] md:p-6"><span className="label text-paper/45">0{i + 1}</span><div className={`mt-10 h-2 w-16 rounded-full ${c}`} /><p className="mt-6 text-[21px] font-semibold leading-tight tracking-[-.035em]">{t}</p><p className="mt-2 text-[30px] font-semibold tracking-[-.05em] tnum text-[#ffce31]">{n}</p><p className="mt-5 text-[11px] text-paper/50">Updated automatically</p></div></Reveal>)}</div></div></section>
}

function FinalCTA() {
  return <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-32"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><Eyebrow className="text-signal">Built for what is next</Eyebrow><h2 className="mt-5 max-w-[760px] text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[.84] tracking-[-.08em]">Make the next<br /><span className="text-[#ffce31]">good month count.</span></h2></div><Button to="/contact" className="shrink-0" variant="primary">Get started with Finlancer</Button></div></section>
}

export default function Home() { return <><Hero /><ProductGrid /><WorkScene /><EditorialBreak /><Flow /><FinalCTA /></> }
