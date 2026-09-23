import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
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

function StepHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10 lg:px-12 backdrop-blur-md">
      <div className="shrink-0">
        <LogoLockup />
      </div>

      <div
        className="hidden items-center gap-3 sm:flex"
        aria-label={`Paso ${step} de 5`}
        data-testid="step-progress"
      >
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((item) => (
            <span
              key={item}
              className={`h-2 rounded-full transition-all duration-300 ${
                item === step
                  ? 'w-8 bg-[#ff5a00]'
                  : item < step
                  ? 'w-4 bg-[#10b981]'
                  : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-xs font-bold text-white/70">
          Paso {step} de 5
        </span>
      </div>

      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="group flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition-all hover:border-[#ff5a00] hover:bg-[#ff5a00] hover:text-white"
          data-testid="button-back"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Volver</span>
        </button>
      ) : (
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Simulación 100% Online
          </span>
        </div>
      )}
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
      setNotice(`${item[0]} de ${item[1]} acaba de unirse al plan de ${item[2]}`);
      window.setTimeout(() => setNotice(null), 3600);
    };
    const interval = window.setInterval(show, 5000);
    const initial = window.setTimeout(show, 2000);
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
                className="text-white/40 transition-colors hover:text-white p-1"
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

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* 3D Interactive Canvas in Background (subtle depth) */}
      <div className="opacity-60 pointer-events-none">
        <Architectural3DCanvas />
      </div>

      <StepHeader step={1} onBack={() => undefined} />

      <main className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-12 sm:px-10 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-12">
        <div>
          {/* Trust Rating Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md"
            data-testid="badge-rating"
          >
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span>Google Rating 4.9</span>
            <span className="text-white/40">·</span>
            <span className="text-white/80 font-normal">Más de 15.000 clientes satisfechos</span>
          </div>

          {/* High-Converting Catchy Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Con <span className="text-[#ff6a12]">FONDUS</span> y{' '}
            <span className="whitespace-nowrap">Naranja <span className="text-[#ff6a12]">X</span></span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              vas a poder.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
            Ahorrá en pesos con cuotas accesibles y participá todos los meses por la adjudicación
            total de tu capital. <strong>Si tu número sale sorteado, ¡no pagás más cuotas y recibís todo el dinero!</strong>
          </p>

          {/* Prominent High Converting CTA Button */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ArchitecturalButton
              onClick={onStart}
              data-testid="button-start"
              className="w-full sm:w-auto text-base py-4 px-10 shadow-xl shadow-orange-500/25"
            >
              COMENZAR SIMULACIÓN GRATUITA
            </ArchitecturalButton>
          </div>

          {/* Value Micro-Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-white/10 pt-6 text-xs font-medium text-slate-300">
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
              Adjudicación mensual por Lotería
            </span>
          </div>
        </div>

        {/* Hero Visual Card with Warm Friendly Glow */}
        <div className="relative">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#ff5a00]/20 to-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#111c33] to-[#0c1424] p-3.5 shadow-2xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl bg-slate-900">
              <img
                src={`${import.meta.env.BASE_URL}assets/WhatsApp_Image_2026-09-10_at_12.28.22_PM_1790143148151.jpeg`}
                alt="Promoción Fondus y Naranja X por el sorteo de una moto 0KM"
                className="block aspect-[9/12] w-full object-cover object-top filter contrast-105"
                data-testid="img-hero-campaign"
              />

              {/* Floating Promoted Banner */}
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

            {/* Bottom Campaign Pill */}
            <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-white/10">
              <div>
                <span className="text-[11px] font-semibold text-white/60">SORTEO ESPECIAL</span>
                <p className="m-0 text-sm font-extrabold text-[#ff8141]">UNA MOTO 0KM</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/25">
                Participás gratis
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Bottom Bar */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 px-6 py-4 text-xs text-white/50 sm:px-10 lg:px-12">
        <span className="font-medium">FONDUS · El poder de tus ahorros con respaldo de Naranja X</span>
        <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">Planes aprobados por IGJ Resolución 289/11</span>
      </div>
    </div>
  );
}

function PlanSelector({
  onSelect,
  onBack,
}: {
  onSelect: (plan: Plan) => void;
  onBack: () => void;
}) {
  return (
    <div className="relative min-h-[100dvh]">
      <StepHeader step={2} onBack={onBack} />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12 lg:pt-14">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a] border border-[#ff5a00]/30 mb-3">
            Paso 2 de 5 · Elegí tu plan
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Un plan pensado para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              hacer realidad tu proyecto.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
            Elegí el monto que mejor se adapte a tus posibilidades. Capitalizás tus ahorros mes a mes y
            participás de los sorteos desde la primera cuota.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
                delay: index * 0.1,
              }}
              className="h-full"
            >
              <TiltCard
                featured={Boolean(plan.featured)}
                onClick={() => onSelect(plan)}
                className={`flex flex-col p-6 sm:p-7 text-left rounded-3xl border transition-all duration-300 ${
                  plan.featured
                    ? 'border-[#ff5a00] bg-gradient-to-b from-[#16223a] to-[#0f172a] shadow-[0_15px_45px_-10px_rgba(255,90,0,0.35)] ring-2 ring-[#ff5a00]/50'
                    : 'border-white/15 bg-gradient-to-b from-[#10192e] to-[#0a1122] shadow-xl hover:border-emerald-500/50 hover:shadow-emerald-500/10'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
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
                  <h2 className="mt-1 text-2xl font-black text-white">{plan.title}</h2>

                  {/* Capital */}
                  <div className="mt-5 rounded-2xl bg-white/5 p-4 border border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Capital a adjudicar
                    </span>
                    <p className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-[#ff8141]">
                      {plan.capital}
                    </p>
                  </div>

                  {/* Cuotas Breakdown */}
                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">Cuotas 1 a 4</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-white">{plan.first}</p>
                      <p className="text-[10px] text-white/40">Gastos adm. iniciales</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-emerald-400 font-bold">Desde cuota 5</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-emerald-400">{plan.regular}</p>
                      <p className="text-[10px] text-emerald-400/70 font-semibold">¡Baja de valor!</p>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-200">
                    <Benefit text="Sorteos mensuales desde cuota 1 (si ganás, no pagás más)" />
                    <Benefit text="Disponibilidad y rescate de fondos desde cuota 18" />
                    <Benefit text="Telemedicina 24/7 sin cargo para vos y tu familia" />
                    <Benefit text="Seguro de vida integral bonificado" />
                  </div>
                </div>

                {/* Card Button */}
                <div className="mt-8 pt-2">
                  <div
                    className={`flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all duration-200 ${
                      plan.featured
                        ? 'bg-gradient-to-r from-[#ff5a00] to-[#ff7a29] text-white shadow-lg shadow-orange-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    <span>Quiero este plan</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 text-xs sm:text-sm text-slate-300 border border-white/10 max-w-2xl mx-auto text-center">
          <CircleHelp size={16} className="text-emerald-400 shrink-0" />
          <span>
            Hacé click en cualquier tarjeta para continuar. Podrás revisar todos los detalles antes de confirmar.
          </span>
        </div>
      </main>
    </div>
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

function Advisor({
  plan,
  onChoose,
  onBack,
}: {
  plan: Plan;
  onChoose: (choice: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="relative min-h-[100dvh]">
      <StepHeader step={3} onBack={onBack} />

      <main className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-12 lg:pt-14">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a] border border-[#ff5a00]/30 mb-3">
            Paso 3 de 5 · Asignación de número
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Elegí cómo participar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              del sorteo mensual.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-slate-300">
            Sofia, tu asesora experta, te acompaña en el proceso para que tengas tu número de la suerte listo.
          </p>
        </div>

        {/* Chat UI Box */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#121c32] to-[#0c1424] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Header of Chat */}
          <div className="flex items-center gap-3.5 border-b border-white/10 pb-4">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5a00] to-[#ff7a29] text-base font-black text-white shadow-md shadow-orange-500/30">
                S
              </div>
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#121c32] bg-emerald-400" />
            </div>
            <div>
              <p className="m-0 text-sm font-bold text-white">Sofia</p>
              <p className="m-0 text-xs font-medium text-emerald-400">Asesora Digital Fondus · En línea</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <ChatBubble text="¡Hola! Soy Sofia. ¡Felicitaciones por dar este gran paso hacia tu capitalización con Fondus y Naranja X!" />
            <ChatBubble text="Tu plan opera con cuotas accesibles en pesos. Las primeras 4 cubren los gastos administrativos iniciales y a partir de la 5ta cuota baja al valor regular. ¡Y recordá: si salís adjudicado en el sorteo mensual, no abonás ninguna cuota más!" />

            {/* Selected Plan Summary Banner */}
            <div className="ml-auto max-w-[92%] rounded-2xl border border-[#ff5a00]/40 bg-[#ff5a00]/10 p-4 text-white shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff9b6a]">
                Plan seleccionado: {plan.title}
              </span>
              <p className="mt-1 text-base font-extrabold text-white">
                Capital {plan.capital} · Cuota regular {plan.regular}
              </p>
            </div>

            <ChatBubble text="Para participar del próximo sorteo oficial por Quiniela de la Ciudad, ¿cómo preferís definir tu número?" />

            {/* Selection Options */}
            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChoose('seleccionado')}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#ff5a00]/60 bg-gradient-to-br from-[#ff5a00]/20 to-[#ff5a00]/5 p-5 text-left transition-all hover:scale-[1.02] hover:border-[#ff5a00] hover:bg-[#ff5a00] hover:text-white shadow-lg shadow-orange-500/10"
                data-testid="button-select-number"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold text-white group-hover:text-white">
                    🎯 Elegir mi número
                  </span>
                  <ArrowRight size={16} className="text-[#ff8141] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <span className="mt-2 text-xs text-slate-300 group-hover:text-white/90">
                  Seleccioná tus 3 dígitos de la suerte
                </span>
              </button>

              <button
                type="button"
                onClick={() => onChoose('aleatorio')}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition-all hover:scale-[1.02] hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-white shadow-lg"
                data-testid="button-random-number"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold text-white">
                    🎲 Asignación al azar
                  </span>
                  <Sparkles size={16} className="text-emerald-400 group-hover:rotate-12 transition-all" />
                </div>
                <span className="mt-2 text-xs text-slate-300 group-hover:text-white/90">
                  Generá un número aleatorio al instante
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/10 p-4 text-sm leading-relaxed text-slate-200">
      {text}
    </div>
  );
}

function LuckyNumber({
  number,
  onContinue,
  onBack,
}: {
  number: string;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="relative min-h-[100dvh]">
      <StepHeader step={4} onBack={onBack} />

      <main className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-12 text-center sm:px-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/25">
          <Trophy size={32} />
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a] border border-[#ff5a00]/30">
          Paso 4 de 5 · Número asignado
        </span>

        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          ¡Tu número de la suerte <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            está registrado!
          </span>
        </h1>

        <p className="mt-3 text-base text-slate-300 max-w-lg">
          Con este número participás en la adjudicación oficial de fin de mes.
        </p>

        {/* Gamified Celebration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="relative mt-8 w-full max-w-md rounded-3xl border border-[#ff5a00]/50 bg-gradient-to-b from-[#16223a] to-[#0c1424] p-8 shadow-[0_20px_60px_-15px_rgba(255,90,0,0.3)]"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff9b6a]">
            Tu número oficial de adjudicación
          </span>

          <p
            className="mt-3 text-7xl sm:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(255,90,0,0.4)]"
            data-testid="text-lucky-number"
          >
            {number}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 px-4 text-xs font-semibold text-emerald-400 border border-white/10">
            <Check size={14} className="text-emerald-400" />
            <span>Participa en el sorteo de Quiniela LOTBA S.E.</span>
          </div>
        </motion.div>

        {/* Exclusive Benefit Callout */}
        <div className="mt-6 max-w-xl rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left backdrop-blur-md">
          <div className="flex gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
              <Gift size={20} />
            </div>
            <p className="m-0 text-sm leading-relaxed text-slate-200">
              <strong className="text-white font-bold">¡BENEFICIO EXCLUSIVO!</strong> Al
              continuar y vincular tu cuenta con <strong className="text-[#ff6a12]">Naranja X</strong>,
              tu cuota de suscripción inicial queda <strong className="text-emerald-300">100% bonificada ($0)</strong>.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ArchitecturalButton
            onClick={onContinue}
            data-testid="button-continue-lucky"
            className="text-base py-4 px-10 shadow-xl shadow-orange-500/25"
          >
            CONTINUAR AL REGISTRO
          </ArchitecturalButton>
        </div>
      </main>
    </div>
  );
}

function Adhesion({
  plan,
  number,
  onBack,
  onFinish,
}: {
  plan: Plan;
  number: string;
  onBack: () => void;
  onFinish: () => void;
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
      onFinish();
    }
  };

  return (
    <div className="relative min-h-[100dvh]">
      <StepHeader step={5} onBack={onBack} />

      <main className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:px-12 lg:pt-14">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/15 px-3.5 py-1 text-xs font-bold text-[#ff9b6a] border border-[#ff5a00]/30 mb-3">
            Paso 5 de 5 · Resumen y confirmación
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Repasemos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              los detalles de tu plan.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-slate-300">
            Revisá el resumen de tu suscripción y completá tus datos para que un asesor te contacte.
          </p>

          {/* Plan Summary Card */}
          <div className="mt-8 rounded-3xl border border-white/15 bg-gradient-to-b from-[#121c32] to-[#0c1424] p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Plan elegido</span>
                <p className="m-0 text-lg font-bold text-white">{plan.title}</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                N° {number}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-medium text-slate-400">Capital a adjudicar</span>
              <p className="text-3xl font-extrabold text-[#ff8141]">{plan.capital}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
              <div>
                <p className="m-0 text-xs text-slate-400">Cuotas 1 a 4</p>
                <p className="mt-1 text-lg font-bold text-white">{plan.first}</p>
              </div>
              <div>
                <p className="m-0 text-xs text-emerald-400 font-semibold">Desde cuota 5</p>
                <p className="mt-1 text-lg font-bold text-emerald-400">{plan.regular}</p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              Participás el último sábado de cada mes con el número asignado ({number}). Si salís adjudicado,
              no abonás ninguna cuota más. A partir del mes 18, disponés del rescate del capital acumulado.
            </p>
          </div>
        </div>

        {/* Adhesion Form Card */}
        <form
          onSubmit={submit}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#141f36] to-[#0c1424] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          data-testid="form-adhesion"
        >
          <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff5a00]/20 text-[#ff8141] border border-[#ff5a00]/40">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="m-0 text-lg font-bold text-white">Completá tus datos</h2>
              <p className="m-0 text-xs text-slate-300">
                Simulación segura, rápida y sin compromiso
              </p>
            </div>
          </div>

          <div
            className={`mt-6 space-y-4 transition-opacity duration-300 ${
              understands ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Nombre y Apellido
              </span>
              <input
                required
                disabled={!understands}
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
                  disabled={!understands}
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
                  disabled={!understands}
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/30"
                  placeholder="Ej: 11 5555 5555"
                  data-testid="input-whatsapp"
                />
              </label>
            </div>
          </div>

          {!understands && (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/10 p-3 text-xs font-semibold text-amber-300 border border-amber-500/20">
              <LockKeyhole size={14} className="shrink-0" />
              <span>Marcá la casilla inferior de confirmación para habilitar los campos.</span>
            </p>
          )}

          <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
            <label className="flex cursor-pointer items-start gap-3 text-xs sm:text-sm leading-relaxed text-slate-200">
              <input
                type="checkbox"
                checked={understands}
                onChange={(e) => setUnderstands(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-[#ff5a00] cursor-pointer"
                data-testid="checkbox-understands"
              />
              <span>Entiendo que me estoy suscribiendo a un sistema de capitalización y ahorro.</span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-xs sm:text-sm leading-relaxed text-slate-200">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-[#ff5a00] cursor-pointer"
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
      </main>
    </div>
  );
}

function LegalFooter({ onRegret }: { onRegret: () => void }) {
  const [modalSorteo, setModalSorteo] = useState(false);
  const [modalRendimientos, setModalRendimientos] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-[#070d1a] px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-400">
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
              {/* Botón 1: CONDICIONES GENERALES (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}condiciones.pdf`}
                download="condiciones.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a] shadow-md"
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
                <span className="mt-2 text-[11px] text-slate-400 leading-tight">
                  Objeto del contrato, cálculo de cuotas y normativas de la IGJ (PDF)
                </span>
              </a>

              {/* Botón 2: TÍTULO DE CAPITALIZACIÓN (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}titulo.pdf`}
                download="titulo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a] shadow-md"
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
                <span className="mt-2 text-[11px] text-slate-400 leading-tight">
                  Modelo del título, vigencia y capital nominal (PDF)
                </span>
              </a>

              {/* Botón 3: TABLA DE RESCATE Y ENDOSO (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}rescate.pdf`}
                download="rescate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#121f3a] shadow-md"
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
                <span className="mt-2 text-[11px] text-slate-400 leading-tight">
                  Valores de rescate para planes de 300 meses (PDF)
                </span>
              </a>

              {/* Botón 4: SORTEO (Modal) */}
              <button
                type="button"
                onClick={() => setModalSorteo(true)}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left transition-all duration-200 hover:border-emerald-500/50 hover:bg-[#121f3a] shadow-md"
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
                <span className="mt-2 text-[11px] text-slate-400 leading-tight">
                  Mecanismo y fechas de adjudicación mensual por Quiniela LOTBA S.E.
                </span>
              </button>

              {/* Botón 5: PARTICIPACIÓN Y RENDIMIENTOS (Modal) */}
              <button
                type="button"
                onClick={() => setModalRendimientos(true)}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1629] p-4 text-left transition-all duration-200 hover:border-emerald-500/50 hover:bg-[#121f3a] shadow-md"
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
                <span className="mt-2 text-[11px] text-slate-400 leading-tight">
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
          <p className="text-base font-semibold text-slate-900 leading-relaxed">
            El sorteo mensual se realiza a través de Quiniela de la Lotería de la Ciudad de Buenos Aires (LOTBA S.E.), el último sábado de cada mes, última jugada.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            En caso de que LOTBA S.E. no efectuase el último sábado sorteos de lotería, se tomará para la adjudicación el que realice LOTBA S.E. para sí el último sábado de cada mes como última jugada de Quiniela.
          </p>

          <p className="text-xs leading-relaxed text-slate-500 bg-slate-50 border border-slate-200 p-3 rounded-lg">
            Si LOTBA S.E. no realizara para sí, el último sábado de cada mes sorteos de Lotería o Quiniela, se tomará para la adjudicación, el primer sorteo de Quiniela que realice para sí LOTBA S.E. con posterioridad al último sábado sin sorteo.
          </p>

          {/* Pie del Modal con Logotipo IGJ */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-100 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tighter text-slate-900 font-sans">IGJ</span>
                  <svg className="w-8 h-8 text-sky-600 shrink-0" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="20" cy="20" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
                    <circle cx="20" cy="11" r="2.5" fill="currentColor" />
                    <circle cx="20" cy="29" r="2.5" fill="currentColor" />
                    <circle cx="11" cy="20" r="2.5" fill="currentColor" />
                    <circle cx="29" cy="20" r="2.5" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-[10px] leading-tight text-slate-600 border-l border-slate-300 pl-3">
                  <p className="font-semibold text-slate-800 m-0">Ministerio de Justicia y Derechos Humanos</p>
                  <p className="m-0 text-slate-500">Presidencia de la Nación</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-slate-300" />

              <div className="text-center sm:text-right">
                <p className="m-0 text-xs font-bold text-slate-800 uppercase tracking-wide">Planes Aprobados</p>
                <p className="m-0 text-xs font-mono font-bold text-slate-900">RES 000289/11</p>
                <p className="m-0 text-xs font-mono text-slate-600">0800-3333-445</p>
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
            <span className="inline-block rounded bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
              ARTÍCULO NOVENO · BASES TÉCNICAS
            </span>
            <p className="mt-3 text-base font-semibold text-slate-900 leading-relaxed">
              Los Titulares participarán en los resultados de las inversiones de sus Reservas Matemáticas de acuerdo al siguiente esquema:
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">a-</span>
              <p className="m-0">
                Mensualmente se calculará la tasa de rendimiento promedio de las inversiones que respaldan a la Reserva Matemática. A tales efectos se tomarán los intereses devengados de los Títulos Públicos, los Alquileres, los Intereses de las Prendas e Hipotecas y todo otro rendimiento proveniente de las inversiones permitidas por el Decreto N° 142.277/43, sus modificaciones y de toda otra disposición futura sobre inversiones, dictada por el Organismo competente. La tasa de rendimiento promedio se obtiene dividiendo el total de la rentabilidad obtenida por el total de la Reserva Matemática invertida.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">b-</span>
              <p className="m-0">
                La unidad más el rendimiento determinado en (a) se lo dividirá por 1,00371 (uno más la tasa de interés técnico).
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">c-</span>
              <p className="m-0">
                El cociente determinado en (b) —que nunca podrá ser inferior a 1— menos la unidad será la tasa de rendimiento promedio mensual de las inversiones netas de la tasa técnica.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">d-</span>
              <p className="m-0">
                De esta tasa se participará el 50 % a los Titulares, lo que constituirá el coeficiente de participación.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">e-</span>
              <p className="m-0">
                El coeficiente de participación determinado en (d) se aplicará a las Reservas Matemáticas que dieron lugar a la rentabilidad, determinando de ese modo la participación en el resultado de las operaciones financieras de cada Titular.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-bold text-emerald-700 shrink-0">f-</span>
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
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff5a00]/20 text-[#ff8141] border border-[#ff5a00]/40">
            <Mail size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 transition-colors hover:text-white p-1"
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Check size={32} />
        </div>

        <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white">¡Estamos en contacto!</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Recibimos tus datos correctamente. Un asesor oficial de Fondus y Naranja X se comunicará con vos por WhatsApp para finalizar tu adhesión y enviarte tu comprobante.
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
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [number, setNumber] = useState('');
  const [regret, setRegret] = useState(false);
  const [success, setSuccess] = useState(false);

  const luckyNumber = useMemo(() => String(100 + Math.floor(Math.random() * 899)), []);
  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const choosePlan = (selected: Plan) => {
    setPlan(selected);
    setStep(3);
  };
  const chooseNumber = () => {
    setNumber(luckyNumber);
    setStep(4);
  };

  return (
    <div className="app-shell grain">
      <div className="relative z-10">
        {step === 1 && <Hero onStart={() => setStep(2)} />}
        {step === 2 && <PlanSelector onSelect={choosePlan} onBack={goBack} />}
        {step === 3 && plan && <Advisor plan={plan} onChoose={chooseNumber} onBack={goBack} />}
        {step === 4 && (
          <LuckyNumber number={number} onContinue={() => setStep(5)} onBack={goBack} />
        )}
        {step === 5 && plan && (
          <Adhesion
            plan={plan}
            number={number}
            onBack={goBack}
            onFinish={() => setSuccess(true)}
          />
        )}
        <LegalFooter onRegret={() => setRegret(true)} />
      </div>

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