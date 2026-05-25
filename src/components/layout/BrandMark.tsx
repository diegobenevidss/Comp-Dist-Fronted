type BrandMarkProps = {
  contrast?: boolean;
};

export function BrandMark({ contrast = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={['flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft', contrast ? 'bg-white' : 'bg-ember'].join(' ')}>
        <span className={['text-lg font-black', contrast ? 'text-emberStrong' : 'text-white'].join(' ')}>H</span>
      </div>
      <div>
        <div className={['text-xs font-bold uppercase tracking-[0.28em]', contrast ? 'text-white/70' : 'text-clay'].join(' ')}>HealthSys</div>
        <div className={['text-lg font-black', contrast ? 'text-white' : 'text-ink'].join(' ')}>Distribuido</div>
      </div>
    </div>
  );
}
