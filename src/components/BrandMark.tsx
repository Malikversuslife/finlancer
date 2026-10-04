export function BrandMotif({ className = '', tone = 'blue' }: { className?: string; tone?: 'blue' | 'green' | 'coral' | 'yellow' }) {
  return <div aria-hidden className={`brand-motif brand-motif-${tone} ${className}`}><span /><span /><span /><span /></div>
}
