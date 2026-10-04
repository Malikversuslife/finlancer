import { Check } from 'lucide-react'
import { Button, Eyebrow, Reveal } from '../components/ui'

const INCLUDED = ['Income and expense tracking', 'Invoices, clients and payment links', 'Tax reserves, deductions and documents', 'Goals with automatic contributions', 'Finlancer Intelligence throughout']

export default function Pricing() {
  return (
    <div className="product-shell">
      <section className="mx-auto grid max-w-[1280px] gap-8 px-5 pb-16 pt-32 md:px-10 md:pt-40 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8"><Eyebrow>Pricing</Eyebrow>
        <h1 className="mt-6 max-w-[900px] text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">Choose the experience that fits.</h1>
        <p className="mt-8 max-w-[520px] text-[17px] leading-relaxed text-paper/65">We're finalising pricing. We won't split the product into artificial tiers: the plans below show the structure we're working towards, and prices will appear here once they're decided.</p></div>
        <div className="relative mx-auto min-h-[270px] w-full max-w-[340px] overflow-hidden rounded-[24px] bg-ink lg:col-span-4"><span className="absolute -right-9 -top-8 h-40 w-40 rounded-full border-[26px] border-signal" /><span className="absolute bottom-[-30px] left-[16%] h-32 w-32 rotate-12 bg-[#ffce31]" /><p className="absolute bottom-6 left-6 max-w-[200px] text-[26px] font-semibold leading-[.9] tracking-[-.05em] text-paper">One complete product. No artificial tiers.</p></div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 pb-28 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/15 bg-white/15 lg:grid-cols-2">
          {[{ n: 'Finlancer', s: 'Billed monthly', d: 'The complete product, month to month.' }, { n: 'Finlancer', s: 'Billed annually', d: 'The complete product, paid once a year.' }].map((p, i) => (
            <Reveal key={p.s} delay={i * 80} className="interactive-card bg-paper p-8 text-ink md:p-12">
              <p className="label text-mute">{p.s}</p>
              <p className="mt-4 text-[28px] font-medium tracking-[-0.03em]">{p.n}</p>
              <p className="mt-1 text-[15px] text-ink-2">{p.d}</p>
              <div className="mt-10 flex items-baseline gap-3">
                <span className="text-[64px] font-semibold leading-none tracking-[-0.05em] text-mute/40">$ ––</span>
                <span className="rounded-full border border-dashed border-mute/50 px-2.5 py-0.5 text-[11px] text-mute">Price to be confirmed</span>
              </div>
              <ul className="mt-10 space-y-3">{INCLUDED.map(f => <li key={f} className="flex gap-3 text-[15px]"><Check size={16} strokeWidth={2} className="mt-0.5 text-signal-deep" />{f}</li>)}</ul>
              <Button to="/contact" variant={i ? 'primary' : 'secondary'} className="mt-10">Join the waitlist</Button>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <p className="label text-paper/45 md:col-span-3">Open decisions</p>
          <div className="md:col-span-8">
            {[['Trial period', 'Length to be confirmed.'], ['Annual saving', 'To be confirmed.'], ['Regional pricing', 'To be confirmed.'], ['Teams or accountants', 'Under consideration. Not part of launch.']].map(([a, b]) => (
              <div key={a} className="flex justify-between gap-6 border-t border-white/15 py-4 text-[15px]"><span>{a}</span><span className="text-paper/50">{b}</span></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
