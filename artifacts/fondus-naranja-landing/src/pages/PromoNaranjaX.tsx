import React from 'react';
import { Star } from 'lucide-react';

interface PromoNaranjaXProps {
  onStartFunnel?: () => void;
}

export default function PromoNaranjaX({ onStartFunnel }: PromoNaranjaXProps) {
  const handleCtaClick = () => {
    if (onStartFunnel) {
      onStartFunnel();
    } else {
      const url = new URL(window.location.href);
      url.searchParams.set('promo', 'naranja');
      window.location.href = url.toString();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#1d497f] via-[#2c6199] to-[#93c46d] overflow-x-hidden text-slate-800 antialiased font-sans">
      
      {/* 2. Sección Superior (Hero y Confianza) */}
      <header className="w-full max-w-md pt-10 pb-6 px-6 flex flex-col items-center text-center">
        {/* Logotipo Fondus blanco con isotipo de estrella */}
        <div className="flex flex-col items-center gap-2 select-none" data-testid="brand-logo-fondus">
          {/* Isotipo Estrella Fondus (8 puntas redondeadas) */}
          <svg
            className="w-14 h-14 text-white drop-shadow-sm"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          >
            <line x1="50" y1="12" x2="50" y2="88" />
            <line x1="12" y1="50" x2="88" y2="50" />
            <line x1="23" y1="23" x2="77" y2="77" />
            <line x1="23" y1="77" x2="77" y2="23" />
          </svg>

          {/* Nombre Fondus */}
          <span className="text-4xl font-extrabold tracking-tight text-white leading-none">
            fondus
          </span>

          {/* Eslogan en letras mayúsculas pequeñas y espaciadas */}
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/90 uppercase mt-1">
            EL PODER DE TUS AHORROS
          </span>
        </div>

        {/* Insignia Google Rating */}
        <div className="mt-8">
          <div
            className="bg-white rounded-full shadow-lg px-5 py-2.5 flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
            data-testid="badge-google-rating-top"
          >
            {/* Logo 'G' de Google Oficial SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.09 3.66-5.17 3.66-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>

            <span className="text-xs font-medium text-slate-700">Google rating</span>
            <span className="text-sm font-extrabold text-slate-900">4,9</span>

            {/* 5 Estrellas Doradas */}
            <div className="flex gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Texto de Autoridad */}
        <p className="mt-5 text-sm sm:text-base font-light text-white leading-snug max-w-xs">
          La empresa de <span className="italic">capitalización y ahorro</span>{' '}
          <strong className="font-extrabold text-white">mejor calificada</strong> de Argentina
        </p>
      </header>

      {/* 3. Sección Central (Beneficios Naranja X con Píldoras y Tarjeta) */}
      <section className="w-full max-w-md px-6 relative my-auto py-2">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-2">
          {/* Píldoras de Beneficio (Izquierda) */}
          <div className="flex flex-col gap-3.5 z-10">
            {/* Píldora 1 */}
            <div
              className="bg-white rounded-full shadow-xl py-3 px-4 text-center border border-white/40 transition-transform hover:-translate-y-0.5"
              data-testid="pill-debito-automatico"
            >
              <p className="m-0 text-xs font-medium text-slate-600">Te adherís al</p>
              <p className="m-0 text-sm sm:text-base font-black text-[#e85d04] leading-tight">
                débito automático
              </p>
            </div>

            {/* Píldora 2 */}
            <div
              className="bg-white rounded-full shadow-xl py-3 px-4 text-center border border-white/40 transition-transform hover:-translate-y-0.5"
              data-testid="pill-cuota-bonificada"
            >
              <p className="m-0 text-xs font-medium text-slate-600">Te bonificamos la</p>
              <p className="m-0 text-xs sm:text-[14px] font-black text-[#2b1b54] leading-tight">
                cuota de suscripción
              </p>
            </div>
          </div>

          {/* Tarjeta Naranja X con Mano (Derecha) */}
          <div className="relative flex justify-center items-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/tarjeta-naranjax.png`}
              alt="Tarjeta de crédito Naranja X sostenida por una mano"
              className="w-full max-w-[190px] object-contain drop-shadow-2xl -mr-3"
              data-testid="img-naranjax-card"
            />
          </div>
        </div>
      </section>

      {/* 4. Tarjeta Inferior (Sorteo Moto 0KM - Estilo Bottom Sheet) */}
      <footer className="w-full max-w-md bg-white rounded-t-[3rem] pt-8 pb-10 px-7 sm:px-8 flex flex-col items-center text-center shadow-[0_-15px_40px_rgba(0,0,0,0.18)] mt-6">
        
        {/* Encabezado Tarjeta: Naranja X | fondus */}
        <div className="flex items-center gap-2 select-none mb-5" data-testid="header-sheet-brands">
          <span className="text-xl font-black text-[#ff5a00]">
            Naranja<span className="text-[#2b1b54]">X</span>
          </span>
          <span className="text-slate-300 font-light text-lg">|</span>
          <span className="text-xl font-black text-[#1d497f]">fondus</span>
        </div>

        {/* Oferta Principal: Texto + Imagen Scooter */}
        <div className="w-full grid grid-cols-[1.1fr_0.9fr] items-center gap-2 my-2 text-left">
          <div>
            <p className="m-0 text-xs sm:text-sm font-normal text-slate-700 leading-tight">
              Y automáticamente <br />
              <span className="italic font-medium">participás</span> por el
            </p>
            <p className="m-0 mt-1 text-base sm:text-lg font-black text-[#1d497f] leading-snug uppercase tracking-tight">
              SORTEO DE UNA <br />
              MOTO 0KM
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/moto-scooter.png`}
              alt="Moto scooter 0KM color gris"
              className="w-full max-w-[160px] object-contain drop-shadow-lg"
              data-testid="img-moto-scooter"
            />
          </div>
        </div>

        {/* Cierre de Tarjeta */}
        <p className="mt-4 text-xs sm:text-sm font-normal text-slate-700 leading-relaxed max-w-xs">
          Formá parte de la <strong className="font-extrabold text-[#1d497f]">mejor empresa</strong> <br />
          de <strong className="font-extrabold text-[#1d497f]">capitalización y ahorro</strong>
        </p>

        {/* Insignia Google Rating Repetida */}
        <div className="mt-4">
          <div
            className="bg-slate-50 border border-slate-200 rounded-full shadow-sm px-4 py-2 flex items-center gap-2"
            data-testid="badge-google-rating-bottom"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.09 3.66-5.17 3.66-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span className="text-[11px] font-medium text-slate-700">Google rating</span>
            <span className="text-xs font-bold text-slate-900">4,9</span>
            <div className="flex gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* 5. Botón de Acción (Call to Action - CRÍTICO) */}
        <div className="w-full mt-6">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full bg-[#93c46d] hover:bg-[#82b25c] text-white font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-green-600/25 active:scale-[0.98] transition-all text-base sm:text-lg flex items-center justify-center gap-2 group cursor-pointer"
            data-testid="button-adherirme-naranjax"
          >
            <span>¡Adherirme ahora con Naranja X!</span>
          </button>
        </div>

        {/* Logotipo Fondus azul en la base */}
        <div className="mt-6 flex flex-col items-center gap-1 select-none opacity-90" data-testid="footer-logo-fondus">
          <span className="text-2xl font-black text-[#1d497f] tracking-tight">
            fondus
          </span>
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#1d497f]/70 uppercase">
            EL PODER DE TUS AHORROS
          </span>
        </div>

        {/* Micro-legales de pie */}
        <div className="mt-5 text-[10px] text-slate-400 text-center">
          Planes autorizados por IGJ N° Res. 289/11
        </div>
      </footer>
    </div>
  );
}
