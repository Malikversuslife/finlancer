import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Phone, OverviewScreen } from '../components/Phone'
import { Button, Eyebrow, Photo, PHOTOS } from '../components/ui'

const areas = [
  ['01', 'Earn', 'See every payment, source and trend in one calm view.', 'bg-signal'],
  ['02', 'Get paid', 'Send invoices, follow progress and know what is due.', 'bg-sky'],
  ['03', 'Prepare', 'Set money aside for tax before it becomes a surprise.', 'bg-amber'],
  ['04', 'Grow', 'Turn a good month into progress on the things that matter.', 'bg-violet'],
]

function Hero() {
  return <section className="relative overflow-hidden bg-[#e8f5ec] pt-16"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-14 pt-14 md:px-10 md:pt-20 lg:grid-cols-12 lg:items-end lg:pb-20"><div className="relative z-10 lg:col-span-7"><Eyebrow className="text-signal-deep">Finlancer for independent work</Eyebrow><h1 className="mt-6 max-w-[760px] text-[clamp(3.3rem,8.3vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-ink">Money that moves<br /><span className="text-signal-deep">with your work.</span></h1><p className="mt-8 max-w-[470px] text-[17px] leading-relaxed text-ink-2">The financial operating system for freelancers. Bring income, invoices, tax and goals into one clear picture.</p><div className="mt-9 flex flex-wrap gap-3"><Button to="/contact">Get started</Button><Button to="/product" variant="secondary">See the product</Button></div></div><div className="relative min-h-[480px] lg:col-span-5 lg:min-h-[620px]"><div className="absolute right-0 top-0 h-[72%] w-[82%] overflow-hidden rounded-[20px]"><Photo id={PHOTOS.studio} alt="A designer working at a desk in a bright studio" className="h-full w-full" w={1000} /></div><div className="absolute bottom-0 left-[4%]"><Phone className="!w-[236px] sm:!w-[270px]"><OverviewScreen /></Phone></div><div className="absolute bottom-[8%] right-0 rounded-[14px] border border-white/70 bg-white/95 p-3 shadow-[0_18px_45px_-25px_rgba(15,52,28,.4)]"><p className="label !text-[9px] text-mute">Available today</p><p className="mt-1 text-[26px] font-semibold tracking-[-0.04em]">$6,840</p><p className="mt-1 text-[11px] text-signal-deep">Up $2,400 this week</p></div></div></div></section>
}

function Problem() {
  return <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28"><div className="mx-auto max-w-[1280px] lg:grid lg:grid-cols-12 lg:gap-10"><Eyebrow className="text-signal lg:col-span-3">The freelancer money problem</Eyebrow><div className="mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0"><p className="max-w-[900px] text-[clamp(2.15rem,5.4vw,5rem)] font-semibold leading-[0.97] tracking-[-0.06em]">A client pays today. Another pays next month. Tax is coming. <span className="text-signal">What is actually yours to spend?</span></p><p className="mt-8 max-w-[550px] text-[16px] leading-relaxed text-paper/65">Finlancer makes the answer visible. Not in another spreadsheet. In the flow of your working day.</p></div></div></section>
}

function System() {
  return <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-32"><div className="max-w-[680px]"><Eyebrow>One connected system</Eyebrow><h2 className="mt-5 text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Built around the way independent work really happens.</h2></div><div className="mt-14 grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-2">{areas.map(([number, title, body, color]) => <div key={title} className="min-h-[220px] bg-paper p-6 md:p-8"><div className="flex items-start justify-between"><span className="label text-mute">{number}</span><span className={`h-3 w-3 rounded-full ${color}`} /></div><h3 className="mt-12 text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]">{title}</h3><p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-ink-2">{body}</p></div>)}</div></section>
}

function Flow() {
  const steps = [['Invoice sent', 'Acme Studio', '$4,200'], ['Payment received', 'Money is available', '+$4,200'], ['Tax reserved', 'Set aside automatically', '$1,050'], ['Goal moved', 'Studio upgrade', '+$315']]
  return <section className="bg-paper-2 px-5 py-20 md:px-10 md:py-32"><div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-5"><Eyebrow>One payment. A clearer picture.</Eyebrow><h2 className="mt-5 text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em]">The work is done. Your money keeps moving.</h2><p className="mt-7 max-w-[430px] text-[16px] leading-relaxed text-ink-2">When an invoice is paid, Finlancer updates what you can spend, what to reserve and what is moving you closer to a goal.</p><Link to="/invoicing" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-signal-deep">Explore invoicing <ArrowUpRight size={16} /></Link></div><div className="overflow-hidden rounded-[18px] border border-line bg-white lg:col-span-6 lg:col-start-7">{steps.map(([title, sub, amount], index) => <div key={title} className="grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-line p-5 last:border-0 md:p-6"><span className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold ${index === 1 ? 'bg-signal text-ink' : 'bg-paper-2 text-ink-2'}`}>{index + 1}</span><div><p className="text-[15px] font-semibold">{title}</p><p className="mt-0.5 text-[12px] text-mute">{sub}</p></div><span className={`text-[15px] font-semibold tnum ${index === 1 || index === 3 ? 'text-signal-deep' : ''}`}>{amount}</span></div>)}</div></div></section>
}

function Intelligence() {
  const notes = ['Your freelance income is above your recent average.', 'Acme Studio usually pays after the due date.', 'Your tax reserve may need adjusting.']
  return <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-32"><div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><Eyebrow>Finlancer Intelligence</Eyebrow><h2 className="mt-5 text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Small signals. Better decisions.</h2></div><div className="lg:col-span-6 lg:col-start-7">{notes.map((note, index) => <div key={note} className="flex gap-4 border-t border-line py-6 last:border-b"><span className="label mt-1 text-mute">0{index + 1}</span><p className="text-[clamp(1.2rem,2vw,1.65rem)] font-semibold leading-snug tracking-[-0.025em]">{note}</p></div>)}<Link to="/intelligence" className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-signal-deep">How Intelligence works <ArrowUpRight size={16} /></Link></div></div></section>
}

function FinalCTA() {
  return <section className="px-5 pb-20 md:px-10 md:pb-32"><div className="mx-auto max-w-[1280px] overflow-hidden rounded-[20px] bg-signal px-6 py-16 md:px-12 md:py-24"><Eyebrow>Built for the work ahead</Eyebrow><h2 className="mt-5 max-w-[850px] text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.87] tracking-[-0.07em]">Your finances should work as hard as you do.</h2><div className="mt-9"><Button to="/contact" variant="dark">Get started with Finlancer</Button></div></div></section>
}

export default function Home() { return <><Hero /><Problem /><System /><Flow /><Intelligence /><FinalCTA /></> }
