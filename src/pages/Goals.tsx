import { Phone, GoalsScreen, GOALS } from '../components/Phone'
import { PageHero, SectionHead, Reveal, money, useInView } from '../components/ui'
import { GoalsStory, GoalCreateStory, FinalCTA, PhotoBand } from '../components/Stories'
import { PHOTOS } from '../components/ui'

function GoalList() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-28 md:px-10">
      <SectionHead eyebrow="Goal activity" title="Each goal knows where it stands." />
      <div ref={ref} className="mt-12 border-t border-ink">
        {GOALS.map((g, i) => {
          const pct = Math.round((g.saved / g.target) * 100)
          return (
            <div key={g.name} className="grid items-center gap-3 border-b border-line py-6 md:grid-cols-12">
              <p className="text-[20px] font-medium md:col-span-3">{g.name}</p>
              <div className="md:col-span-5"><div className="h-1.5 bg-stone"><div className={`h-full ${g.color} transition-[width] duration-1000 ease-out`} style={{ width: inView ? `${pct}%` : 0, transitionDelay: `${i * 90}ms` }} /></div></div>
              <p className="text-[14px] tnum md:col-span-2"><span>{money(g.saved)}</span><span className="text-mute"> / {money(g.target)}</span></p>
              <p className="text-[13px] text-mute md:col-span-2 md:text-right">Target {g.date}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[['Percentage of income', 'A share of every payment, so goals grow with good months.'], ['Automatic', 'A fixed amount on a schedule you set.'], ['Manual', 'Top up whenever you choose.']].map(([t, d]) => <Reveal key={t}><p className="text-[17px]">{t}</p><p className="mt-2 text-[14px] leading-relaxed text-mute">{d}</p></Reveal>)}
      </div>
    </section>
  )
}

export default function Goals() {
  return (
    <>
      <PageHero eyebrow="Goals" title={<>Give your money<br />somewhere to go.</>} body="Targets, dates and contributions that fit irregular income. Finlancer projects completion from how you actually earn.">
        <div className="flex justify-center lg:justify-end"><Phone><GoalsScreen /></Phone></div>
      </PageHero>
      <GoalCreateStory />
      <GoalList />
      <PhotoBand id={PHOTOS.studio2} alt="A calm room with plants, a desk and an armchair" caption="A better studio, a slower month off, a safety net. Whatever it is, give it a number and a date." />
      <div className="h-16" />
      <GoalsStory />
      <FinalCTA />
    </>
  )
}
