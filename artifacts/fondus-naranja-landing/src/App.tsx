import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Download,
  FileText,
  Gift,
  Info,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

import Architectural3DCanvas from '@/components/canvas/Architectural3DCanvas';
import TiltCard from '@/components/ui/TiltCard';
import ArchitecturalButton from '@/components/ui/ArchitecturalButton';
import LegalModal from '@/components/ui/LegalModal';

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
  {
    id: 'inicio',
    title: 'Plan Inicial',
    capital: '$7.500.000',
    first: '$43.800',
    regular: '$25.875',
    eyebrow: 'Ideal para empezar tu ahorro',
  },
  {
    id: 'elegido',
    title: 'Plan Vehículo 0KM',
    capital: '$10.000.000',
    first: '$58.400',
    regular: '$34.500',
    eyebrow: 'El más elegido por la comunidad',
    featured: true,
  },
  {
    id: 'mayor',
    title: 'Plan Vivienda & Futuro',
    capital: '$20.000.000',
    first: '$116.800',
    regular: '$69.000',
    eyebrow: 'Mayor capital y grandes proyectos',
  },
];

const socialProof = [
  ['Martín G.', 'Córdoba', '$10.000.000'],
  ['Valeria R.', 'Mendoza', '$20.000.000'],
  ['Luciano P.', 'Rosario', '$7.500.000'],
  ['Agustina M.', 'Buenos Aires', 'Plan 0KM'],
];

function LogoLockup() {
  return (
    <div className="flex items-center gap-3 select-none" data-testid="brand-lockup">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl font-black tracking-tight text-white font-sans">
            fondus
          </span>
          <span className="h-5 w-px bg-white/20" />
          <span className="text-xl font-black tracking-tight text-[#ff6a12] font-sans">
            Naranja<span className="text-white">X</span>
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-white/50 uppercase -mt-0.5">
          SISTEMA DE CAPITALIZACIÓN Y AHORRO
        </span>
      </div>
    </div>
  );
}

function NavigationBar({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080e1e]/90 px-6 py-4 backdrop-blur-md sm:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <LogoLockup />

        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={() => onScrollTo('planes')}
            className="text-xs font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Planes
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('como-funciona')}
            className="text-xs font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Cómo Funciona
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('legal')}
            className="text-xs font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Marco Legal
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onScrollTo('adhesion')}
            className="rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Simular mi Plan
          </button>
        </div>
      </div>
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
      setNotice(`${item[0]} de ${item[1]} acaba de sumarse al plan de ${item[2]}`);
      window.setTimeout(() => setNotice(null), 3600);
    };
    const interval = window.setInterval(show, 5500);
    const initial = window.setTimeout(show, 2500);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(initial);
    };
  }, []);

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          key={notice}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          className={`fixed bottom-6 z-40 w-[calc(100%-2.5rem)] max-w-[340px] ${
            side === 'left' ? 'left-5 sm:left-8' : 'right-5 sm:right-8'
          }`}
          data-testid="social-proof"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0e172a]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5a00] to-[#ff7a29] text-white shadow-md shadow-orange-500/30">
                <BadgeCheck size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Adhesión reciente
                </p>
                <p className="m-0 mt-1 text-xs font-medium leading-relaxed text-white/95">
                  {notice}
                </p>
              </div>
              <button
                type="button"
                className="p-1 text-white/40 transition-colors hover:text-white"
                onClick={() => setNotice(null)}
                aria-label="Cerrar notificación"
                data-testid="button-close-social"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* 3D Interactive Canvas in Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <Architectural3DCanvas />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-12">
        <div>
          {/* Trust Rating Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md"
            data-testid="badge-rating"
          >
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Google Rating 4.9</span>
            <span className="text-white/40">·</span>
            <span className="font-normal text-white/80">Más de 15.000 clientes satisfechos</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Con <span className="text-[#ff6a12]">FONDUS</span> y{' '}
            <span className="whitespace-nowrap">
              Naranja <span className="text-[#ff6a12]">X</span>
            </span>{' '}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              vas a poder.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Ahorrá en pesos con cuotas accesibles y participá todos los meses por la adjudicación
            total de tu capital.{' '}
            <strong className="text-white font-semibold">
              Si tu número sale sorteado en Lotería, ¡no pagás más cuotas y recibís todo el dinero!
            </strong>
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ArchitecturalButton
              onClick={onStart}
              data-testid="button-start"
              className="w-full text-base px-9 py-4 shadow-xl shadow-orange-500/25 sm:w-auto"
            >
              VER PLANES Y SIMULAR
            </ArchitecturalButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-xs font-medium text-slate-300 sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <LockKeyhole size={12} />
              </span>
              100% Online y seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <ShieldCheck size={12} />
              </span>
              Sin compromiso ni costos ocultos
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5a00]/20 text-[#ff7b35]">
                <Sparkles size={12} />
              </span>
              Adjudicación mensual por Quiniela
            </span>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#ff5a00]/20 to-emerald-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#111c33] to-[#0c1424] p-3.5 shadow-2xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl bg-slate-900">
              <img
                src={`${import.meta.env.BASE_URL}assets/WhatsApp_Image_2026-09-10_at_12.28.22_PM_1790143148151.jpeg`}
                alt="Promoción Fondus y Naranja X por el sorteo de una moto 0KM"
                className="block aspect-[9/12] w-full object-cover object-top filter contrast-105"
                data-testid="img-hero-campaign"
              />

              <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/20 bg-[#0c1628]/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ff5a00]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#ff9b6a]">
                      <Gift size={12} /> Beneficio Exclusivo
                    </span>
                    <p className="m-0 mt-1 text-sm font-bold text-white">
                      Cuota de suscripción bonificada
                    </p>
                    <p className="m-0 text-xs text-slate-300">
                      Válido vinculando tu cuenta Naranja X
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5a00] to-[#ff7a29] text-white shadow-lg shadow-orange-500/30">
                    <Gift size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <span className="text-[11px] font-semibold text-white/60">SORTEO ESPECIAL</span>
                <p className="m-0 text-sm font-extrabold text-[#ff8141]">UNA MOTO 0KM</p>
              </div>
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                Participás gratis
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansSection({
  selectedPlan,
  onSelectPlan,
}: {
  selectedPlan: Plan;
  onSelectPlan: (plan: Plan) => void;
}) {
  return (
    <section id="planes" className="relative scroll-mt-20 px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl text-left">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a]">
            Planes de Capitalización
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Un plan pensado para <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              hacer realidad tu proyecto.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Elegí el capital que necesitás. Tus ahorros se capitalizan mes a mes en cuotas en pesos
            y participás por la adjudicación total desde la primera cuota.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isChosen = selectedPlan.id === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <TiltCard
                  featured={Boolean(plan.featured)}
                  onClick={() => onSelectPlan(plan)}
                  className={`flex flex-col rounded-3xl border p-6 text-left transition-all duration-300 sm:p-7 ${
                    isChosen
                      ? 'border-[#ff5a00] bg-gradient-to-b from-[#182642] to-[#0f172a] shadow-[0_15px_45px_-10px_rgba(255,90,0,0.4)] ring-2 ring-[#ff5a00]'
                      : plan.featured
                      ? 'border-[#ff5a00]/80 bg-gradient-to-b from-[#142036] to-[#0f172a] shadow-[0_15px_45px_-10px_rgba(255,90,0,0.25)]'
                      : 'border-white/15 bg-gradient-to-b from-[#10192e] to-[#0a1122] shadow-xl hover:border-emerald-500/50'
                  }`}
                  data-testid={`card-plan-${plan.id}`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-bold text-emerald-400">
                        Opción 0{index + 1}
                      </span>
                      {plan.featured ? (
                        <span className="rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-md shadow-orange-500/30">
                          ⭐ Más Elegido
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                          Ahorro Mensual
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-400">
                      {plan.eyebrow}
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-white">{plan.title}</h3>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Capital a adjudicar
                      </span>
                      <p className="mt-1 text-3xl font-black tracking-tight text-[#ff8141] sm:text-4xl">
                        {plan.capital}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="text-[11px] font-medium text-slate-400">Cuotas 1 a 4</p>
                        <p className="mt-1 text-lg font-bold text-white sm:text-xl">{plan.first}</p>
                        <p className="text-[10px] text-white/40">Gastos adm. iniciales</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-emerald-400">Desde cuota 5</p>
                        <p className="mt-1 text-lg font-bold text-emerald-400 sm:text-xl">
                          {plan.regular}
                        </p>
                        <p className="text-[10px] font-semibold text-emerald-400/70">
                          ¡Baja de valor!
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 text-xs text-slate-200 sm:text-sm">
                      <Benefit text="Sorteos mensuales desde cuota 1 (si ganás, no pagás más)" />
                      <Benefit text="Disponibilidad y rescate de fondos desde cuota 18" />
                      <Benefit text="Telemedicina 24/7 sin cargo para vos y tu familia" />
                      <Benefit text="Seguro de vida integral bonificado" />
                    </div>
                  </div>

                  <div className="mt-8 pt-2">
                    <button
                      type="button"
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all duration-200 ${
                        isChosen
                          ? 'bg-[#ff5a00] text-white shadow-lg shadow-orange-500/35'
                          : plan.featured
                          ? 'bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] text-white shadow-lg shadow-orange-500/25'
                          : 'border border-white/15 bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span>{isChosen ? 'Plan seleccionado ✓' : 'Elegir este plan'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
        <Check size={11} strokeWidth={3} />
      </div>
      <span className="leading-snug">{text}</span>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Elegí tu Plan y Cuota',
      desc: 'Seleccioná el monto de capital que querés alcanzar. Pagás cuotas fijas y accesibles en pesos.',
      icon: <Sparkles className="text-[#ff8141]" size={24} />,
    },
    {
      num: '02',
      title: 'Sorteo Mensual por Quiniela',
      desc: 'Participás el último sábado de cada mes a través de Quiniela de la Ciudad (LOTBA S.E.).',
      icon: <Trophy className="text-amber-400" size={24} />,
    },
    {
      num: '03',
      title: 'Adjudicación o Rescate',
      desc: 'Si salís adjudicado, no pagás ninguna cuota más y cobrás el total. Si no, acumulás tu capital y podés rescatarlo desde el mes 18.',
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
    },
  ];

  return (
    <section id="como-funciona" className="relative scroll-mt-20 border-y border-white/10 bg-[#091122]/70 px-6 py-16 sm:px-10 sm:py-24 lg:px-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
            Simple, transparente y seguro
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            ¿Cómo funciona el sistema?
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Un modelo de capitalización respaldado por la Inspección General de Justicia (IGJ) para
            que cumplas tus objetivos con tranquilidad.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#121c32] to-[#0c1424] p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  {st.icon}
                </div>
                <span className="font-mono text-2xl font-black text-white/20">{st.num}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{st.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdhesionSection({
  selectedPlan,
  onPlanChange,
  onSuccess,
}: {
  selectedPlan: Plan;
  onPlanChange: (plan: Plan) => void;
  onSuccess: () => void;
}) {
  const [understands, setUnderstands] = useState(false);
  const [terms, setTerms] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', dni: '', whatsapp: '' });

  const valid = Boolean(
    understands && terms && form.name.trim() && form.dni.trim() && form.whatsapp.trim(),
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (valid) {
      setSent(true);
      onSuccess();
    }
  };

  return (
    <section id="adhesion" className="relative scroll-mt-20 px-6 py-16 sm:px-10 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:items-start">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#ff5a00]/30 bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a]">
              Simulación de Adhesión
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Completá tu solicitud <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                en menos de 1 minuto.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Ingresá tus datos para que un asesor oficial de Fondus y Naranja X te envíe tu
              simulación detallada y número de sorteo sin ningún compromiso.
            </p>

            {/* Plan selector pills */}
            <div className="mt-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Seleccioná o cambiá tu plan:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {plans.map((p) => {
                  const active = p.id === selectedPlan.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onPlanChange(p)}
                      className={`rounded-xl border p-2.5 text-center transition-all ${
                        active
                          ? 'border-[#ff5a00] bg-[#ff5a00]/20 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <p className="m-0 text-xs truncate">{p.title}</p>
                      <p className="m-0 text-[11px] font-bold text-[#ff8141]">{p.capital}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plan Summary Box */}
            <div className="mt-6 rounded-3xl border border-white/15 bg-gradient-to-b from-[#121c32] to-[#0c1424] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">Plan elegido</span>
                  <p className="m-0 text-lg font-bold text-white">{selectedPlan.title}</p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-400">
                  Cuota inicial bonificada
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xs font-medium text-slate-400">Capital a adjudicar</span>
                <p className="text-3xl font-extrabold text-[#ff8141]">{selectedPlan.capital}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="m-0 text-xs text-slate-400">Cuotas 1 a 4</p>
                  <p className="mt-1 text-lg font-bold text-white">{selectedPlan.first}</p>
                </div>
                <div>
                  <p className="m-0 text-xs font-semibold text-emerald-400">Desde cuota 5</p>
                  <p className="mt-1 text-lg font-bold text-emerald-400">{selectedPlan.regular}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/10 p-3 text-xs text-amber-300 border border-amber-500/20">
                <Gift size={16} className="shrink-0 text-amber-400" />
                <span>
                  <strong>Beneficio Naranja X:</strong> tu primera cuota de suscripción está 100% bonificada.
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#141f36] to-[#0c1424] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            data-testid="form-adhesion"
          >
            <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ff5a00]/40 bg-[#ff5a00]/20 text-[#ff8141]">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">Tus datos de contacto</h3>
                <p className="m-0 text-xs text-slate-300">
                  Simulación sin compromiso ni costos iniciales
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Nombre y Apellido
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/30"
                  placeholder="Por ejemplo, Juan Pérez"
                  data-testid="input-name"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    DNI
                  </span>
                  <input
                    required
                    value={form.dni}
                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/30"
                    placeholder="Sin puntos ni espacios"
                    data-testid="input-dni"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    WhatsApp
                  </span>
                  <input
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/30"
                    placeholder="Ej: 11 5555 5555"
                    data-testid="input-whatsapp"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                <input
                  type="checkbox"
                  checked={understands}
                  onChange={(e) => setUnderstands(e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#ff5a00]"
                  data-testid="checkbox-understands"
                />
                <span>Entiendo que me estoy suscribiendo a un sistema de capitalización y ahorro.</span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#ff5a00]"
                  data-testid="checkbox-terms"
                />
                <span>Acepto las bases y condiciones contractuales de Fondus y Naranja X.</span>
              </label>
            </div>

            <div className="mt-8">
              <ArchitecturalButton
                type="submit"
                disabled={!valid || sent}
                className="w-full py-4 text-base shadow-xl shadow-orange-500/25"
                data-testid="button-adhere"
              >
                {sent ? 'SOLICITUD ENVIADA' : 'ADHERIRME CON NARANJA X'}
              </ArchitecturalButton>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/50">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Tus datos están protegidos y se utilizan únicamente para la simulación.</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function LegalFooter({ onRegret }: { onRegret: () => void }) {
  const [modalSorteo, setModalSorteo] = useState(false);
  const [modalRendimientos, setModalRendimientos] = useState(false);

  return (
    <footer id="legal" className="border-t border-white/10 bg-[#070d1a] px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              El poder de tus ahorros. Una alianza institucional entre Fondus y Naranja X para
              impulsar tus metas con total transparencia y respaldo.
            </p>
            <button
              type="button"
              onClick={onRegret}
              className="mt-6 flex items-center gap-2 rounded-xl border border-[#ff5a00]/40 bg-[#ff5a00]/10 px-4 py-2.5 text-xs font-bold text-[#ff9b6a] transition-all hover:bg-[#ff5a00] hover:text-white"
              data-testid="button-regret"
            >
              <Mail size={14} /> Botón de Arrepentimiento (10 días)
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5a00]" />
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-slate-200">
                Condiciones Generales y Descargas
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Botón 1: CONDICIONES GENERALES */}
              <a
                href={`${import.meta.env.BASE_URL}condiciones.pdf`}
                download="condiciones.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left shadow-md transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a]"
                data-testid="button-legal-condiciones-generales"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    Condiciones Generales
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-400">
                  Objeto del contrato, cálculo de cuotas y normativas de la IGJ (PDF)
                </span>
              </a>

              {/* Botón 2: TÍTULO DE CAPITALIZACIÓN */}
              <a
                href={`${import.meta.env.BASE_URL}titulo.pdf`}
                download="titulo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left shadow-md transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a]"
                data-testid="button-legal-título-de-capitalización"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    Título de Capitalización
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-400">
                  Modelo del título, vigencia y capital nominal (PDF)
                </span>
              </a>

              {/* Botón 3: TABLA DE RESCATE Y ENDOSO */}
              <a
                href={`${import.meta.env.BASE_URL}rescate.pdf`}
                download="rescate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left shadow-md transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a]"
                data-testid="button-legal-tabla-de-rescate-y-endoso"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    Tabla de Rescate
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-400">
                  Valores de rescate para planes de 300 meses (PDF)
                </span>
              </a>

              {/* Botón 4: SORTEO (Modal) */}
              <button
                type="button"
                onClick={() => setModalSorteo(true)}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left shadow-md transition-all duration-200 hover:border-emerald-500/50 hover:bg-[#121f3a]"
                data-testid="button-legal-sorteo"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400">
                    Sorteo Oficial
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white/70 group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-400">
                  Mecanismo y fechas de adjudicación mensual por Quiniela LOTBA S.E.
                </span>
              </button>

              {/* Botón 5: PARTICIPACIÓN Y RENDIMIENTOS (Modal) */}
              <button
                type="button"
                onClick={() => setModalRendimientos(true)}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left shadow-md transition-all duration-200 hover:border-emerald-500/50 hover:bg-[#121f3a]"
                data-testid="button-legal-participación-y-rendimientos"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400">
                    Rendimientos
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white/70 group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-400">
                  Participación en los resultados de Reservas Matemáticas
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>Planes autorizados por IGJ N° Res. 289/11</span>
          <span className="font-bold text-[#ff9b6a]">No contamos con cobradores a domicilio</span>
          <span>© Fondus · Naranja X · Todos los derechos reservados</span>
        </div>
      </div>

      {/* Modal 1: SORTEO */}
      <LegalModal
        isOpen={modalSorteo}
        onClose={() => setModalSorteo(false)}
        title="SORTEO"
      >
        <div className="space-y-4 text-slate-700">
          <p className="text-base font-semibold leading-relaxed text-slate-900">
            El sorteo mensual se realiza a través de Quiniela de la Lotería de la Ciudad de Buenos Aires (LOTBA S.E.), el último sábado de cada mes, última jugada.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            En caso de que LOTBA S.E. no efectuase el último sábado sorteos de lotería, se tomará para la adjudicación el que realice LOTBA S.E. para sí el último sábado de cada mes como última jugada de Quiniela.
          </p>

          <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
            Si LOTBA S.E. no realizara para sí, el último sábado de cada mes sorteos de Lotería o Quiniela, se tomará para la adjudicación, el primer sorteo de Quiniela que realice para sí LOTBA S.E. con posterioridad al último sábado sin sorteo.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-100 p-4 sm:p-5">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-2xl font-black tracking-tighter text-slate-900">IGJ</span>
                  <svg className="h-8 w-8 shrink-0 text-sky-600" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="20" cy="20" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
                    <circle cx="20" cy="11" r="2.5" fill="currentColor" />
                    <circle cx="20" cy="29" r="2.5" fill="currentColor" />
                    <circle cx="11" cy="20" r="2.5" fill="currentColor" />
                    <circle cx="29" cy="20" r="2.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="border-l border-slate-300 pl-3 text-[10px] leading-tight text-slate-600">
                  <p className="m-0 font-semibold text-slate-800">Ministerio de Justicia y Derechos Humanos</p>
                  <p className="m-0 text-slate-500">Presidencia de la Nación</p>
                </div>
              </div>

              <div className="hidden h-10 w-px bg-slate-300 sm:block" />

              <div className="text-center sm:text-right">
                <p className="m-0 text-xs font-bold uppercase tracking-wide text-slate-800">Planes Aprobados</p>
                <p className="m-0 font-mono text-xs font-bold text-slate-900">RES 000289/11</p>
                <p className="m-0 font-mono text-xs text-slate-600">0800-3333-445</p>
              </div>
            </div>
          </div>
        </div>
      </LegalModal>

      {/* Modal 2: PARTICIPACIÓN Y RENDIMIENTOS */}
      <LegalModal
        isOpen={modalRendimientos}
        onClose={() => setModalRendimientos(false)}
        title="PARTICIPACIÓN EN LOS RESULTADOS FINANCIEROS"
      >
        <div className="space-y-4 text-slate-700">
          <div className="border-b border-slate-200 pb-3">
            <span className="inline-block rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              ARTÍCULO NOVENO · BASES TÉCNICAS
            </span>
            <p className="mt-3 text-base font-semibold leading-relaxed text-slate-900">
              Los Titulares participarán en los resultados de las inversiones de sus Reservas Matemáticas de acuerdo al siguiente esquema:
            </p>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">a-</span>
              <p className="m-0">
                Mensualmente se calculará la tasa de rendimiento promedio de las inversiones que respaldan a la Reserva Matemática. A tales efectos se tomarán los intereses devengados de los Títulos Públicos, los Alquileres, los Intereses de las Prendas e Hipotecas y todo otro rendimiento proveniente de las inversiones permitidas por el Decreto N° 142.277/43, sus modificaciones y de toda otra disposición futura sobre inversiones, dictada por el Organismo competente. La tasa de rendimiento promedio se obtiene dividiendo el total de la rentabilidad obtenida por el total de la Reserva Matemática invertida.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">b-</span>
              <p className="m-0">
                La unidad más el rendimiento determinado en (a) se lo dividirá por 1,00371 (uno más la tasa de interés técnico).
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">c-</span>
              <p className="m-0">
                El cociente determinado en (b) —que nunca podrá ser inferior a 1— menos la unidad será la tasa de rendimiento promedio mensual de las inversiones netas de la tasa técnica.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">d-</span>
              <p className="m-0">
                De esta tasa se participará el 50 % a los Titulares, lo que constituirá el coeficiente de participación.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">e-</span>
              <p className="m-0">
                El coeficiente de participación determinado en (d) se aplicará a las Reservas Matemáticas que dieron lugar a la rentabilidad, determinando de ese modo la participación en el resultado de las operaciones financieras de cada Titular.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-emerald-700">f-</span>
              <p className="m-0">
                La participación determinada en (e) se adicionará mensualmente a la Reserva Matemática del Titular, pero se contabilizará en forma separada a efectos de su mejor individualización. La participación en los resultados financieros determinada mediante el procedimiento indicado en el presente artículo, será invertida conjuntamente con la Reserva Matemática de cada Titular y participará de los rendimientos mensuales de las inversiones en los meses sucesivos. Al formar parte de la Reserva Matemática esta participación se cobrará: 1) en el momento en que el Titular solicite el Rescate, según el artículo octavo; ó 2) cuando salga favorecido por sorteo en la proporción correspondiente a la Reserva Matemática alcanzada ó 3) al final del vencimiento del plazo del contrato, según el artículo cuarto.
              </p>
            </div>
          </div>
        </div>
      </LegalModal>
    </footer>
  );
}

function RegretModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050914]/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      data-testid="modal-regret"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-gradient-to-b from-[#141f36] to-[#0c1424] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ff5a00]/40 bg-[#ff5a00]/20 text-[#ff8141]">
            <Mail size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white/50 transition-colors hover:text-white"
            aria-label="Cerrar modal"
            data-testid="button-close-regret"
          >
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="py-6 text-center">
            <h2 className="text-2xl font-bold text-white">Solicitud enviada</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Te contactaremos a la brevedad para gestionar tu solicitud de arrepentimiento dentro de los plazos legales.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] px-6 py-3 text-xs font-bold uppercase text-white shadow-lg"
              data-testid="button-close-sent"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-[#ff8141]">
              Derecho de Arrepentimiento
            </span>
            <h2 className="mt-1 text-2xl font-bold text-white">
              ¿Querés registrar tu solicitud?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Disponés de 10 días para revocar tu adhesión sin ningún costo. Ingresá tu correo electrónico para asentar la gestión:
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-5 w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3 text-sm text-white outline-none focus:border-[#ff5a00]"
              data-testid="input-regret-email"
            />
            <button
              type="button"
              onClick={() => setSent(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] py-3.5 text-sm font-bold uppercase text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.01]"
              data-testid="button-send-regret"
            >
              <span>Enviar Solicitud</span>
              <ArrowRight size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050914]/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      data-testid="modal-success"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#142338] to-[#0c1424] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
          <Check size={32} />
        </div>

        <h2 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">¡Estamos en contacto!</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Recibimos tus datos correctamente. Un asesor oficial de Fondus y Naranja X se comunicará con vos por WhatsApp para enviarte tu comprobante y número de sorteo oficial.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] py-3.5 text-sm font-bold uppercase text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.01]"
          data-testid="button-success-close"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]); // default 'elegido'
  const [regret, setRegret] = useState(false);
  const [success, setSuccess] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    scrollTo('adhesion');
  };

  return (
    <div className="app-shell grain">
      <NavigationBar onScrollTo={scrollTo} />

      <main className="relative z-10">
        <HeroSection onStart={() => scrollTo('planes')} />
        <PlansSection selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />
        <HowItWorksSection />
        <AdhesionSection
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
          onSuccess={() => setSuccess(true)}
        />
        <LegalFooter onRegret={() => setRegret(true)} />
      </main>

      <SocialProof />
      {regret && <RegretModal onClose={() => setRegret(false)} />}
      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;