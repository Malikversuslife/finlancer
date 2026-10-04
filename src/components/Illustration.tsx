type Scene = 'money' | 'invoice' | 'tax' | 'goals' | 'insight' | 'about' | 'resources' | 'pricing'

const palettes: Record<Scene, string> = {
  money: 'color-scene-mint', invoice: 'color-scene-coral', tax: 'color-scene-amber', goals: 'color-scene-violet',
  insight: 'color-scene-sky', about: 'color-scene-green', resources: 'color-scene-blue', pricing: 'color-scene-dark',
}

export function EditorialIllustration({ scene = 'money', className = '' }: { scene?: Scene; className?: string }) {
  return <div aria-hidden className={`color-scene ${palettes[scene]} ${className}`}>
    <div className="color-orbit color-orbit-a" />
    <div className="color-orbit color-orbit-b" />
    <div className="color-card color-card-back" />
    <div className="color-card color-card-front"><span /><span /><span /></div>
    <div className="color-dot color-dot-a" /><div className="color-dot color-dot-b" />
    <div className="color-stripe" />
  </div>
}
