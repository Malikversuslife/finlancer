import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow, Photo, PHOTOS, Reveal } from '../components/ui'

const FINANCE = [
  ['Pricing a project when your income is uneven', '8 min'],
  ['A simple way to think about tax reserves', '6 min'],
  ['Separating personal and business money', '7 min'],
  ['How to build an emergency fund on variable income', '9 min'],
]
const GUIDES = [['01', 'Your first invoice in Finlancer'], ['02', 'Setting up a tax reserve percentage'], ['03', 'Creating a goal that fills itself'], ['04', 'Reading your available money']]
const UPDATES = [['Oct 2026', 'Payment links on every invoice'], ['Sep 2026', 'Client payment history'], ['Aug 2026', 'Goal projections']]

export default function Resources() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-32 md:px-10 md:pt-40">
        <Eyebrow>Resources</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">Notes on the money<br /><span className="text-mute">side of independent work.</span></h1>
        <nav className="mt-10 flex flex-wrap gap-2 text-[14px]">
          {[['#guides', 'Guides'], ['#finance', 'Freelancer Finance'], ['#updates', 'Product Updates'], ['/help', 'Help Centre']].map(([h, l]) => <a key={l} href={h} className="rounded-full border border-line px-4 py-2 hover:border-ink">{l}</a>)}
        </nav>
      </section>

      <section id="finance" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <a href="#finance" className="interactive-card group block rounded-[24px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink"><Photo id={PHOTOS.homeDesk} alt="A calm home workspace for independent work" className="h-full w-full" w={1200} /><div className="absolute inset-0 bg-[#06132b]/45" /><p className="absolute bottom-6 left-6 z-10 max-w-[280px] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[.9] tracking-[-.055em] text-paper">Freelance money, explained clearly.</p></div>
              <p className="label mt-6 text-signal-deep">Freelancer Finance · Feature</p>
              <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.035em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">The quiet month: planning for the gaps between projects</h2>
              <p className="mt-3 max-w-[540px] text-[15px] leading-relaxed text-ink-2">Every independent career has slow stretches. A practical look at preparing for them without living in fear of them.</p>
            </a>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label text-mute">Freelancer Finance</p>
            <ol className="mt-4">
              {FINANCE.map(([t, m], i) => (
                <li key={t}><a href="#finance" className="group flex gap-5 border-t border-line py-5">
                  <span className="label tnum text-mute">0{i + 1}</span>
                  <span className="flex-1"><span className="block text-[17px] leading-snug group-hover:text-signal-deep">{t}</span><span className="text-[12px] text-mute">{m} read</span></span>
                </a></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="guides" className="scroll-mt-24 bg-paper-2 py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="label text-mute">Guides</p><h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.035em]">Get the most from Finlancer.</h2></div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {GUIDES.map(([n, t]) => (
                <li key={n}><Link to="/help" className="accent-line group flex items-center gap-6 border-t border-line py-5 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold">
                  <span className="label text-mute">{n}</span><span className="flex-1">{t}</span><ArrowUpRight size={18} strokeWidth={1.9} className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="updates" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-24 md:px-10">
        <p className="label text-mute">Product Updates</p>
        <div className="mt-6 grid gap-px bg-line md:grid-cols-3">
          {UPDATES.map(([d, t]) => <div key={t} className="interactive-card bg-paper py-6 md:pr-8"><p className="label tnum text-signal-deep">{d}</p><p className="mt-3 text-[20px] font-medium leading-snug">{t}</p></div>)}
        </div>
        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-ink pt-10 md:flex-row md:items-end">
          <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">Looking for an answer?</h3>
          <Link to="/help" className="group inline-flex items-center gap-2 text-[15px] text-signal-deep">Visit the Help Centre <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" /></Link>
        </div>
      </section>
    </>
  )
}
