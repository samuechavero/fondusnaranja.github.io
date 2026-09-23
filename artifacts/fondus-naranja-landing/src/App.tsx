import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, CircleHelp, Download, FileText, Gift, LockKeyhole, Mail, MessageCircle, ShieldCheck, Sparkles, Star, Trophy, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Plan = {
  id: string;
  title: string;
  capital: string;
  first: string;
  regular: string;
  eyebrow: string;
  featured?: boolean;
};

const plans: Plan[] = [
  { id: 'inicio', title: 'Ideal para empezar', capital: '$7.500.000', first: '$43.800', regular: '$25.875', eyebrow: 'Para dar el primer paso' },
  { id: 'elegido', title: 'El más elegido', capital: '$10.000.000', first: '$58.400', regular: '$34.500', eyebrow: 'El equilibrio que más eligen', featured: true },
  { id: 'mayor', title: 'Mayor capital', capital: '$20.000.000', first: '$116.800', regular: '$69.000', eyebrow: 'Para ir por más' },
];

const socialProof = [
  ['Martín G.', 'Córdoba', '$10.000.000'],
  ['Valeria R.', 'Mendoza', '$20.000.000'],
  ['Luciano P.', 'Rosario', '$7.500.000'],
  ['Agustina M.', 'Buenos Aires', 'Auto 0KM'],
];

function LogoLockup() {
  return (
    <div className="flex items-center gap-3" data-testid="brand-lockup">
      <span className="display text-[1.55rem] font-extrabold tracking-[-.07em] text-[#f3f4ee]">fondus</span>
      <span className="h-7 w-px bg-white/25" />
      <span className="display text-[1.25rem] font-extrabold tracking-[-.06em] text-[#ff6a12]">Naranja<span className="text-[#f3f4ee]">X</span></span>
    </div>
  );
}

function StepHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
      <div className="shrink-0">
        <LogoLockup />
      </div>
      <div className="hidden items-center gap-2 sm:flex" aria-label={`Paso ${step} de 5`} data-testid="step-progress">
        {[1, 2, 3, 4, 5].map((item) => <span key={item} className={`h-1.5 w-8 rounded-full transition-colors ${item <= step ? 'bg-[#ff5a00]' : 'bg-white/20'}`} />)}
        <span className="ml-2 text-xs font-semibold tracking-[.14em] text-white/55">0{step} / 05</span>
      </div>
      {step > 1 ? <button type="button" onClick={onBack} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white" data-testid="button-back"><ArrowLeft size={16} /> Volver</button> : <span className="max-w-[9.5rem] text-right text-[10px] font-semibold leading-[1.15] tracking-[.08em] text-white/55 sm:max-w-none sm:text-xs sm:tracking-[.1em]">UNA DECISIÓN, UN NUEVO COMIENZO</span>}
    </header>
  );
}

function SocialProof() {
  const [notice, setNotice] = useState<string | null>(null);
  const [side, setSide] = useState<'left' | 'right'>('left');
  useEffect(() => {
    let index = 0;
    const show = () => {
      const item = socialProof[index % socialProof.length];
      index += 1;
      setSide(index % 2 ? 'left' : 'right');
      setNotice(`${item[0]} de ${item[1]} se acaba de adherir al plan de ${item[2]}`);
       window.setTimeout(() => setNotice(null), 2400);
    };
     const interval = window.setInterval(show, 3000);
    const initial = window.setTimeout(show, 4800);
    return () => { window.clearInterval(interval); window.clearTimeout(initial); };
  }, []);
  if (!notice) return null;
  return <div className={`fixed bottom-4 z-30 w-[calc(100%-2rem)] max-w-[310px] animate-[fadeUp_.55s_ease-out] ${side === 'left' ? 'left-4' : 'right-4'}`} data-testid="social-proof">
    <div className="glass flex items-start gap-3 rounded-2xl p-3.5 shadow-2xl">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/15 text-[#ff8751]"><BadgeCheck size={17} /></span>
      <p className="m-0 text-xs leading-5 text-white/85">{notice}</p>
      <button type="button" className="ml-auto text-white/45 hover:text-white" onClick={() => setNotice(null)} aria-label="Cerrar notificación" data-testid="button-close-social"><X size={14} /></button>
    </div>
  </div>;
}

function Hero({ onStart }: { onStart: () => void }) {
  return <div className="min-h-[100dvh]">
    <StepHeader step={1} onBack={() => undefined} />
    <main className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-8 sm:px-8 md:pt-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20 lg:px-10 lg:pb-24">
      <div className="fade-up">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#83bea3]/35 bg-[#83bea3]/10 px-3.5 py-2 text-xs font-bold text-[#a6d2b9]" data-testid="badge-rating"><Star size={14} fill="currentColor" /> Google rating 4,9 <span className="flex gap-0.5 text-[#ffb537]" aria-label="5 estrellas">{[1, 2, 3, 4, 5].map((item) => <Star key={item} size={12} fill="currentColor" />)}</span></div>
        <p className="mb-4 text-sm font-bold uppercase tracking-[.18em] text-[#ff7b35]">Una alianza para mirar hacia adelante</p>
        <h1 className="display max-w-2xl text-5xl font-extrabold leading-[.98] tracking-[-.06em] text-[#f4f4ee] sm:text-7xl">Con <span className="text-[#ff6a12]">FONDUS</span><br />y Naranja X<br /><span className="text-[#a6d2b9]">vas a poder.</span></h1>
        <p className="mt-7 max-w-md text-lg leading-8 text-white/65">En dos minutos te explicamos todo. Elegí tu plan, conocé tus beneficios y empezá a construir eso que te importa.</p>
        <button type="button" onClick={onStart} className="cta-pulse mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-[#ff5a00] px-7 py-4 text-sm font-extrabold tracking-[.1em] text-[#1a2030] shadow-[0_12px_35px_rgba(255,90,0,.27)] transition-transform hover:scale-[1.02] sm:w-auto" data-testid="button-start">INICIAR SIMULACIÓN <ArrowRight size={18} /></button>
        <div className="mt-7 flex items-center gap-5 text-xs text-white/48"><span className="flex items-center gap-2"><LockKeyhole size={14} className="text-[#a6d2b9]" /> 100% online</span><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#a6d2b9]" /> Sin compromiso</span></div>
      </div>
      <div className="relative fade-up fade-up-delay-2">
        <div className="absolute -inset-10 rounded-full bg-[#ff5a00]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#eaf0ed] shadow-2xl">
          <img src="/assets/WhatsApp_Image_2026-09-10_at_12.28.22_PM_1790143148151.jpeg" alt="Promoción Fondus y Naranja X por el sorteo de una moto 0KM" className="block aspect-[9/13] w-full object-cover object-top sm:aspect-[9/11] lg:aspect-[9/12]" data-testid="img-hero-campaign" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[#132340]/90 px-4 py-3 backdrop-blur-md">
            <div><p className="m-0 text-[10px] font-bold uppercase tracking-[.18em] text-[#a6d2b9]">Beneficio exclusivo</p><p className="m-0 mt-1 text-sm font-semibold text-white">Cuota de suscripción bonificada</p></div>
            <Gift size={25} className="text-[#ff6a12]" />
          </div>
        </div>
        <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/15 bg-[#243653] px-4 py-3 shadow-xl sm:block"><p className="m-0 text-[10px] uppercase tracking-[.15em] text-white/55">Participás por</p><p className="m-0 text-lg font-extrabold text-[#ff8141]">una moto 0KM</p></div>
      </div>
    </main>
    <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-5 py-5 text-xs text-white/40 sm:px-8 lg:px-10"><span>Fondus · El poder de tus ahorros</span><span>Argentina</span></div>
  </div>;
}

function PlanSelector({ onSelect, onBack }: { onSelect: (plan: Plan) => void; onBack: () => void }) {
  return <div className="min-h-[100dvh]">
    <StepHeader step={2} onBack={onBack} />
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-10 lg:pt-14">
      <div className="max-w-2xl fade-up"><p className="mb-3 text-sm font-bold uppercase tracking-[.16em] text-[#ff7b35]">Paso 02 · Elegí tu camino</p><h1 className="display text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Un plan para cada<br /><span className="text-[#a6d2b9]">proyecto.</span></h1><p className="mt-5 text-base leading-7 text-white/60">Tres alternativas, la misma posibilidad: capitalizar tus ahorros en pesos y participar desde la primera cuota.</p></div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => <button type="button" key={plan.id} onClick={() => onSelect(plan)} className={`group relative flex flex-col rounded-[1.6rem] p-5 text-left transition-all duration-300 hover:-translate-y-1 ${plan.featured ? 'orange-shadow border-2 border-[#ff5a00] bg-[#ff5a00]' : 'glass border border-white/12 hover:border-[#ff5a00]/55'}`} data-testid={`card-plan-${plan.id}`}>
          {plan.featured && <span className="absolute -top-3 right-5 rounded-full bg-[#ffcf77] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#48200d]">Más elegido</span>}
          <div className="flex items-center justify-between"><span className={`text-xs font-bold uppercase tracking-[.14em] ${plan.featured ? 'text-[#48200d]/65' : 'text-[#a6d2b9]'}`}>0{index + 1}</span><span className={`rounded-full p-2 ${plan.featured ? 'bg-[#1e2c44]/10 text-[#1e2c44]' : 'bg-white/8 text-[#ff7b35]'}`}><ArrowRight size={15} /></span></div>
          <p className={`mt-6 text-sm font-semibold ${plan.featured ? 'text-[#48200d]/70' : 'text-white/55'}`}>{plan.eyebrow}</p>
          <h2 className={`display mt-1 text-xl font-extrabold ${plan.featured ? 'text-[#1d2635]' : 'text-white'}`}>{plan.title}</h2>
          <p className={`mt-7 text-[2.15rem] font-extrabold tracking-[-.06em] ${plan.featured ? 'text-[#1d2635]' : 'text-[#ff8141]'}`}>{plan.capital}</p>
          <div className={`mt-5 border-t pt-4 ${plan.featured ? 'border-[#48200d]/20' : 'border-white/12'}`}><p className={`text-xs ${plan.featured ? 'text-[#48200d]/65' : 'text-white/55'}`}>Cuotas 1 a 4</p><p className={`text-lg font-bold ${plan.featured ? 'text-[#1d2635]' : 'text-white'}`}>{plan.first}</p><p className={`mt-3 text-xs ${plan.featured ? 'text-[#48200d]/65' : 'text-white/55'}`}>Desde cuota 5</p><p className={`text-lg font-bold ${plan.featured ? 'text-[#1d2635]' : 'text-white'}`}>{plan.regular}</p></div>
          <div className={`mt-6 space-y-3 border-t pt-5 text-xs leading-5 ${plan.featured ? 'border-[#48200d]/20 text-[#48200d]/80' : 'border-white/12 text-white/70'}`}><Benefit text="Sorteos mensuales desde cuota 1; si ganás, no pagás más" featured={Boolean(plan.featured)} /><Benefit text="Disponibilidad de fondos desde cuota 18" featured={Boolean(plan.featured)} /><Benefit text="Telemedicina 24/7" featured={Boolean(plan.featured)} /><Benefit text="Seguro de vida" featured={Boolean(plan.featured)} /></div>
          <span className={`mt-7 flex items-center justify-center gap-2 rounded-full py-3 text-xs font-extrabold tracking-[.08em] ${plan.featured ? 'bg-[#1d2a40] text-white' : 'bg-white/10 text-white group-hover:bg-[#ff5a00] group-hover:text-[#1d2a40]'}`}>ELEGIR ESTE PLAN <ArrowRight size={14} /></span>
        </button>)}
      </div>
      <p className="mt-8 flex items-center gap-2 text-xs text-white/40"><CircleHelp size={14} /> Tocá una tarjeta para continuar. Vas a poder revisar todo antes de adherirte.</p>
    </main>
  </div>;
}

function Benefit({ text, featured }: { text: string; featured: boolean }) {
  return <span className="flex items-start gap-2"><Check size={15} className={`mt-0.5 shrink-0 ${featured ? 'text-[#1d2a40]' : 'text-[#ff7b35]'}`} strokeWidth={3} /><span>{text}</span></span>;
}

function Advisor({ plan, onChoose, onBack }: { plan: Plan; onChoose: (choice: string) => void; onBack: () => void }) {
  return <div className="min-h-[100dvh]">
    <StepHeader step={3} onBack={onBack} />
    <main className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10 lg:pt-14">
      <div className="fade-up"><div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-[#a6d2b9]/35 bg-[#a6d2b9]/12 text-[#a6d2b9]"><MessageCircle size={30} /></div><p className="mb-3 text-sm font-bold uppercase tracking-[.16em] text-[#ff7b35]">Paso 03 · Te acompaño</p><h1 className="display text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Hablemos de<br /><span className="text-[#a6d2b9]">tu número.</span></h1><p className="mt-5 max-w-sm text-base leading-7 text-white/60">Sofia, tu asesora digital, tiene algo importante para contarte antes del sorteo.</p></div>
      <div className="glass soft-shadow overflow-hidden rounded-[1.7rem] fade-up fade-up-delay-2">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5a00] font-extrabold text-[#192238]">S</div><div><p className="m-0 text-sm font-bold text-white">Sofia</p><p className="m-0 text-xs text-[#a6d2b9]">Asesora digital · En línea</p></div><span className="ml-auto h-2 w-2 rounded-full bg-[#83bea3]" /></div>
        <div className="space-y-4 p-5 sm:p-7">
          <ChatBubble text="Hola soy Sofia, tu asesora digital ¡Felicitaciones por el sistema que acabás de seleccionar!" />
          <ChatBubble text="Tu plan es en cuotas fijas y en pesos, las primeras 4 tienen un valor mayor pero desde la 5ta baja, hasta que salgas adjudicado o decidas continuar. ¡Si salís adjudicado NO VAS A PAGAR MÁS!" />
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-[#ff5a00] px-4 py-3 text-sm font-semibold leading-6 text-[#192238]">Tu plan: {plan.capital} · {plan.regular} desde cuota 5</div>
          <ChatBubble text="Antes de continuar decime:" />
          <div className="grid gap-3 pt-2 sm:grid-cols-2"><button type="button" onClick={() => onChoose('seleccionado')} className="flex items-center justify-between rounded-xl border border-[#ff5a00] bg-[#ff5a00]/12 px-4 py-3 text-left text-sm font-bold text-[#ff9b6a] transition-colors hover:bg-[#ff5a00] hover:text-[#192238]" data-testid="button-select-number">Me gustaría seleccionar mi número <ArrowRight size={16} /></button><button type="button" onClick={() => onChoose('aleatorio')} className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-bold text-white/80 transition-colors hover:border-[#a6d2b9] hover:bg-[#a6d2b9]/10" data-testid="button-random-number">Que me toque aleatoriamente <Sparkles size={16} /></button></div>
        </div>
      </div>
    </main>
  </div>;
}

function ChatBubble({ text }: { text: string }) { return <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/7 px-4 py-3 text-sm leading-6 text-white/80">{text}</div>; }

function LuckyNumber({ number, onContinue, onBack }: { number: string; onContinue: () => void; onBack: () => void }) {
  return <div className="min-h-[100dvh]">
    <StepHeader step={4} onBack={onBack} />
    <main className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-20 pt-14 text-center sm:px-8 sm:pt-20">
      <div className="relative fade-up"><div className="absolute inset-[-2rem] rounded-full bg-[#ff5a00]/15 blur-3xl" /><div className="spin-orbit relative flex h-20 w-20 items-center justify-center rounded-full border border-[#a6d2b9]/50 bg-[#a6d2b9]/10 text-[#a6d2b9]"><Trophy size={35} /><Sparkles className="absolute -right-2 -top-2 text-[#ffb537]" size={18} /></div></div>
      <p className="mt-10 text-sm font-bold uppercase tracking-[.16em] text-[#ff7b35] fade-up fade-up-delay-1">Paso 04 · Tu número de la suerte</p>
      <h1 className="display mt-3 text-4xl font-extrabold tracking-[-.06em] text-white fade-up fade-up-delay-1 sm:text-6xl">Ya sos parte del<br /><span className="text-[#a6d2b9]">próximo sorteo.</span></h1>
      <div className="mt-10 rounded-[2rem] border border-[#ff5a00]/45 bg-[#ff5a00]/10 px-10 py-8 orange-shadow fade-up fade-up-delay-2"><p className="m-0 text-xs font-bold uppercase tracking-[.2em] text-[#ffab80]">Tu número asignado</p><p className="display mt-2 text-7xl font-extrabold tracking-[.1em] text-[#ff7132] sm:text-8xl" data-testid="text-lucky-number">{number}</p><div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/55"><Check size={14} className="text-[#a6d2b9]" /> Guardalo, lo vas a necesitar</div></div>
      <div className="mt-7 max-w-lg rounded-2xl border border-[#a6d2b9]/25 bg-[#a6d2b9]/10 p-5 text-left fade-up fade-up-delay-3"><div className="flex gap-3"><Gift className="mt-0.5 shrink-0 text-[#ffb537]" size={20} /><p className="m-0 text-sm leading-6 text-white/80"><strong className="text-[#f4f4ee]">¡FELICITACIONES!</strong> Si continuás con el proceso de adhesión y adherís tu Naranja X, tenés la suscripción <strong className="text-[#a6d2b9]">100% bonificada.</strong></p></div></div>
      <button type="button" onClick={onContinue} className="mt-9 flex items-center gap-3 rounded-full bg-[#ff5a00] px-8 py-4 text-sm font-extrabold tracking-[.08em] text-[#1a2030] transition-transform hover:scale-[1.02]" data-testid="button-continue-lucky">CONTINUAR <ArrowRight size={18} /></button>
    </main>
  </div>;
}

function Adhesion({ plan, number, onBack, onFinish }: { plan: Plan; number: string; onBack: () => void; onFinish: () => void }) {
  const [understands, setUnderstands] = useState(false);
  const [terms, setTerms] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', dni: '', whatsapp: '' });
  const valid = Boolean(understands && terms && form.name.trim() && form.dni.trim() && form.whatsapp.trim());
  const submit = (event: FormEvent) => { event.preventDefault(); if (valid) { setSent(true); onFinish(); } };
  return <div className="min-h-[100dvh]">
    <StepHeader step={5} onBack={onBack} />
    <main className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-7 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-16 lg:px-10 lg:pt-14">
      <div className="fade-up"><p className="mb-3 text-sm font-bold uppercase tracking-[.16em] text-[#ff7b35]">Paso 05 · Último vistazo</p><h1 className="display text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Repasemos<br /><span className="text-[#a6d2b9]">juntos.</span></h1><p className="mt-5 max-w-md text-base leading-7 text-white/60">Tu decisión queda en tus manos. Leé la información y, cuando estés listo, completá tus datos.</p>
        <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/5 p-5"><div className="flex items-center justify-between"><p className="m-0 text-xs font-bold uppercase tracking-[.14em] text-white/50">Tu plan</p><span className="rounded-full bg-[#a6d2b9]/15 px-3 py-1 text-xs font-bold text-[#a6d2b9]">Número {number}</span></div><p className="display mt-4 text-2xl font-extrabold text-white">{plan.capital}</p><div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4"><div><p className="m-0 text-xs text-white/45">Cuotas 1 a 4</p><p className="mt-1 text-lg font-bold text-[#ff8141]">{plan.first}</p></div><div><p className="m-0 text-xs text-white/45">Desde cuota 5</p><p className="mt-1 text-lg font-bold text-[#ff8141]">{plan.regular}</p></div></div><p className="mt-5 text-sm leading-6 text-white/65">Vas a participar el último sábado de cada mes con el número asignado. Si salís adjudicado, no pagás más. A partir del mes 18, tenés disponibilidad de retiro.</p></div>
      </div>
      <form onSubmit={submit} className="glass rounded-[1.7rem] p-5 soft-shadow fade-up fade-up-delay-2 sm:p-7" data-testid="form-adhesion"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a00]/15 text-[#ff8141]"><FileText size={20} /></div><div><h2 className="m-0 text-lg font-extrabold text-white">Completá tus datos</h2><p className="m-0 mt-1 text-xs text-white/50">Sin compromiso. Solo para simular la adhesión.</p></div></div>
        <div className={`mt-6 space-y-4 transition-opacity ${understands ? 'opacity-100' : 'opacity-45'}`}><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-white/55">Nombre completo</span><input required disabled={!understands} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/12 bg-[#101c32] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]" placeholder="Por ejemplo, María González" data-testid="input-name" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-white/55">DNI</span><input required disabled={!understands} value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} className="w-full rounded-xl border border-white/12 bg-[#101c32] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]" placeholder="Tu DNI" data-testid="input-dni" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-white/55">WhatsApp</span><input required disabled={!understands} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full rounded-xl border border-white/12 bg-[#101c32] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]" placeholder="11 5555 5555" data-testid="input-whatsapp" /></label></div></div>
        {!understands && <p className="mt-4 flex items-center gap-2 text-xs text-[#ffb18e]"><LockKeyhole size={14} /> Primero confirmá que entendés el sistema para habilitar el formulario.</p>}
        <div className="mt-7 space-y-3 border-t border-white/10 pt-5"><label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/75"><input type="checkbox" checked={understands} onChange={(e) => setUnderstands(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#ff5a00]" data-testid="checkbox-understands" /><span>Entiendo que me estoy suscribiendo a un sistema de capitalización y ahorro.</span></label><label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-white/75"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#ff5a00]" data-testid="checkbox-terms" /><span>Acepto bases y condiciones.</span></label></div>
        <button type="submit" disabled={!valid || sent} className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#ff5a00] py-4 text-sm font-extrabold tracking-[.06em] text-[#192238] transition-opacity disabled:cursor-not-allowed disabled:opacity-35" data-testid="button-adhere">{sent ? 'SOLICITUD RECIBIDA' : 'ADHERIRME CON NARANJA X'} <ArrowRight size={18} /></button><p className="mt-4 flex justify-center gap-2 text-center text-[11px] leading-4 text-white/35"><ShieldCheck size={14} /> Tus datos se usan únicamente para esta simulación.</p>
      </form>
    </main>
  </div>;
}

function LegalFooter({ onRegret }: { onRegret: () => void }) {
  const resources = ['TÍTULO DE CAPITALIZACIÓN', 'TABLA DE RESCATE Y ENDOSO', 'SORTEO', 'PARTICIPACIÓN Y RENDIMIENTOS'];
  return <footer className="border-t border-white/10 bg-[#101b30] px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-8 lg:grid-cols-[1fr_1.45fr]"><div><LogoLockup /><p className="mt-5 max-w-xs text-sm leading-6 text-white/45">El poder de tus ahorros. Una propuesta de Fondus junto a Naranja X.</p><button type="button" onClick={onRegret} className="mt-5 flex items-center gap-2 rounded-full border border-[#ff5a00]/60 px-4 py-2.5 text-xs font-bold text-[#ff9b6a] transition-colors hover:bg-[#ff5a00] hover:text-[#192238]" data-testid="button-regret"><Mail size={15} /> Botón de arrepentimiento · Tenés 10 días</button></div><div><p className="m-0 text-xs font-bold uppercase tracking-[.16em] text-white/55">Información legal</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{resources.map((resource) => <button type="button" key={resource} onClick={() => window.alert(`${resource}: el documento se abriría en una nueva ventana.`)} className="flex items-center gap-2 text-left text-xs font-semibold text-white/65 transition-colors hover:text-[#ff9b6a]" data-testid={`button-legal-${resource.toLowerCase().replaceAll(' ', '-')}`}><Download size={13} className="text-[#a6d2b9]" /> {resource}</button>)}</div></div></div><div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] leading-5 text-white/38 sm:flex-row sm:justify-between"><span>Planes autorizados por IGJ N Res. 289/11</span><span className="font-bold text-[#ff9b6a]">NO CONTAMOS CON COBRADORES A DOMICILIO</span><span>© Fondus · Naranja X</span></div></div></footer>;
}

function RegretModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#07101d]/75 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" data-testid="modal-regret"><div className="w-full max-w-md rounded-[1.7rem] border border-white/15 bg-[#1b2b46] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff5a00]/15 text-[#ff8141]"><Mail size={22} /></div><button type="button" onClick={onClose} className="text-white/50 hover:text-white" aria-label="Cerrar modal" data-testid="button-close-regret"><X /></button></div>{sent ? <div className="py-6"><h2 className="display text-2xl font-extrabold text-white">Solicitud enviada.</h2><p className="mt-3 text-sm leading-6 text-white/65">Te contactaremos para gestionar tu arrepentimiento dentro de los próximos días hábiles.</p><button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#ff5a00] px-5 py-3 text-sm font-bold text-[#192238]" data-testid="button-close-sent">Cerrar</button></div> : <><p className="mt-5 text-xs font-bold uppercase tracking-[.15em] text-[#ff8141]">Derecho de arrepentimiento</p><h2 className="display mt-2 text-2xl font-extrabold text-white">¿Querés dejarnos tu solicitud?</h2><p className="mt-3 text-sm leading-6 text-white/65">Tenés 10 días para arrepentirte. Dejanos tu correo y simulamos el envío de la solicitud.</p><input type="email" placeholder="tu@email.com" className="mt-5 w-full rounded-xl border border-white/12 bg-[#101c32] px-4 py-3 text-sm text-white outline-none focus:border-[#ff5a00]" data-testid="input-regret-email" /><button type="button" onClick={() => setSent(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5a00] py-3.5 text-sm font-extrabold text-[#192238]" data-testid="button-send-regret">ENVIAR SOLICITUD <ArrowRight size={16} /></button></>}</div></div>;
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07101d]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="modal-success"><div className="w-full max-w-md rounded-[1.7rem] border border-[#a6d2b9]/30 bg-[#1b2b46] p-7 text-center shadow-2xl"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#a6d2b9]/15 text-[#a6d2b9]"><Check size={30} /></div><h2 className="display mt-5 text-3xl font-extrabold text-white">¡Estamos en contacto!</h2><p className="mt-3 text-sm leading-6 text-white/65">Recibimos tus datos. Un asesor de Naranja X se comunicará con vos para continuar la adhesión.</p><button type="button" onClick={onClose} className="mt-7 rounded-full bg-[#ff5a00] px-7 py-3.5 text-sm font-extrabold text-[#192238]" data-testid="button-success-close">LISTO</button></div></div>;
}

function Home() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [number, setNumber] = useState(''); 
  const [regret, setRegret] = useState(false);
  const [success, setSuccess] = useState(false);
  const luckyNumber = useMemo(() => String(100 + Math.floor(Math.random() * 899)), []);
  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const choosePlan = (selected: Plan) => { setPlan(selected); setStep(3); };
  const chooseNumber = () => { setNumber(luckyNumber); setStep(4); };
  return <div className="app-shell grain"><div className="relative z-10">{step === 1 && <Hero onStart={() => setStep(2)} />}{step === 2 && <PlanSelector onSelect={choosePlan} onBack={goBack} />}{step === 3 && plan && <Advisor plan={plan} onChoose={chooseNumber} onBack={goBack} />}{step === 4 && <LuckyNumber number={number} onContinue={() => setStep(5)} onBack={goBack} />}{step === 5 && plan && <Adhesion plan={plan} number={number} onBack={goBack} onFinish={() => setSuccess(true)} />}<LegalFooter onRegret={() => setRegret(true)} /></div><SocialProof />{regret && <RegretModal onClose={() => setRegret(false)} />}{success && <SuccessModal onClose={() => setSuccess(false)} />}</div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;