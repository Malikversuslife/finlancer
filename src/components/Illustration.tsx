import heroArt from '../assets/illustrations/editorial-hero.png'
import invoiceArt from '../assets/illustrations/editorial-invoice.png'
import growthArt from '../assets/illustrations/editorial-growth.png'

type Scene = 'money' | 'invoice' | 'tax' | 'goals' | 'insight' | 'about' | 'resources' | 'pricing'

const artwork: Record<Scene, string> = {
  money: heroArt,
  invoice: invoiceArt,
  tax: growthArt,
  goals: growthArt,
  insight: heroArt,
  about: heroArt,
  resources: invoiceArt,
  pricing: growthArt,
}

export function EditorialIllustration({ scene = 'money', className = '' }: { scene?: Scene; className?: string }) {
  return <div className={`editorial-illustration ${className}`}>
    <span className="editorial-spark editorial-spark-one" aria-hidden />
    <span className="editorial-spark editorial-spark-two" aria-hidden />
    <img src={artwork[scene]} alt="" loading="lazy" decoding="async" className="relative z-10 h-auto w-full object-contain" />
  </div>
}
