export default function HeroFallback({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)',
          left: '5%',
          top: '10%',
          animation: reduce ? 'none' : 'blob-1 14s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #E8C46B 0%, transparent 70%)',
          right: '5%',
          top: '5%',
          animation: reduce ? 'none' : 'blob-2 18s ease-in-out infinite',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #B87A2E 0%, transparent 70%)',
          right: '20%',
          bottom: '15%',
          animation: reduce ? 'none' : 'blob-3 12s ease-in-out infinite',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #C99A3E 0%, transparent 70%)',
          left: '30%',
          bottom: '5%',
          animation: reduce ? 'none' : 'blob-4 16s ease-in-out infinite',
          filter: 'blur(75px)',
        }}
      />
    </div>
  );
}
