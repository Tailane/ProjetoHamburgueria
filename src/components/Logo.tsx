export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-1">
        <span className={`text-3xl italic ${variant === 'light' ? 'text-white' : 'text-black'}`}>
          La
        </span>
        <span className="text-3xl italic text-red-600">Ville</span>
      </div>
      <div className={`text-xs tracking-widest ${variant === 'light' ? 'text-white' : 'text-gray-600'}`}>
        LOGIN
      </div>
    </div>
  );
}
