import { Eyebrow, Reveal } from '../components/ui'
import { FinalCTA } from '../components/Stories'

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pb-20 pt-32 md:px-10 md:pt-40">
        <Eyebrow>About Finlancer</Eyebrow>
        <h1 className="mt-6 max-w-[1000px] text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">Independent work creates a different relationship with money.</h1>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-ink p-7 text-paper md:p-12">
          <div className="absolute -right-12 -top-12 h-60 w-60 rounded-full border-[34px] border-signal" /><div className="absolute bottom-[-85px] left-[10%] h-52 w-52 rotate-12 bg-[#ffce31]" />
          <p className="relative z-10 max-w-[690px] text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[.86] tracking-[-.07em]">Independent work does not move in a straight line.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-28 md:px-10 lg:grid-cols-12">
        <div className="space-y-2 text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-[1.25] tracking-[-0.025em] lg:col-span-6">
          {['Income changes.', 'Clients pay differently.', 'Personal and professional finances overlap.', 'Tax requires preparation.', 'Goals still matter.'].map((l, i) => <Reveal key={l} delay={i * 80}><p>{l}</p></Reveal>)}
        </div>
        <div className="space-y-6 text-[16px] leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-8">
          <p>Most financial tools assume a salary: the same amount, on the same day, from the same place. Independent professionals don't live that way, and their tools shouldn't pretend they do.</p>
          <p>Finlancer is built around that reality. It connects the work you invoice to the money you receive, the tax you'll owe and the things you're saving for, in one mobile app that fits between the work itself.</p>
          <p className="text-ink">We're building it for designers, photographers, developers, consultants, writers and everyone else who chose to work for themselves.</p>
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
