import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button, Eyebrow } from '../components/ui'
import { EditorialIllustration } from '../components/Illustration'

const chapters = [
  ['01', 'See it', 'Every payment, project and money move in one cheerful place.', 'bg-sky'],
  ['02', 'Send it', 'Create invoices that feel as polished as the work you deliver.', 'bg-amber'],
  ['03', 'Save it', 'Put tax and goals aside while your money is still fresh.', 'bg-violet'],
  ['04', 'Grow it', 'Use the good months to build the freelance life you want.', 'bg-[#ff8d7d]'],
]

function Hero() {
  return <section className="relative overflow-hidden bg-[#e8f5ec] px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24"><div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-12 lg:items-center"><div className="relative z-10 lg:col-span-7"><Eyebrow className="text-signal-deep">A finance app for freelancers</Eyebrow><h1 className="mt-6 max-w-[760px] text-[clamp(3.5rem,8.4vw,7.7rem)] font-semibold leading-[0.86] tracking-[-0.078em] text-ink">Make money<br />feel <span className="text-signal-deep">lighter.</span></h1><p className="mt-8 max-w-[470px] text-[17px] leading-relaxed text-ink-2">Finlancer brings income, invoices, tax and goals together so you can make more room for the work you love.</p><div className="mt-9 flex flex-wrap gap-3"><Button to="/contact">Join the waitlist</Button><Button to="/product" variant="secondary">Explore the app</Button></div><div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-medium text-ink-2"><span>Income, without the guessing</span><span>Invoices, without the chase</span><span>Goals, with a little joy</span></div></div><div className="relative mx-auto w-full max-w-[570px] lg:col-span-5 lg:max-w-none"><div className="absolute inset-[12%] -z-0 rounded-full bg-[#bce8cf]" /><EditorialIllustration scene="money" className="relative z-10 max-h-[620px]" /></div></div></section>
}

function Problem() {
  return <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28"><div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-12 lg:gap-10"><Eyebrow className="text-signal lg:col-span-3">Made for irregular income</Eyebrow><div className="lg:col-span-8 lg:col-start-5"><p className="max-w-[900px] text-[clamp(2.25rem,5.4vw,5rem)] font-semibold leading-[0.97] tracking-[-0.06em]">A client pays today. Another pays later. Tax is coming. <span className="text-signal">Your money should still make sense.</span></p><p className="mt-8 max-w-[540px] text-[16px] leading-relaxed text-paper/65">Finlancer turns the messy middle of freelance money into a friendly, useful picture you can act on.</p></div></div></section>
}

function Chapters() {
  return <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-32"><div className="max-w-[700px]"><Eyebrow>A more colourful money routine</Eyebrow><h2 className="mt-5 text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.064em]">Everything you need, without making it feel like homework.</h2></div><div className="mt-14 grid gap-4 sm:grid-cols-2">{chapters.map(([number, title, body, color]) => <article key={title} className="min-h-[245px] overflow-hidden rounded-[20px] bg-paper-2 p-6 md:p-8"><div className="flex items-start justify-between"><span className="label text-mute">{number}</span><span className={`h-5 w-5 rounded-full ${color}`} /></div><div className="mt-16"><h3 className="text-[clamp(2.15rem,3.5vw,3.7rem)] font-semibold leading-none tracking-[-0.055em]">{title}</h3><p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-ink-2">{body}</p></div></article>)}</div></section>
}

function Flow() {
  return <section className="overflow-hidden bg-[#fff3d7] px-5 py-20 md:px-10 md:py-32"><div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-5"><Eyebrow>One payment. More possibility.</Eyebrow><h2 className="mt-5 text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.064em]">Your money can know where to go next.</h2><p className="mt-7 max-w-[440px] text-[16px] leading-relaxed text-ink-2">When an invoice is paid, Finlancer helps you see what is ready to spend, what belongs to tax and what can move towards a goal.</p><Link to="/invoicing" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-signal-deep">Explore invoicing <ArrowUpRight size={16} /></Link></div><div className="relative mx-auto w-full max-w-[640px] lg:col-span-6 lg:col-start-7"><EditorialIllustration scene="invoice" /></div></div></section>
}

function Intelligence() {
  const notes = ['Notice when your income is trending up.', 'Spot clients who usually pay after the due date.', 'Adjust your tax reserve before it becomes a rush.']
  return <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-32"><div className="grid gap-10 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-5"><Eyebrow>Small signals, better decisions</Eyebrow><h2 className="mt-5 text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.064em]">A money guide that feels on your side.</h2><EditorialIllustration scene="insight" className="mt-8 max-w-[480px]" /></div><div className="lg:col-span-6 lg:col-start-7">{notes.map((note, index) => <div key={note} className="flex gap-4 border-t border-line py-7 last:border-b"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal text-[11px] font-semibold">0{index + 1}</span><p className="pt-1 text-[clamp(1.2rem,2vw,1.65rem)] font-semibold leading-snug tracking-[-0.025em]">{note}</p></div>)}<Link to="/intelligence" className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-signal-deep">Meet Finlancer Intelligence <ArrowUpRight size={16} /></Link></div></div></section>
}

function FinalCTA() {
  return <section className="px-5 pb-20 md:px-10 md:pb-32"><div className="mx-auto overflow-hidden rounded-[20px] bg-signal px-6 py-16 md:px-12 md:py-24"><Eyebrow>Built for the work ahead</Eyebrow><h2 className="mt-5 max-w-[860px] text-[clamp(3.1rem,6vw,6rem)] font-semibold leading-[0.87] tracking-[-0.072em]">Make your next good month count.</h2><p className="mt-6 max-w-[490px] text-[17px] leading-relaxed text-ink-2">A more generous financial life starts with a clearer view of the one you have now.</p><div className="mt-9"><Button to="/contact" variant="dark">Get started with Finlancer</Button></div></div></section>
}

export default function Home() { return <><Hero /><Problem /><Chapters /><Flow /><Intelligence /><FinalCTA /></> }
