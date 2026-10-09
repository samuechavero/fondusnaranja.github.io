import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
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
import PromoNaranjaX from '@/pages/PromoNaranjaX';
import PaymentForm, { type PaymentData } from '@/components/PaymentForm';

const queryClient = new QueryClient();

type Plan = {
  id: string;
  capital: string;
  first: string;
  regular: string;
  totalCuotas: number;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: '10m',
    capital: '$10.000.000',
    first: '$58.000',
    regular: '$34.500',
    totalCuotas: 300,
    featured: true,
  },
  {
    id: '20m',
    capital: '$20.000.000',
    first: '$116.000',
    regular: '$69.000',
    totalCuotas: 300,
  },
  {
    id: '30m',
    capital: '$30.000.000',
    first: '$174.000',
    regular: '$103.500',
    totalCuotas: 300,
  },
];

const socialProof = [
  { name: 'Romina', plan: 'Plan de $10.000.000' },
  { name: 'Martín', plan: 'Plan de $20.000.000' },
  { name: 'Valeria', plan: 'Plan de $10.000.000' },
  { name: 'Gonzalo', plan: 'Plan de $30.000.000' },
  { name: 'Luciana', plan: 'Plan de $20.000.000' },
  { name: 'Esteban', plan: 'Plan de $30.000.000' },
  { name: 'Camila', plan: 'Plan de $10.000.000' },
  { name: 'Nicolás', plan: 'Plan de $20.000.000' },
  { name: 'Facundo', plan: 'Plan de $30.000.000' },
  { name: 'Julieta', plan: 'Plan de $10.000.000' },
];

function LogoLockup() {
  return (
    <div className="flex items-center gap-3 select-none" data-testid="brand-lockup">
      <div className="flex items-center gap-2">
        <svg
          className="w-7 h-7 text-[#1d497f] drop-shadow-sm"
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
        <span className="text-2xl font-black tracking-tight text-[#1d497f] font-sans lowercase">
          fondus
        </span>
      </div>

      <span className="h-5 w-px bg-slate-300" />

      <span className="text-xl font-black tracking-tight text-orange-500 font-sans">
        Naranja<span className="text-orange-500">X</span>
      </span>
    </div>
  );
}

function NavigationBar({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/20 bg-white/95 px-6 py-3.5 backdrop-blur-md sm:px-10 lg:px-12 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <LogoLockup />

        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={() => onScrollTo('planes')}
            className="text-xs font-semibold text-slate-700 transition-colors hover:text-[#1d497f]"
          >
            Planes
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('como-funciona')}
            className="text-xs font-semibold text-slate-700 transition-colors hover:text-[#1d497f]"
          >
            Cómo Funciona
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('legal')}
            className="text-xs font-semibold text-slate-700 transition-colors hover:text-[#1d497f]"
          >
            Marco Legal
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onScrollTo('adhesion')}
            className="rounded-full bg-[#FF5900] hover:bg-[#e54f00] px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
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
      setNotice(`${item.name} se ha suscrito a un ${item.plan.toLowerCase()}`);
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
          <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF5900] text-white shadow-md shadow-orange-500/30">
                <BadgeCheck size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Adhesión reciente
                </p>
                <p className="m-0 mt-1 text-xs font-semibold leading-relaxed text-slate-800">
                  {notice}
                </p>
              </div>
              <button
                type="button"
                className="p-1 text-slate-400 transition-colors hover:text-slate-700 cursor-pointer"
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
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:px-12">
        {/* Tarjeta Blanca Contenedora Izquierda */}
        <div className="bg-white rounded-2xl shadow-xl p-7 sm:p-9 border border-white/60">
          {/* Trust Rating Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-[#1d497f] shadow-sm"
            data-testid="badge-rating"
          >
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Google Rating 4.9</span>
            <span className="text-slate-300">·</span>
            <span className="font-normal text-slate-600">Más de 15.000 clientes satisfechos</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#1d497f] sm:text-5xl lg:text-6xl tracking-tight">
            con <span className="text-[#1d497f]">FONDUS</span> y <span className="text-[#FF5900]">naranja X</span> vas a poder
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 font-normal sm:text-lg">
            Ahorrá con cuotas accesibles y participá todos los meses por la adjudicación. Si tu número sale sorteado, ¡NO PAGÁS MÁS y recibís el total de tu plan!
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onStart}
              type="button"
              data-testid="button-start"
              className="w-full sm:w-auto rounded-xl bg-[#FF5900] hover:bg-[#e54f00] text-white font-extrabold text-base px-9 py-4 shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
            >
              VER PLANES Y SIMULAR
            </button>
          </div>
        </div>

        {/* Hero Visual Card con YouTube Short */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-slate-100">
          <div className="relative overflow-hidden rounded-xl bg-black flex justify-center items-center max-w-[340px] mx-auto shadow-lg aspect-[9/16]">
            <iframe
              src="https://www.youtube.com/embed/HOoj83e5WRs"
              className="w-full h-full aspect-[9/16] rounded-xl"
              title="Sorteo Oficial Fondus x Naranja X"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Banner de Beneficio Exclusivo */}
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-[#FF5900]">
                  <Gift size={12} /> Beneficio Exclusivo
                </span>
                <p className="m-0 mt-1 text-sm font-bold text-[#1d497f]">
                  Cuota de suscripción bonificada
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF5900] text-white shadow-md shadow-orange-500/30">
                <Gift size={24} />
              </div>
            </div>
          </div>

          {/* Sorteo Especial */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500">SORTEO ESPECIAL</span>
              <p className="m-0 text-sm font-extrabold text-[#1d497f]">UNA MOTO 0KM</p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Participás gratis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#FF5900]">
        <Check size={11} strokeWidth={3} />
      </div>
      <span className="leading-snug text-slate-700 font-medium">{text}</span>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Elegí tu Plan y Cuota',
      desc: 'Seleccioná el monto de capital que querés alcanzar. Pagás cuotas fijas y accesibles en pesos.',
      icon: <Sparkles className="text-[#FF5900]" size={24} />,
    },
    {
      num: '02',
      title: 'Sorteo Mensual por Lotería',
      desc: 'Participás el último sábado de cada mes a través de Lotería de la Ciudad (LOTBA S.E.).',
      icon: <Trophy className="text-[#FF5900]" size={24} />,
    },
    {
      num: '03',
      title: 'Adjudicación o Rescate',
      desc: 'Si salís adjudicado, no pagás ninguna cuota más y cobrás el total. Si no, acumulás tu capital y podés rescatarlo desde el mes 18.',
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
    },
  ];

  return (
    <section id="como-funciona" className="relative scroll-mt-20 px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-white/60">
        <div className="text-center max-w-2xl mx-auto">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
            Simple, transparente y seguro
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1d497f] sm:text-5xl">
            ¿Cómo funciona el sistema?
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Un modelo de capitalización respaldado por la Inspección General de Justicia (IGJ) para
            que cumplas tus objetivos con tranquilidad.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative rounded-2xl border border-slate-100 bg-slate-50 p-7 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm">
                  {st.icon}
                </div>
                <span className="font-mono text-2xl font-black text-slate-300">{st.num}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1d497f] mb-2">{st.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROVINCIAS_ARG = [
  'Buenos Aires',
  'Ciudad Autónoma de Buenos Aires (CABA)',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

const ESTADOS_CIVILES = [
  'Soltero/a',
  'Casado/a',
  'Unión Convivencial',
  'Divorciado/a',
  'Viudo/a',
];

interface ContactFormData {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  estadoCivil: string;
  provincia: string;
  localidad: string;
  telefono: string;
  email: string;
}

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  planCapital: string;
}

function TermsModal({ isOpen, onClose, onAccept, planCapital }: TermsModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasScrolledToBottom(false);
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
          const { scrollHeight, clientHeight } = scrollContainerRef.current;
          if (scrollHeight <= clientHeight + 30) {
            setHasScrolledToBottom(true);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 35) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          data-testid="modal-terms"
        >
          {/* Fondo oscuro traslúcido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Tarjeta Modal Blanca Centrada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] sm:max-h-[82vh] flex flex-col rounded-2xl bg-white text-slate-800 shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 sm:px-6 py-4 bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-[#FF5900] shadow-sm">
                  <FileText size={19} />
                </div>
                <div>
                  <h3 className="m-0 text-sm sm:text-base font-bold text-[#1d497f]">
                    Términos y Condiciones de Fondus S.A.
                  </h3>
                  <p className="m-0 text-[11px] text-slate-500">
                    Contrato de Capitalización y Ahorro · Res. IGJ 000289/11
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Cerrar modal de términos"
                data-testid="button-close-terms"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenedor desplazable con scroll obligatorio */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="p-5 sm:p-7 overflow-y-auto leading-relaxed text-xs sm:text-sm text-slate-700 space-y-4 select-text max-h-[58vh]"
              data-testid="terms-scroll-container"
            >
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 flex items-start gap-3 text-xs text-blue-900">
                <ShieldCheck size={18} className="text-[#1d497f] shrink-0 mt-0.5" />
                <p className="m-0 leading-relaxed">
                  Por favor, leé atentamente los términos y condiciones de tu adhesión. Para habilitar la aceptación, es obligatorio desplazarse hasta el final del documento.
                </p>
              </div>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  1. Marco Legal y Régimen de Autorización
                </h4>
                <p className="m-0 leading-relaxed">
                  Fondus S.A. de Capitalización y Ahorro (en adelante, la "Sociedad Emisora"), sociedad debidamente autorizada para operar bajo el régimen de la Inspección General de Justicia de la Nación (IGJ) mediante Resolución N° 000289/11, en cumplimiento del Decreto del Poder Ejecutivo Nacional N° 142.277/43 y normas complementarias, emite Títulos de Capitalización mediante suscripción directa.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  2. Objeto del Contrato y Plan de Capitalización
                </h4>
                <p className="m-0 leading-relaxed">
                  El presente contrato instrumenta un plan de ahorro y capitalización a un plazo estipulado de 300 (trescientos) meses, con pagos de cuotas mensuales consecutivas conforme al valor nominal suscripto ({planCapital}). Los importes abonados integran la Reserva Matemática del suscriptor conforme a las bases técnicas aprobadas por la IGJ.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  3. Mecanismo de Adjudicación Exclusivo por Sorteo Oficial
                </h4>
                <p className="m-0 leading-relaxed">
                  La adjudicación del capital total suscripto se rige estricta y exclusivamente mediante sorteo oficial mensual realizado a través de la Lotería de la Ciudad de Buenos Aires (LOTBA S.E.), correspondiente a la última jugada del último sábado de cada mes.
                </p>
                <p className="m-0 leading-relaxed">
                  En caso de que el número de título asignado al suscriptor coincida con el sorteo oficial mensual de LOTBA S.E., el suscriptor resulta automáticamente adjudicado por la totalidad del capital contratado, quedando totalmente liberado del pago de todas las cuotas mensuales subsiguientes del plan. La adjudicación opera únicamente bajo este mecanismo oficial certificado.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  4. Alianza Comercial con Naranja X y Bonificación de Suscripción
                </h4>
                <p className="m-0 leading-relaxed">
                  En virtud del convenio institucional con Naranja X, el suscriptor accede al beneficio exclusivo de <strong>Suscripción Bonificada al 100%</strong> ($0 costo de emisión y apertura de legajo).
                </p>
                <p className="m-0 leading-relaxed">
                  Se deja expresa constancia de que la bonificación aplica de forma directa y exclusiva al costo de suscripción inicial. Las cuotas mensuales del plan de capitalización comenzarán a devengarse según el cronograma acordado: las cuotas 1 a 4 incluyen los gastos administrativos iniciales de conformación de legajo, y desde la cuota 5 en adelante rige el valor regular bonificado.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  5. Medio de Pago y Adhesión al Débito Automático
                </h4>
                <p className="m-0 leading-relaxed">
                  Para acceder al beneficio de suscripción bonificada, el titular adhiere el pago periódico de sus cuotas mediante débito recurrente sobre su tarjeta emitida por Tarjeta Naranja S.A. (Naranja X, BIN homologado 5895). El titular autoriza a procesar los cargos mensuales en las fechas de liquidación pactadas.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  6. Derecho de Rescate de Fondos (Reserva Matemática)
                </h4>
                <p className="m-0 leading-relaxed">
                  A partir de la cuota 18 inclusive abonada, el suscriptor goza del derecho adquirido de solicitar el rescate parcial o total de los fondos acumulados en su Reserva Matemática, con arreglo a la Tabla Oficial de Rescate aprobada por la IGJ en el Título de Capitalización y al Decreto N° 142.277/43.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  7. Participación en Rendimientos Financieros
                </h4>
                <p className="m-0 leading-relaxed">
                  De conformidad con el Artículo Noveno de las Bases Técnicas aprobadas por la Inspección General de Justicia, los titulares participan activamente del 50% de la tasa de rendimiento promedio mensual de las inversiones que respaldan a las Reservas Matemáticas, capitalizándose mensualmente en su saldo a favor.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  8. Facultad de Revocación y Derecho de Arrepentimiento
                </h4>
                <p className="m-0 leading-relaxed">
                  El suscriptor podrá revocar su aceptación y rescindir su contrato dentro de un plazo perentorio de 10 (diez) días corridos contados desde la confirmación digital de la solicitud, sin costo ni penalidad alguna, en cumplimiento del Artículo 34 de la Ley N° 24.240 de Defensa del Consumidor.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  9. Confidencialidad y Protección de Datos Personales
                </h4>
                <p className="m-0 leading-relaxed">
                  Los datos personales suministrados son tratados bajo estricta confidencialidad de conformidad con la Ley N° 25.326 de Protección de los Datos Personales. El titular autoriza su utilización para la emisión del Título, gestión administrativa de la póliza y comunicación oficial vía canales habilitados.
                </p>
              </section>

              <section className="space-y-1.5 border-t border-slate-200 pt-3">
                <h4 className="m-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1d497f]">
                  10. Declaración de Conformidad
                </h4>
                <p className="m-0 leading-relaxed text-slate-800 font-medium">
                  Al hacer clic en "Aceptar Términos y Condiciones", el titular certifica que ha leído, comprendido y aceptado en su totalidad las condiciones generales y particulares que rigen la presente operación de capitalización y ahorro bajo supervisión de la IGJ.
                </p>
              </section>
            </div>

            {/* Pie del modal con advertencia de scroll y botones de acción */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 sm:px-6 py-4 shrink-0 flex flex-col gap-3">
              {!hasScrolledToBottom && (
                <div
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl py-2 px-3 text-center"
                  data-testid="terms-scroll-prompt"
                >
                  <ChevronDown size={16} className="animate-bounce shrink-0" />
                  <span>Desplazate hasta el final del texto para habilitar el botón de aceptación</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  data-testid="button-cancel-terms"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={!hasScrolledToBottom}
                  onClick={onAccept}
                  className={`rounded-xl px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    hasScrolledToBottom
                      ? 'bg-[#FF5900] hover:bg-[#e54f00] text-white shadow-lg shadow-orange-500/25 active:scale-[0.98] cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                  data-testid="button-accept-terms"
                >
                  <CheckCircle2 size={16} />
                  <span>Aceptar Términos y Condiciones</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface SuccessScreenProps {
  onReset: () => void;
}

function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6 bg-white w-full"
      data-testid="pantalla-de-exito"
    >
      {/* 2. Encabezado y Texto de Confirmación */}
      <h2 className="text-3xl font-bold text-[#1d497f] mb-4">
        ¡Adhesión Registrada con Éxito!
      </h2>

      <p className="text-gray-600 mb-6 max-w-md text-sm sm:text-base leading-relaxed">
        Recibimos tus datos y la vinculación de tu medio de pago correctamente. Tu cuota de suscripción inicial se encuentra bonificada por la alianza con Naranja X. Te contactaremos por WhatsApp con tu póliza digital y número de sorteo oficial de LOTBA S.E.
      </p>

      {/* 3. Incrustar Video (YouTube Shorts) */}
      <iframe
        src="https://www.youtube.com/embed/-5DSp3pNvmI"
        className="w-full max-w-[300px] aspect-[9/16] rounded-2xl shadow-xl mx-auto mb-8 border-none"
        title="Video Bienvenida Fondus"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {/* 4. Botones de Acción (Finalizar y Reiniciar) */}
      <button
        type="button"
        onClick={onReset}
        className="bg-[#FF5900] text-white font-bold py-4 px-8 rounded-xl w-full max-w-md mb-4 hover:bg-[#e54f00] transition-colors cursor-pointer shadow-lg shadow-orange-500/20 active:scale-[0.99]"
        data-testid="button-finalizar-exito"
      >
        Finalizar
      </button>

      <button
        type="button"
        onClick={onReset}
        className="text-sm text-gray-500 underline cursor-pointer mb-8 hover:text-gray-800 transition-colors bg-transparent border-none p-0"
        data-testid="button-inicio-exito"
      >
        Toca acá para ir al inicio
      </button>

      {/* 5. Footer Final */}
      <div className="text-xs text-gray-400 font-medium select-none" data-testid="footer-institucional-exito">
        fondus | Agencia Digital
      </div>
    </div>
  );
}

function WizardSection({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]); // default $10.000.000
  const [contactForm, setContactForm] = useState<ContactFormData>({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    estadoCivil: '',
    provincia: '',
    localidad: '',
    telefono: '',
    email: '',
  });

  // Paso 3: Checkboxes obligatorios y modal legal
  const [understands, setUnderstands] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleTermsTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!terms) {
      setShowTermsModal(true);
    } else {
      setTerms(false);
    }
  };

  const scrollToWizard = () => {
    const el = document.getElementById('planes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep(2);
    scrollToWizard();
  };

  const isStep2Valid = Boolean(
    contactForm.nombre.trim() &&
    contactForm.apellido.trim() &&
    contactForm.dni.trim() &&
    contactForm.fechaNacimiento &&
    contactForm.estadoCivil &&
    contactForm.provincia &&
    contactForm.localidad.trim() &&
    contactForm.telefono.trim() &&
    contactForm.email.trim()
  );

  const handleStep2Submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    setStep(3);
    scrollToWizard();
  };

  const handleStep3Submit = () => {
    if (!understands || !terms) return;
    setStep(4);
    scrollToWizard();
  };

  const handleResetWizard = () => {
    setStep(1);
    setSelectedPlan(plans[0]);
    setContactForm({
      nombre: '',
      apellido: '',
      dni: '',
      fechaNacimiento: '',
      estadoCivil: '',
      provincia: '',
      localidad: '',
      telefono: '',
      email: '',
    });
    setUnderstands(false);
    setTerms(false);
    scrollToWizard();
  };

  const handlePaymentSubmit = (data: PaymentData) => {
    console.log('Pago de adhesión procesado:', data);
    setStep(5);
    scrollToWizard();
    onSuccess();
  };

  return (
    <section id="planes" className="relative scroll-mt-20 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 bg-slate-50/50">
      <div className="mx-auto max-w-6xl">

        {/* Stepper Wizard Indicator (4 Pasos) */}
        {step <= 4 && (
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-200 -z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#FF5900] -z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />

              {[
                { num: 1, label: 'Plan' },
                { num: 2, label: 'Tus datos' },
                { num: 3, label: 'Confirmación' },
                { num: 4, label: 'Pago Naranja X' },
              ].map((s) => {
                const isPassed = step > s.num;
                const isCurrent = step === s.num;

                return (
                  <div key={s.num} className="flex flex-col items-center z-10">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm transition-all shadow-sm ${
                        isPassed
                          ? 'bg-[#1d497f] text-white'
                          : isCurrent
                          ? 'bg-[#FF5900] text-white ring-4 ring-orange-100 scale-110'
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                      }`}
                    >
                      {isPassed ? <Check size={18} strokeWidth={3} /> : s.num}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold whitespace-nowrap hidden sm:block ${
                        isCurrent ? 'text-[#1d497f]' : isPassed ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PASO 1: SELECCIÓN DE PLAN (SOLO TARJETAS DE CAPITAL) */}
        {/* ==================================================== */}
        {step === 1 && (
          <div>
            <div className="max-w-3xl text-left bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-slate-200 mb-8">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#FF5900]">
                Paso 1 de 4: Selección de Capital
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1d497f] sm:text-5xl">
                Elegí tu Capital a Adjudicar
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                Tus ahorros se capitalizan mes a mes generando intereses a tu favor y participás por la adjudicación mensual por lotería desde la primera cuota.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => {
                const isChosen = selectedPlan.id === plan.id;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="h-full"
                  >
                    <div
                      onClick={() => handleSelectPlan(plan)}
                      className={`flex flex-col justify-between h-full rounded-2xl border p-6 text-left transition-all duration-300 sm:p-7 bg-white shadow-md hover:shadow-xl cursor-pointer group ${
                        isChosen
                          ? 'border-[#FF5900] ring-2 ring-[#FF5900] shadow-orange-500/10'
                          : plan.featured
                          ? 'border-orange-300'
                          : 'border-slate-200 hover:border-[#1d497f]/40'
                      }`}
                      data-testid={`card-plan-${plan.id}`}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Opción 0{index + 1}
                          </span>
                          {plan.featured && (
                            <span className="rounded-full bg-[#FF5900] px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-sm">
                              ⭐ Más Elegido
                            </span>
                          )}
                        </div>

                        {/* Monto de Capital únicamente (sin etiquetas descriptivas) */}
                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Capital a Adjudicar
                          </span>
                          <p className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-[#FF5900]">
                            {plan.capital}
                          </p>
                        </div>

                        {/* Detalle de Cuotas */}
                        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <div>
                            <p className="text-[11px] font-medium text-slate-500">Cuotas 1 a 4</p>
                            <p className="mt-1 text-lg font-bold text-[#1d497f] sm:text-xl">
                              {plan.first}
                            </p>
                            <p className="text-[10px] text-slate-400">Gastos adm. iniciales</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-emerald-700">Desde cuota 5</p>
                            <p className="mt-1 text-lg font-bold text-emerald-700 sm:text-xl">
                              {plan.regular}
                            </p>
                            <p className="text-[10px] font-semibold text-emerald-600">
                              300 cuotas fijas
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3 text-xs text-slate-700 sm:text-sm">
                          <Benefit text="Sorteos mensuales desde cuota 1 (si ganás, no pagás más)" />
                          <Benefit text="Disponibilidad y rescate de fondos desde cuota 18" />
                          <Benefit text="Telemedicina 24/7 sin cargo para vos y tu familia" />
                          <Benefit text="Seguro de vida integral bonificado" />
                        </div>
                      </div>

                      <div className="mt-8 pt-2">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold bg-[#FF5900] group-hover:bg-[#e54f00] text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                        >
                          <span>Elegir {plan.capital}</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* PASO 2: TUS DATOS DE CONTACTO (9 CAMPOS ESTRICTOS)   */}
        {/* ==================================================== */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-9 border border-slate-200">
              {/* Header Paso 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-[#FF5900]">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="m-0 text-xl font-bold text-[#1d497f]">Tus datos de contacto</h3>
                    <p className="m-0 text-xs text-slate-500">Paso 2 de 4: Completá los 9 datos del titular</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 self-start sm:self-auto">
                  <span className="text-xs text-slate-500">Capital:</span>
                  <span className="text-xs font-extrabold text-[#FF5900]">{selectedPlan.capital}</span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="ml-1 text-[11px] text-[#1d497f] underline hover:text-[#FF5900] font-semibold cursor-pointer"
                  >
                    Cambiar
                  </button>
                </div>
              </div>

              {/* Formulario Estricto de 9 Campos */}
              <form onSubmit={handleStep2Submit} className="mt-6 space-y-4">
                {/* 1. Nombre y 2. Apellido */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Nombre *
                    </span>
                    <input
                      required
                      value={contactForm.nombre}
                      onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      placeholder="Ej: Juan"
                      data-testid="input-nombre"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Apellido *
                    </span>
                    <input
                      required
                      value={contactForm.apellido}
                      onChange={(e) => setContactForm({ ...contactForm, apellido: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      placeholder="Ej: Pérez"
                      data-testid="input-apellido"
                    />
                  </label>
                </div>

                {/* 3. DNI y 4. Fecha de Nacimiento */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      DNI *
                    </span>
                    <input
                      required
                      value={contactForm.dni}
                      onChange={(e) => setContactForm({ ...contactForm, dni: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      placeholder="Sin puntos ni espacios"
                      data-testid="input-dni"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Fecha de Nacimiento *
                    </span>
                    <input
                      required
                      type="date"
                      value={contactForm.fechaNacimiento}
                      onChange={(e) => setContactForm({ ...contactForm, fechaNacimiento: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      data-testid="input-fecha-nacimiento"
                    />
                  </label>
                </div>

                {/* 5. Estado Civil y 6. Provincia */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Estado Civil *
                    </span>
                    <select
                      required
                      value={contactForm.estadoCivil}
                      onChange={(e) => setContactForm({ ...contactForm, estadoCivil: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      data-testid="select-estado-civil"
                    >
                      <option value="">Seleccioná estado civil</option>
                      {ESTADOS_CIVILES.map((ec) => (
                        <option key={ec} value={ec}>{ec}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Provincia *
                    </span>
                    <select
                      required
                      value={contactForm.provincia}
                      onChange={(e) => setContactForm({ ...contactForm, provincia: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      data-testid="select-provincia"
                    >
                      <option value="">Seleccioná tu provincia</option>
                      {PROVINCIAS_ARG.map((pr) => (
                        <option key={pr} value={pr}>{pr}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* 7. Localidad */}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                    Localidad *
                  </span>
                  <input
                    required
                    value={contactForm.localidad}
                    onChange={(e) => setContactForm({ ...contactForm, localidad: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                    placeholder="Ej: Córdoba Capital"
                    data-testid="input-localidad"
                  />
                </label>

                {/* 8. Teléfono y 9. Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Teléfono / WhatsApp *
                    </span>
                    <input
                      required
                      type="tel"
                      value={contactForm.telefono}
                      onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      placeholder="Ej: 11 5555 5555"
                      data-testid="input-telefono"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
                      Email *
                    </span>
                    <input
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/20"
                      placeholder="Ej: juan@ejemplo.com"
                      data-testid="input-email"
                    />
                  </label>
                </div>

                {/* Botones de acción Paso 2 */}
                <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-5 py-3.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    ← Volver a Selección de Plan
                  </button>

                  <button
                    type="submit"
                    disabled={!isStep2Valid}
                    className="flex-1 rounded-xl bg-[#FF5900] hover:bg-[#e54f00] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    data-testid="button-continuar-paso-3"
                  >
                    <span>CONTINUAR A CONFIRMACIÓN</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* PASO 3: CONFIRMACIÓN Y CHECKBOXES OBLIGATORIOS       */}
        {/* ==================================================== */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-9 border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600">
                  <BadgeCheck size={24} />
                </div>
                <div>
                  <h3 className="m-0 text-xl font-bold text-[#1d497f]">Resumen y Confirmación</h3>
                  <p className="m-0 text-xs text-slate-500">Paso 3 de 4: Revisá tu orden de compra</p>
                </div>
              </div>

              {/* Tarjeta de Resumen: Orden de compra, cuotas (300) y valores */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase text-slate-500">Orden de Compra Elegida</span>
                  <span className="text-xl font-black text-[#FF5900]">{selectedPlan.capital}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <p className="m-0 text-slate-500">Cantidad de cuotas</p>
                    <p className="m-0 mt-1 font-bold text-base text-[#1d497f]">300 meses</p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <p className="m-0 text-slate-500">Cuotas 1 a 4</p>
                    <p className="m-0 mt-1 font-bold text-base text-[#1d497f]">{selectedPlan.first} / mes</p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3">
                    <p className="m-0 text-emerald-700 font-semibold">Desde cuota 5</p>
                    <p className="m-0 mt-1 font-bold text-base text-emerald-700">{selectedPlan.regular} / mes</p>
                  </div>
                  <div className="rounded-xl bg-orange-50 border border-orange-200 p-3">
                    <p className="m-0 text-[#FF5900] font-semibold">Beneficio Naranja X</p>
                    <p className="m-0 mt-1 font-bold text-sm text-[#FF5900]">Suscripción Bonificada</p>
                  </div>
                </div>

                {/* Datos del titular */}
                <div className="rounded-xl bg-white border border-slate-200 p-4 text-xs space-y-1.5">
                  <p className="m-0 font-bold text-[#1d497f] text-sm mb-2">Datos del Titular Registrado:</p>
                  <p className="m-0 text-slate-700"><strong>Nombre:</strong> {contactForm.nombre} {contactForm.apellido}</p>
                  <p className="m-0 text-slate-700"><strong>DNI:</strong> {contactForm.dni}</p>
                  <p className="m-0 text-slate-700"><strong>Fecha de Nacimiento:</strong> {contactForm.fechaNacimiento} · <strong>Estado Civil:</strong> {contactForm.estadoCivil}</p>
                  <p className="m-0 text-slate-700"><strong>Ubicación:</strong> {contactForm.localidad}, {contactForm.provincia}</p>
                  <p className="m-0 text-slate-700"><strong>Contacto:</strong> {contactForm.telefono} · {contactForm.email}</p>
                </div>
              </div>

              {/* Los 2 Checkboxes Obligatorios requeridos */}
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <input
                    type="checkbox"
                    checked={understands}
                    onChange={(e) => setUnderstands(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#FF5900]"
                    data-testid="checkbox-understands-wizard"
                  />
                  <span>Entiendo que estoy contratando un plan de capitalizacion y ahorro</span>
                </label>

                <div
                  className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-700 sm:text-sm select-none"
                  onClick={handleTermsTriggerClick}
                  data-testid="terms-trigger-row"
                >
                  <input
                    type="checkbox"
                    checked={terms}
                    readOnly
                    onClick={handleTermsTriggerClick}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#FF5900]"
                    data-testid="checkbox-terms-wizard"
                  />
                  <span>
                    Acepto los{' '}
                    <span className="font-bold text-[#1d497f] underline hover:text-[#FF5900]">
                      Términos y Condiciones de Fondus S.A.
                    </span>
                  </span>
                </div>
              </div>

              {/* Botones de acción Paso 3 */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-5 py-3.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  ← Modificar datos
                </button>

                <button
                  type="button"
                  onClick={handleStep3Submit}
                  disabled={!understands || !terms}
                  className="flex-1 rounded-xl bg-[#FF5900] hover:bg-[#e54f00] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-6 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  data-testid="button-continuar-paso-4"
                >
                  <span>CONTINUAR A PAGO NARANJA X</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* PASO 4: PAGO NARANJA X (VALIDACIÓN BIN 5895 ACTIVA)  */}
        {/* ==================================================== */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentForm
              planTitle={selectedPlan.capital}
              planCapital={selectedPlan.capital}
              planRegular={selectedPlan.regular}
              initialDni={contactForm.dni}
              initialName={`${contactForm.nombre} ${contactForm.apellido}`.trim()}
              onBack={() => setStep(3)}
              onSubmitPayment={handlePaymentSubmit}
            />
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* PASO FINAL: PANTALLA DE ÉXITO                        */}
        {/* ==================================================== */}
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden"
          >
            <SuccessScreen onReset={handleResetWizard} />
          </motion.div>
        )}

        {/* Modal de Términos y Condiciones interactivo con scroll obligatorio */}
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAccept={() => {
            setTerms(true);
            setShowTermsModal(false);
          }}
          planCapital={selectedPlan.capital}
        />
      </div>
    </section>
  );
}

function LegalFooter({ onRegret }: { onRegret: () => void }) {
  const [modalSorteo, setModalSorteo] = useState(false);
  const [modalRendimientos, setModalRendimientos] = useState(false);

  return (
    <footer id="legal" className="border-t border-slate-200 bg-white px-6 py-12 sm:px-10 lg:px-12 text-slate-700">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <div className="inline-block bg-white px-3.5 py-1.5 rounded-2xl shadow-sm">
              <LogoLockup />
            </div>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500 sm:text-sm">
              El poder de tus ahorros. Una alianza institucional entre Fondus y Naranja X para
              impulsar tus metas con total transparencia y respaldo.
            </p>
            <button
              type="button"
              onClick={onRegret}
              className="mt-6 flex items-center gap-2 rounded-xl border border-[#FF5900]/40 bg-[#FF5900]/10 px-4 py-2.5 text-xs font-bold text-[#FF5900] transition-all hover:bg-[#FF5900] hover:text-white cursor-pointer"
              data-testid="button-regret"
            >
              <Mail size={14} /> Botón de Arrepentimiento (10 días)
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#FF5900]" />
              <p className="m-0 text-xs font-bold uppercase tracking-wider text-[#1d497f]">
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
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-all duration-200 hover:border-[#FF5900]/50 hover:bg-orange-50/30"
                data-testid="button-legal-condiciones-generales"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d497f] group-hover:text-[#FF5900]">
                    Condiciones Generales
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-[#FF5900]/20 group-hover:text-[#FF5900]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-500">
                  Objeto del contrato, cálculo de cuotas y normativas de la IGJ (PDF)
                </span>
              </a>

              {/* Botón 2: TÍTULO DE CAPITALIZACIÓN */}
              <a
                href={`${import.meta.env.BASE_URL}titulo.pdf`}
                download="titulo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-all duration-200 hover:border-[#FF5900]/50 hover:bg-orange-50/30"
                data-testid="button-legal-título-de-capitalización"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d497f] group-hover:text-[#FF5900]">
                    Título de Capitalización
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-[#FF5900]/20 group-hover:text-[#FF5900]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-500">
                  Modelo del título, vigencia y capital nominal (PDF)
                </span>
              </a>

              {/* Botón 3: TABLA DE RESCATE Y ENDOSO */}
              <a
                href={`${import.meta.env.BASE_URL}rescate.pdf`}
                download="rescate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-all duration-200 hover:border-[#FF5900]/50 hover:bg-orange-50/30"
                data-testid="button-legal-tabla-de-rescate-y-endoso"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d497f] group-hover:text-[#FF5900]">
                    Tabla de Rescate
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-[#FF5900]/20 group-hover:text-[#FF5900]">
                    <Download size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-500">
                  Valores de rescate para planes de 300 meses (PDF)
                </span>
              </a>

              {/* Botón 4: SORTEO (Modal) */}
              <button
                type="button"
                onClick={() => setModalSorteo(true)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-all duration-200 hover:border-[#FF5900]/50 hover:bg-orange-50/30 cursor-pointer"
                data-testid="button-legal-sorteo"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d497f] group-hover:text-[#FF5900]">
                    Sorteo Oficial
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-[#1d497f] group-hover:bg-[#FF5900]/20 group-hover:text-[#FF5900]">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-500">
                  Mecanismo y fechas de adjudicación mensual por Lotería LOTBA S.E.
                </span>
              </button>

              {/* Botón 5: PARTICIPACIÓN Y RENDIMIENTOS (Modal) */}
              <button
                type="button"
                onClick={() => setModalRendimientos(true)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm transition-all duration-200 hover:border-[#FF5900]/50 hover:bg-orange-50/30 cursor-pointer"
                data-testid="button-legal-participación-y-rendimientos"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d497f] group-hover:text-[#FF5900]">
                    Rendimientos
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-[#1d497f] group-hover:bg-[#FF5900]/20 group-hover:text-[#FF5900]">
                    <Info size={13} />
                  </span>
                </div>
                <span className="mt-2 text-[11px] leading-tight text-slate-500">
                  Participación en los resultados de Reservas Matemáticas
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>Planes autorizados por IGJ N° Res. 289/11</span>
          <span className="font-bold text-[#FF5900]">No contamos con cobradores a domicilio</span>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      data-testid="modal-regret"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF5900]/30 bg-orange-50 text-[#FF5900]">
            <Mail size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 transition-colors hover:text-slate-700 cursor-pointer"
            aria-label="Cerrar modal"
            data-testid="button-close-regret"
          >
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="py-6 text-center">
            <h2 className="text-2xl font-bold text-[#1d497f]">Solicitud enviada</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Te contactaremos a la brevedad para gestionar tu solicitud de arrepentimiento dentro de los plazos legales.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-[#FF5900] hover:bg-[#e54f00] px-6 py-3 text-xs font-bold uppercase text-white shadow-lg shadow-orange-500/25 cursor-pointer"
              data-testid="button-close-sent"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-[#FF5900]">
              Derecho de Arrepentimiento
            </span>
            <h2 className="mt-1 text-2xl font-bold text-[#1d497f]">
              ¿Querés registrar tu solicitud?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Disponés de 10 días para revocar tu adhesión sin ningún costo. Ingresá tu correo electrónico para asentar la gestión:
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#FF5900] focus:bg-white"
              data-testid="input-regret-email"
            />
            <button
              type="button"
              onClick={() => setSent(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5900] hover:bg-[#e54f00] py-3.5 text-sm font-bold uppercase text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.01] cursor-pointer"
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

function SuccessModal({ onClose, onReset }: { onClose: () => void; onReset: () => void }) {
  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      data-testid="modal-success"
    >
      <div className="relative w-full max-w-xl my-8 rounded-2xl border border-slate-100 bg-white shadow-2xl overflow-hidden">
        <SuccessScreen onReset={handleReset} />
      </div>
    </div>
  );
}

function Home({
  isPromo = false,
  onBackToPromo,
}: {
  isPromo?: boolean;
  onBackToPromo?: () => void;
}) {
  const [regret, setRegret] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wizardResetKey, setWizardResetKey] = useState(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setSuccess(false);
    setWizardResetKey((prev) => prev + 1);
    scrollTo('planes');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans selection:bg-[#FF5900] selection:text-white">
      {isPromo && (
        <div className="sticky top-0 z-50 flex items-center justify-between bg-[#FF5900] px-4 py-2.5 text-xs font-bold text-white shadow-md">
          <div className="mx-auto flex items-center gap-2">
            <Gift size={16} />
            <span>
              ¡Beneficio Naranja X aplicado! Tu cuota de suscripción inicial está 100% bonificada ($0).
            </span>
          </div>
          {onBackToPromo && (
            <button
              type="button"
              onClick={onBackToPromo}
              className="ml-3 shrink-0 font-semibold underline hover:opacity-80 cursor-pointer"
            >
              ← Volver a la promo
            </button>
          )}
        </div>
      )}

      <NavigationBar onScrollTo={scrollTo} />

      <main className="relative z-10">
        <HeroSection onStart={() => scrollTo('planes')} />
        <HowItWorksSection />
        <WizardSection key={wizardResetKey} onSuccess={() => setSuccess(true)} />
        <LegalFooter onRegret={() => setRegret(true)} />
      </main>

      <SocialProof />
      {regret && <RegretModal onClose={() => setRegret(false)} />}
      {success && <SuccessModal onClose={() => setSuccess(false)} onReset={handleResetForm} />}
    </div>
  );
}

function MainView() {
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setSearch(window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const searchParams = new URLSearchParams(search);
  const isOnlyPromoCard = searchParams.get('vista') === 'tarjeta';

  if (isOnlyPromoCard) {
    return (
      <PromoNaranjaX
        onStartFunnel={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('vista');
          window.history.pushState({}, '', url.toString());
          setSearch(url.search);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return <Home isPromo={true} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={MainView} />
        <Route path="/promo">
          <PromoNaranjaX
            onStartFunnel={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('promo', 'naranja');
              window.location.href = url.toString();
            }}
          />
        </Route>
        <Route path="/simulador">
          <Home
            isPromo={true}
            onBackToPromo={() => {
              window.location.href = `${import.meta.env.BASE_URL}`;
            }}
          />
        </Route>
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