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
  MessageCircle,
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
import TextMaskReveal from '@/components/ui/TextMaskReveal';
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
    title: 'Ideal para empezar',
    capital: '$7.500.000',
    first: '$43.800',
    regular: '$25.875',
    eyebrow: 'Capital inicial y ahorro',
  },
  {
    id: 'elegido',
    title: 'El más elegido',
    capital: '$10.000.000',
    first: '$58.400',
    regular: '$34.500',
    eyebrow: 'Equilibrio · Vehículo 0KM',
    featured: true,
  },
  {
    id: 'mayor',
    title: 'Mayor capital',
    capital: '$20.000.000',
    first: '$116.800',
    regular: '$69.000',
    eyebrow: 'Vivienda y proyectos de escala',
  },
];

const socialProof = [
  ['Martín G.', 'Córdoba', '$10.000.000'],
  ['Valeria R.', 'Mendoza', '$20.000.000'],
  ['Luciano P.', 'Rosario', '$7.500.000'],
  ['Agustina M.', 'Buenos Aires', 'Auto 0KM'],
];

function LogoLockup() {
  return (
    <div className="flex items-center gap-3 select-none" data-testid="brand-lockup">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="display text-[1.65rem] font-black tracking-[-0.07em] text-[#f4f4ee]">
            fondus
          </span>
          <span className="h-6 w-px bg-white/20" />
          <span className="display text-[1.35rem] font-black tracking-[-0.06em] text-[#ff6a12]">
            Naranja<span className="text-[#f4f4ee]">X</span>
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase -mt-0.5">
          SISTEMA DE CAPITALIZACIÓN
        </span>
      </div>
    </div>
  );
}

function StepHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-10 lg:px-12">
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
              className={`h-1.5 w-7 transition-all duration-300 ${
                item <= step ? 'bg-[#ff5a00]' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 font-mono text-xs font-bold tracking-[0.2em] text-white/50">
          0{step} / 05
        </span>
      </div>
      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="group flex shrink-0 items-center gap-2.5 border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono font-bold tracking-[0.12em] uppercase text-white/70 transition-colors hover:border-[#ff5a00] hover:text-white"
          data-testid="button-back"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          VOLVER
        </button>
      ) : (
        <div className="text-right">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff7b35]">
            FASE INICIAL
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-white/45 sm:inline-block">
            ARQUITECTURA DE CAPITAL
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
      setNotice(`${item[0]} de ${item[1]} se acaba de adherir al plan de ${item[2]}`);
      window.setTimeout(() => setNotice(null), 3200);
    };
    const interval = window.setInterval(show, 4500);
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
          initial={{ opacity: 0, rotateX: 85, y: 35, scale: 0.94 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, rotateX: -85, y: 25, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          style={{ perspective: 1000 }}
          className={`fixed bottom-6 z-40 w-[calc(100%-2.5rem)] max-w-[340px] ${
            side === 'left' ? 'left-5 sm:left-8' : 'right-5 sm:right-8'
          }`}
          data-testid="social-proof"
        >
          <div className="relative overflow-hidden border border-white/20 bg-[#091122]/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Architectural corner markings */}
            <span className="absolute top-0 left-0 h-1.5 w-1.5 border-t-2 border-l-2 border-[#ff5a00]" />
            <span className="absolute top-0 right-0 h-1.5 w-1.5 border-t-2 border-r-2 border-[#ff5a00]" />
            <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b-2 border-l-2 border-[#ff5a00]" />
            <span className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b-2 border-r-2 border-[#ff5a00]" />

            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#ff5a00]/40 bg-[#ff5a00]/15 text-[#ff8751]">
                <BadgeCheck size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#a6d2b9]">
                  // ADHESIÓN EN TIEMPO REAL
                </p>
                <p className="m-0 mt-1 text-xs font-medium leading-5 text-white/90">{notice}</p>
              </div>
              <button
                type="button"
                className="text-white/40 transition-colors hover:text-white"
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
    <div className="relative min-h-[100dvh] overflow-hidden blueprint-grid">
      {/* 3D Interactive Canvas in Background */}
      <Architectural3DCanvas />

      <StepHeader step={1} onBack={() => undefined} />

      {/* Blueprint Subgrid overlay */}
      <div className="absolute inset-0 blueprint-subgrid pointer-events-none opacity-40" />

      {/* Technical Blueprint Border Guides */}
      <div className="pointer-events-none absolute left-6 top-28 hidden font-mono text-[9px] tracking-[0.2em] text-white/20 lg:block select-none">
        AXIS: 31.4201° S / 64.1888° W
      </div>
      <div className="pointer-events-none absolute right-6 top-28 hidden font-mono text-[9px] tracking-[0.2em] text-white/20 lg:block select-none">
        SYS.FONDUS.V4 // ARCH-MINIMAL
      </div>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-24 lg:px-12">
        <div>
          {/* Rating Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2.5 border border-[#83bea3]/30 bg-[#83bea3]/10 px-3.5 py-1.5 text-xs font-mono font-bold tracking-[0.1em] text-[#a6d2b9]"
            data-testid="badge-rating"
          >
            <Star size={13} fill="currentColor" />
            <span>GOOGLE RATING 4.9</span>
            <span className="flex gap-0.5 text-[#ffb537]" aria-label="5 estrellas">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} size={11} fill="currentColor" />
              ))}
            </span>
          </div>

          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ff7b35]">
            // UNA ALIANZA PARA MIRAR HACIA ADELANTE
          </p>

          {/* Masked Headline Reveal */}
          <TextMaskReveal
            className="display text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-[#f4f4ee]"
            lines={[
              {
                words: [
                  { text: 'Con' },
                  { text: 'FONDUS', className: 'text-[#ff6a12]' },
                ],
              },
              {
                words: [
                  { text: 'y' },
                  { text: 'Naranja' },
                  { text: 'X', className: 'text-[#f4f4ee]' },
                ],
              },
              {
                words: [
                  { text: 'vas', className: 'text-[#a6d2b9]' },
                  { text: 'a', className: 'text-[#a6d2b9]' },
                  { text: 'poder.', className: 'text-[#a6d2b9]' },
                ],
              },
            ]}
          />

          <p className="mt-8 max-w-lg text-base sm:text-lg font-light leading-relaxed text-white/65">
            Elegí tu plan de capitalización en pesos, conocé tus beneficios y comenzá a construir tu
            objetivo patrimonial con respaldo institucional.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ArchitecturalButton onClick={onStart} data-testid="button-start">
              INICIAR SIMULACIÓN
            </ArchitecturalButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs font-mono text-white/45">
            <span className="flex items-center gap-2">
              <LockKeyhole size={14} className="text-[#a6d2b9]" /> 100% ONLINE
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#a6d2b9]" /> SIN COMPROMISO
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#ff7b35]" /> ADJUDICACIÓN MENSUAL
            </span>
          </div>
        </div>

        {/* Hero Visual Card with Architectural Frame */}
        <div className="relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-6 bg-[#ff5a00]/10 blur-3xl rounded-none pointer-events-none" />

          <div className="relative border border-white/20 bg-[#091224]/80 p-3 shadow-2xl backdrop-blur-md">
            {/* Technical corner indicators */}
            <span className="absolute -top-1 -left-1 font-mono text-[10px] text-[#ff7b35] select-none">+</span>
            <span className="absolute -top-1 -right-1 font-mono text-[10px] text-[#ff7b35] select-none">+</span>
            <span className="absolute -bottom-1 -left-1 font-mono text-[10px] text-[#ff7b35] select-none">+</span>
            <span className="absolute -bottom-1 -right-1 font-mono text-[10px] text-[#ff7b35] select-none">+</span>

            <div className="relative overflow-hidden border border-white/10 bg-[#eaf0ed]">
              <img
                src={`${import.meta.env.BASE_URL}assets/WhatsApp_Image_2026-09-10_at_12.28.22_PM_1790143148151.jpeg`}
                alt="Promoción Fondus y Naranja X por el sorteo de una moto 0KM"
                className="block aspect-[9/13] w-full object-cover object-top sm:aspect-[9/11] lg:aspect-[9/12] filter contrast-105"
                data-testid="img-hero-campaign"
              />

              {/* Frosted Banner Inside Card */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between border border-white/15 bg-[#091224]/90 px-4 py-3.5 backdrop-blur-md">
                <div>
                  <p className="m-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a6d2b9]">
                    // BENEFICIO EXCLUSIVO
                  </p>
                  <p className="m-0 mt-1 text-sm font-bold text-white">
                    Cuota de suscripción bonificada
                  </p>
                </div>
                <Gift size={24} className="text-[#ff6a12]" />
              </div>
            </div>

            {/* Floating Technical Badge */}
            <div className="absolute -bottom-5 -left-4 hidden border border-white/20 bg-[#121c2e] px-4 py-3 shadow-2xl sm:block">
              <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                PARTICIPÁS POR
              </p>
              <p className="m-0 font-mono text-base font-black tracking-tight text-[#ff8141]">
                UNA MOTO 0KM
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-t border-white/10 px-6 py-5 font-mono text-xs text-white/35 sm:px-10 lg:px-12">
        <span>FONDUS · EL PODER DE TUS AHORROS</span>
        <span>ARGENTINA // REG. IGJ 289/11</span>
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
    <div className="relative min-h-[100dvh] blueprint-grid">
      <StepHeader step={2} onBack={onBack} />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-10 lg:px-12 lg:pt-16">
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ff7b35]">
            // PASO 02 · ESTRUCTURA DEL PLAN
          </p>
          <h1 className="display text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">
            Un plan para cada <br />
            <span className="text-[#a6d2b9]">proyecto patrimonial.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg font-light leading-relaxed text-white/60">
            Tres alternativas con la misma solidez: capitalizar tus ahorros en cuotas en pesos y
            participar por adjudicación desde la primera cuota.
          </p>
        </div>

        {/* Plans Grid with Framer Motion Spring Scroll Reveal */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: index * 0.12,
              }}
              className="h-full"
            >
              <TiltCard
                featured={Boolean(plan.featured)}
                onClick={() => onSelect(plan)}
                className={`flex flex-col p-7 text-left border ${
                  plan.featured
                    ? 'border-[#ff5a00] bg-[#121d33] shadow-[0_0_50px_rgba(255,90,0,0.18)]'
                    : 'border-white/12 bg-[#0a1224]/80 hover:border-[#ff5a00]/60'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {/* Header of Card */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#a6d2b9]">
                      // SPEC.0{index + 1}
                    </span>
                    {plan.featured && (
                      <span className="border border-[#ff5a00] bg-[#ff5a00]/20 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#ff8751]">
                        RECOMENDADO
                      </span>
                    )}
                  </div>

                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                    {plan.eyebrow}
                  </p>
                  <h2 className="display mt-1 text-2xl font-black text-white">{plan.title}</h2>

                  <div className="mt-6 border-b border-white/10 pb-6">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      CAPITAL A ADJUDICAR
                    </span>
                    <p className="display mt-1 text-4xl sm:text-5xl font-black tracking-[-0.06em] text-[#ff8141]">
                      {plan.capital}
                    </p>
                  </div>

                  {/* Quota breakdown */}
                  <div className="mt-5 grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                        Cuotas 1 a 4
                      </p>
                      <p className="display mt-1 text-xl font-bold text-white">{plan.first}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                        Desde cuota 5
                      </p>
                      <p className="display mt-1 text-xl font-bold text-[#a6d2b9]">{plan.regular}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mt-6 space-y-3.5 text-xs text-white/75 font-normal">
                    <Benefit text="Sorteos mensuales desde cuota 1; si ganás, no pagás más" />
                    <Benefit text="Disponibilidad de fondos desde cuota 18" />
                    <Benefit text="Telemedicina 24/7 sin cargo" />
                    <Benefit text="Seguro de vida integral incluido" />
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-8 pt-4">
                  <div
                    className={`group/btn relative overflow-hidden flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-mono font-black tracking-[0.15em] uppercase border transition-colors ${
                      plan.featured
                        ? 'border-[#ff5a00] bg-[#ff5a00] text-[#0b1329]'
                        : 'border-white/20 bg-white/5 text-white group-hover:border-[#ff5a00] group-hover:bg-[#ff5a00] group-hover:text-[#0b1329]'
                    }`}
                  >
                    <span>SELECCIONAR PLAN</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 flex items-center gap-2 font-mono text-xs text-white/40">
          <CircleHelp size={14} className="text-[#a6d2b9]" />
          Seleccioná cualquier tarjeta para avanzar. Podrás revisar y confirmar todos los términos
          antes de la suscripción.
        </p>
      </main>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <span className="flex items-start gap-2.5">
      <Check size={14} className="mt-0.5 shrink-0 text-[#a6d2b9]" strokeWidth={2.5} />
      <span className="leading-snug">{text}</span>
    </span>
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
    <div className="relative min-h-[100dvh] blueprint-grid">
      <StepHeader step={3} onBack={onBack} />

      <main className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-12 lg:pt-16">
        <div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#a6d2b9]/40 bg-[#a6d2b9]/10 text-[#a6d2b9]">
            <MessageCircle size={26} />
          </div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ff7b35]">
            // PASO 03 · ASESORÍA DIGITAL
          </p>
          <h1 className="display text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">
            Hablemos de <br />
            <span className="text-[#a6d2b9]">tu número.</span>
          </h1>
          <p className="mt-5 max-w-md text-base sm:text-lg font-light leading-relaxed text-white/60">
            Sofia, tu asesora experta, te guía sobre la modalidad de asignación antes del sorteo
            oficial.
          </p>
        </div>

        <div className="relative border border-white/15 bg-[#0a1224]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Corner brackets */}
          <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff5a00]" />

          <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
            <div className="flex h-10 w-10 items-center justify-center bg-[#ff5a00] font-mono font-black text-[#0a1224]">
              S
            </div>
            <div>
              <p className="m-0 text-sm font-bold text-white">Sofia</p>
              <p className="m-0 font-mono text-[11px] text-[#a6d2b9]">// ASESORA DIGITAL · ONLINE</p>
            </div>
            <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-white/40">
              <span className="h-2 w-2 rounded-full bg-[#83bea3] animate-pulse" /> ACTIVA
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <ChatBubble text="Hola, soy Sofia. ¡Felicitaciones por dar este paso hacia tu capitalización con Fondus y Naranja X!" />
            <ChatBubble text="Tu plan opera en cuotas fijas y en pesos. Las primeras 4 cuotas cubren los gastos administrativos iniciales y desde la 5ta baja al valor regular. ¡Si salís adjudicado por sorteo, no pagás ninguna cuota más!" />

            <div className="ml-auto max-w-[90%] border border-[#ff5a00]/50 bg-[#ff5a00]/15 p-4 text-sm font-semibold text-white">
              <p className="m-0 font-mono text-[10px] uppercase tracking-wider text-[#ff8751]">
                PLAN SELECCIONADO
              </p>
              <p className="mt-1 text-base font-bold text-white">
                {plan.capital} · {plan.regular} desde cuota 5
              </p>
            </div>

            <ChatBubble text="Para participar del sorteo mensual, ¿cómo preferís determinar tu número de adhesión?" />

            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onChoose('seleccionado')}
                className="group relative flex items-center justify-between border border-[#ff5a00]/60 bg-[#ff5a00]/10 p-4 text-left font-mono text-xs font-bold tracking-wider text-[#ff9b6a] transition-all hover:bg-[#ff5a00] hover:text-[#0a1224]"
                data-testid="button-select-number"
              >
                <span>SELECCIONAR MI NÚMERO</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => onChoose('aleatorio')}
                className="group relative flex items-center justify-between border border-white/15 bg-white/5 p-4 text-left font-mono text-xs font-bold tracking-wider text-white/80 transition-all hover:border-[#a6d2b9] hover:bg-[#a6d2b9]/15 hover:text-white"
                data-testid="button-random-number"
              >
                <span>ASIGNACIÓN ALEATORIA</span>
                <Sparkles size={15} className="text-[#a6d2b9]" />
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
    <div className="max-w-[90%] border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/85">
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
    <div className="relative min-h-[100dvh] blueprint-grid">
      <StepHeader step={4} onBack={onBack} />

      <main className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center sm:px-10">
        <div className="flex h-16 w-16 items-center justify-center border border-[#a6d2b9]/40 bg-[#a6d2b9]/10 text-[#a6d2b9]">
          <Trophy size={30} />
        </div>

        <p className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ff7b35]">
          // PASO 04 · NÚMERO DE SORTEO ASIGNADO
        </p>

        <h1 className="display mt-3 text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">
          Ya sos parte del <br />
          <span className="text-[#a6d2b9]">próximo sorteo.</span>
        </h1>

        {/* Gamification Box wrapped in Framer Motion spring scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative mt-12 w-full max-w-md border border-[#ff5a00]/60 bg-[#0c162a]/95 p-8 shadow-[0_0_60px_rgba(255,90,0,0.2)]"
        >
          {/* Technical corner markers */}
          <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff5a00]" />

          <p className="m-0 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ffab80]">
            NÚMERO ASIGNADO EN SISTEMA
          </p>

          <p
            className="display mt-3 font-mono text-8xl sm:text-9xl font-black tracking-tight text-[#ff7132]"
            data-testid="text-lucky-number"
          >
            {number}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-white/50 border-t border-white/10 pt-4">
            <Check size={14} className="text-[#a6d2b9]" /> REGISTRADO PARA EL SORTEO MENSUAL
          </div>
        </motion.div>

        {/* Exclusive Benefit Callout */}
        <div className="mt-8 max-w-xl border border-[#a6d2b9]/30 bg-[#a6d2b9]/10 p-5 text-left">
          <div className="flex gap-3.5">
            <Gift className="mt-0.5 shrink-0 text-[#ffb537]" size={22} />
            <p className="m-0 text-sm leading-relaxed text-white/80">
              <strong className="text-white font-bold">¡BENEFICIO EXCLUSIVO!</strong> Al
              continuar y vincular tu cuenta con <strong className="text-[#ff6a12]">Naranja X</strong>,
              tu cuota de suscripción queda <strong className="text-[#a6d2b9]">100% bonificada</strong>.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ArchitecturalButton onClick={onContinue} data-testid="button-continue-lucky">
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
    <div className="relative min-h-[100dvh] blueprint-grid">
      <StepHeader step={5} onBack={onBack} />

      <main className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-12 lg:pt-16">
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ff7b35]">
            // PASO 05 · REVISIÓN Y REGISTRO
          </p>
          <h1 className="display text-4xl sm:text-6xl font-black tracking-[-0.05em] text-white">
            Repasemos <br />
            <span className="text-[#a6d2b9]">los detalles.</span>
          </h1>
          <p className="mt-5 max-w-md text-base sm:text-lg font-light leading-relaxed text-white/60">
            Revisá el resumen de tu plan de capitalización y completá tus datos de contacto para
            simular la adhesión.
          </p>

          <div className="mt-8 border border-white/15 bg-[#0a1224]/85 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                PLAN SELECCIONADO
              </p>
              <span className="border border-[#a6d2b9]/40 bg-[#a6d2b9]/15 px-3 py-1 font-mono text-xs font-bold text-[#a6d2b9]">
                NÚMERO {number}
              </span>
            </div>

            <p className="display mt-5 text-4xl font-black text-white">{plan.capital}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="m-0 font-mono text-xs text-white/45">Cuotas 1 a 4</p>
                <p className="display mt-1 text-xl font-bold text-[#ff8141]">{plan.first}</p>
              </div>
              <div>
                <p className="m-0 font-mono text-xs text-white/45">Desde cuota 5</p>
                <p className="display mt-1 text-xl font-bold text-[#ff8141]">{plan.regular}</p>
              </div>
            </div>

            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/65">
              Participás el último sábado de cada mes con el número asignado ({number}). Si salís
              adjudicado, no abonás ninguna cuota más. A partir del mes 18, disponés del rescate del
              capital acumulado.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={submit}
          className="relative border border-white/15 bg-[#0a1224]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          data-testid="form-adhesion"
        >
          {/* Corner brackets */}
          <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff5a00]" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff5a00]" />

          <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
            <div className="flex h-10 w-10 items-center justify-center border border-[#ff5a00]/40 bg-[#ff5a00]/15 text-[#ff8141]">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="m-0 text-lg font-bold text-white">Completá tus datos</h2>
              <p className="m-0 mt-0.5 font-mono text-xs text-white/45">
                // SIMULACIÓN SEGURA Y SIN COMPROMISO
              </p>
            </div>
          </div>

          <div
            className={`mt-6 space-y-4 transition-opacity ${
              understands ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                Nombre completo
              </span>
              <input
                required
                disabled={!understands}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-white/15 bg-[#0c1628] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]"
                placeholder="Por ejemplo, María González"
                data-testid="input-name"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  DNI
                </span>
                <input
                  required
                  disabled={!understands}
                  value={form.dni}
                  onChange={(e) => setForm({ ...form, dni: e.target.value })}
                  className="w-full border border-white/15 bg-[#0c1628] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]"
                  placeholder="Tu número de documento"
                  data-testid="input-dni"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  WhatsApp
                </span>
                <input
                  required
                  disabled={!understands}
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full border border-white/15 bg-[#0c1628] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#ff5a00]"
                  placeholder="11 5555 5555"
                  data-testid="input-whatsapp"
                />
              </label>
            </div>
          </div>

          {!understands && (
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-[#ffb18e]">
              <LockKeyhole size={14} /> Marcá la casilla inferior para confirmar y habilitar el
              formulario.
            </p>
          )}

          <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/80">
              <input
                type="checkbox"
                checked={understands}
                onChange={(e) => setUnderstands(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#ff5a00]"
                data-testid="checkbox-understands"
              />
              <span>Entiendo que me estoy suscribiendo a un sistema de capitalización y ahorro.</span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/80">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#ff5a00]"
                data-testid="checkbox-terms"
              />
              <span>Acepto las bases y condiciones contractuales.</span>
            </label>
          </div>

          <div className="mt-8">
            <ArchitecturalButton
              type="submit"
              disabled={!valid || sent}
              className="w-full py-4 text-sm"
              data-testid="button-adhere"
            >
              {sent ? 'SOLICITUD RECIBIDA' : 'ADHERIRME CON NARANJA X'}
            </ArchitecturalButton>
          </div>

          <p className="mt-4 flex justify-center gap-2 font-mono text-center text-[11px] text-white/40">
            <ShieldCheck size={14} /> Tus datos están cifrados y se utilizan únicamente para la
            simulación.
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
    <footer className="border-t border-white/10 bg-[#070c18] px-6 py-12 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <LogoLockup />
            <p className="mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-white/50">
              El poder de tus ahorros. Una alianza institucional entre Fondus y Naranja X para
              impulsar tus metas con transparencia y solidez.
            </p>
            <button
              type="button"
              onClick={onRegret}
              className="mt-6 flex items-center gap-2 border border-[#ff5a00]/50 bg-[#ff5a00]/10 px-4 py-2.5 font-mono text-xs font-bold text-[#ff9b6a] transition-colors hover:bg-[#ff5a00] hover:text-[#0a1224]"
              data-testid="button-regret"
            >
              <Mail size={14} /> BOTÓN DE ARREPENTIMIENTO · 10 DÍAS
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 bg-[#ff5a00]" />
              <p className="m-0 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                CONDICIONES GENERALES
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Botón 1: CONDICIONES GENERALES (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}condiciones.pdf`}
                download="condiciones.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-white/10 bg-[#0b1424] p-3.5 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#0f1b30]"
                data-testid="button-legal-condiciones-generales"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    CONDICIONES GENERALES
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center bg-[#a6d2b9]/10 text-[#a6d2b9] group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-white/50 leading-tight">
                  Objeto del contrato, cálculo de cuotas y normativas de la IGJ (PDF)
                </span>
              </a>

              {/* Botón 2: TÍTULO DE CAPITALIZACIÓN (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}titulo.pdf`}
                download="titulo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-white/10 bg-[#0b1424] p-3.5 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#0f1b30]"
                data-testid="button-legal-título-de-capitalización"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    TÍTULO DE CAPITALIZACIÓN
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center bg-[#a6d2b9]/10 text-[#a6d2b9] group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-white/50 leading-tight">
                  Modelo del título, vigencia y capital nominal (PDF)
                </span>
              </a>

              {/* Botón 3: TABLA DE RESCATE Y ENDOSO (Descarga PDF) */}
              <a
                href={`${import.meta.env.BASE_URL}rescate.pdf`}
                download="rescate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-white/10 bg-[#0b1424] p-3.5 text-left transition-all duration-200 hover:border-[#ff5a00]/50 hover:bg-[#0f1b30]"
                data-testid="button-legal-tabla-de-rescate-y-endoso"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#ff9b6a]">
                    TABLA DE RESCATE Y ENDOSO
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center bg-[#a6d2b9]/10 text-[#a6d2b9] group-hover:bg-[#ff5a00]/20 group-hover:text-[#ff8141]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-white/50 leading-tight">
                  Valores de rescate para planes de 300 meses (PDF)
                </span>
              </a>

              {/* Botón 4: SORTEO (Modal) */}
              <button
                type="button"
                onClick={() => setModalSorteo(true)}
                className="group flex flex-col justify-between border border-white/10 bg-[#0b1424] p-3.5 text-left transition-all duration-200 hover:border-[#a6d2b9]/50 hover:bg-[#0f1b30]"
                data-testid="button-legal-sorteo"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#a6d2b9]">
                    SORTEO
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center bg-white/10 text-white/70 group-hover:bg-[#a6d2b9]/20 group-hover:text-[#a6d2b9]">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-white/50 leading-tight">
                  Mecanismo y fechas de adjudicación mensual por Quiniela LOTBA S.E.
                </span>
              </button>

              {/* Botón 5: PARTICIPACIÓN Y RENDIMIENTOS (Modal) */}
              <button
                type="button"
                onClick={() => setModalRendimientos(true)}
                className="group flex flex-col justify-between border border-white/10 bg-[#0b1424] p-3.5 text-left transition-all duration-200 hover:border-[#a6d2b9]/50 hover:bg-[#0f1b30]"
                data-testid="button-legal-participación-y-rendimientos"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#a6d2b9]">
                    PARTICIPACIÓN Y RENDIMIENTOS
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center bg-white/10 text-white/70 group-hover:bg-[#a6d2b9]/20 group-hover:text-[#a6d2b9]">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-white/50 leading-tight">
                  Participación en los resultados de Reservas Matemáticas
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[11px] text-white/40 sm:flex-row sm:justify-between">
          <span>PLANES AUTORIZADOS POR IGJ N° RES. 289/11</span>
          <span className="font-bold text-[#ff9b6a]">NO CONTAMOS CON COBRADORES A DOMICILIO</span>
          <span>© FONDUS · NARANJA X · TODOS LOS DERECHOS RESERVADOS</span>
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
            <span className="inline-block rounded bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
              ARTÍCULO NOVENO · BASES TÉCNICAS
            </span>
            <p className="mt-3 text-base font-semibold text-slate-900 leading-relaxed">
              Los Titulares participarán en los resultados de las inversiones de sus Reservas Matemáticas de acuerdo al siguiente esquema:
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">a-</span>
              <p className="m-0">
                Mensualmente se calculará la tasa de rendimiento promedio de las inversiones que respaldan a la Reserva Matemática. A tales efectos se tomarán los intereses devengados de los Títulos Públicos, los Alquileres, los Intereses de las Prendas e Hipotecas y todo otro rendimiento proveniente de las inversiones permitidas por el Decreto N° 142.277/43, sus modificaciones y de toda otra disposición futura sobre inversiones, dictada por el Organismo competente. La tasa de rendimiento promedio se obtiene dividiendo el total de la rentabilidad obtenida por el total de la Reserva Matemática invertida.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">b-</span>
              <p className="m-0">
                La unidad más el rendimiento determinado en (a) se lo dividirá por 1,00371 (uno más la tasa de interés técnico).
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">c-</span>
              <p className="m-0">
                El cociente determinado en (b) —que nunca podrá ser inferior a 1— menos la unidad será la tasa de rendimiento promedio mensual de las inversiones netas de la tasa técnica.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">d-</span>
              <p className="m-0">
                De esta tasa se participará el 50 % a los Titulares, lo que constituirá el coeficiente de participación.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">e-</span>
              <p className="m-0">
                El coeficiente de participación determinado en (d) se aplicará a las Reservas Matemáticas que dieron lugar a la rentabilidad, determinando de ese modo la participación en el resultado de las operaciones financieras de cada Titular.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="font-mono font-bold text-emerald-700 shrink-0">f-</span>
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
      <div className="relative w-full max-w-md border border-white/20 bg-[#0c1628] p-6 shadow-2xl sm:p-8">
        <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#ff5a00]" />
        <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#ff5a00]" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#ff5a00]" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#ff5a00]" />

        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center border border-[#ff5a00]/40 bg-[#ff5a00]/15 text-[#ff8141]">
            <Mail size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 transition-colors hover:text-white"
            aria-label="Cerrar modal"
            data-testid="button-close-regret"
          >
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="py-6">
            <h2 className="display text-2xl font-bold text-white">Solicitud enviada.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Te contactaremos para gestionar tu solicitud de arrepentimiento dentro de los próximos
              días hábiles.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 border border-[#ff5a00] bg-[#ff5a00] px-6 py-3 font-mono text-xs font-black uppercase text-[#0a1224]"
              data-testid="button-close-sent"
            >
              CERRAR
            </button>
          </div>
        ) : (
          <>
            <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff8141]">
              DERECHO DE ARREPENTIMIENTO
            </p>
            <h2 className="display mt-2 text-2xl font-bold text-white">
              ¿Querés registrar tu solicitud?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Disponés de 10 días para revocar tu adhesión. Dejanos tu correo para registrar la
              gestión formal.
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-5 w-full border border-white/15 bg-[#070c18] px-4 py-3 text-sm text-white outline-none focus:border-[#ff5a00]"
              data-testid="input-regret-email"
            />
            <button
              type="button"
              onClick={() => setSent(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 border border-[#ff5a00] bg-[#ff5a00] py-3.5 font-mono text-xs font-black uppercase text-[#0a1224] transition-transform hover:scale-[1.01]"
              data-testid="button-send-regret"
            >
              <span>ENVIAR SOLICITUD</span>
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
      <div className="relative w-full max-w-md border border-[#a6d2b9]/40 bg-[#0c1628] p-8 text-center shadow-2xl">
        <span className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-[#a6d2b9]" />
        <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-[#a6d2b9]" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#a6d2b9]" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#a6d2b9]" />

        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#a6d2b9]/40 bg-[#a6d2b9]/15 text-[#a6d2b9]">
          <Check size={28} />
        </div>

        <h2 className="display mt-5 text-3xl font-black text-white">¡Estamos en contacto!</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Recibimos tus datos. Un asesor oficial de Naranja X se comunicará con vos para finalizar
          la adhesión a tu plan de capitalización.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 border border-[#ff5a00] bg-[#ff5a00] px-8 py-3.5 font-mono text-xs font-black uppercase text-[#0a1224]"
          data-testid="button-success-close"
        >
          FINALIZAR
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