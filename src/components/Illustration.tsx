type Scene = 'money' | 'invoice' | 'tax' | 'goals' | 'insight' | 'about' | 'resources' | 'pricing'

const palette: Record<Scene, { a: string; b: string; c: string; d: string }> = {
  money: { a: '#1677ff', b: '#ffce31', c: '#1ca652', d: '#ff705e' },
  invoice: { a: '#ff705e', b: '#1677ff', c: '#ffce31', d: '#7e55dc' },
  tax: { a: '#ff9f0a', b: '#1ca652', c: '#1677ff', d: '#ff705e' },
  goals: { a: '#7e55dc', b: '#ff705e', c: '#ffce31', d: '#1ca652' },
  insight: { a: '#1ca652', b: '#1677ff', c: '#ffce31', d: '#7e55dc' },
  about: { a: '#ff705e', b: '#1ca652', c: '#1677ff', d: '#ffce31' },
  resources: { a: '#1677ff', b: '#ffce31', c: '#ff705e', d: '#1ca652' },
  pricing: { a: '#1ca652', b: '#7e55dc', c: '#ffce31', d: '#ff705e' },
}

export function EditorialIllustration({ scene = 'money', className = '' }: { scene?: Scene; className?: string }) {
  const p = palette[scene]
  return <svg viewBox="0 0 560 460" role="img" aria-label="Colorful Finlancer illustration" className={`vector-art ${className}`}>
    <path className="vector-stroke" d="M58 255C85 111 238 81 320 166c80 83 143 44 184-33" fill="none" stroke={p.c} strokeWidth="18" strokeLinecap="round" />
    <circle className="vector-float vector-one" cx="99" cy="105" r="34" fill={p.b} />
    <path className="vector-float vector-two" d="M437 76l19 35 39 7-28 28 6 39-36-18-35 18 7-39-29-28 40-7z" fill={p.d} />
    <rect x="95" y="163" width="238" height="184" rx="28" fill="#fdfbf4" stroke="#1d1d1f" strokeWidth="7" />
    <path d="M125 208h114M125 239h163M125 270h92" stroke={p.a} strokeWidth="14" strokeLinecap="round" />
    <rect x="125" y="298" width="72" height="18" rx="9" fill={p.d} />
    <circle cx="276" cy="304" r="22" fill={p.c} />
    <path d="M275 293v21m-10-10h21" stroke="#fdfbf4" strokeWidth="5" strokeLinecap="round" />
    <path className="vector-bob" d="M324 343c0-74 60-133 134-133s134 59 134 133v33H324z" fill={p.a} />
    <circle cx="458" cy="301" r="57" fill="#fdfbf4" />
    <path d="M458 256v45l31 17" fill="none" stroke="#1d1d1f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M389 382h139" stroke="#1d1d1f" strokeWidth="7" strokeLinecap="round" />
    <path d="M190 375c14-45 69-47 83-2" fill={p.d} stroke="#1d1d1f" strokeWidth="7" strokeLinecap="round" />
    <circle cx="124" cy="365" r="24" fill={p.b} stroke="#1d1d1f" strokeWidth="7" />
  </svg>
}
