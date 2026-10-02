import React, { useState, type FormEvent } from 'react';
import { CreditCard, Lock, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export interface PaymentData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  dni: string;
}

interface PaymentFormProps {
  planTitle?: string;
  planCapital?: string;
  planRegular?: string;
  initialDni?: string;
  initialName?: string;
  onBack?: () => void;
  onSubmitPayment: (data: PaymentData) => void;
}

export default function PaymentForm({
  planTitle = 'Plan Vehículo 0KM',
  planCapital = '$10.000.000',
  planRegular = '$34.500',
  initialDni = '',
  initialName = '',
  onBack,
  onSubmitPayment,
}: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(initialName);
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [dni, setDni] = useState(initialDni);
  const [processing, setProcessing] = useState(false);

  // Formateador de número de tarjeta en bloques de 4 dígitos
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Formateador de fecha de vencimiento MM/AA
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiry(raw);
  };

  // Validación de CVV (3 o 4 dígitos)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(raw);
  };

  // Validación de DNI
  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9);
    setDni(raw);
  };

  // Validación completa de los 5 campos requeridos
  const rawCardDigits = cardNumber.replace(/\D/g, '');
  const isValid = Boolean(
    rawCardDigits.length === 16 &&
    cardHolder.trim().length >= 3 &&
    expiry.length >= 4 &&
    cvv.length >= 3 &&
    dni.trim().length >= 7
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || processing) return;

    setProcessing(true);
    setTimeout(() => {
      onSubmitPayment({
        cardNumber: rawCardDigits,
        cardHolder,
        expiry,
        cvv,
        dni,
      });
      setProcessing(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-white/20 bg-gradient-to-b from-[#141f36] to-[#0c1424] p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-white">
      {/* Encabezado del Formulario de Pago */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d497f]/30 border border-[#1d497f] text-white">
            <CreditCard size={22} className="text-[#93c46d]" />
          </div>
          <div>
            <h3 className="m-0 text-lg font-bold text-white leading-tight">
              Adhesión a Débito Automático
            </h3>
            <p className="m-0 text-xs text-slate-300">
              Ingresá tu tarjeta de crédito para activar el plan
            </p>
          </div>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Volver
          </button>
        )}
      </div>

      {/* Resumen del Plan a Adherir */}
      <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            {planTitle}
          </span>
          <p className="m-0 text-base font-black text-white">
            Capital {planCapital}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-300 block">Cuota mensual</span>
          <p className="m-0 text-base font-bold text-[#93c46d]">
            {planRegular}
          </p>
        </div>
      </div>

      {/* Tarjeta Visual de Previsualización */}
      <div className="mb-6 relative rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-[#1d497f] p-5 shadow-lg text-white">
        <div className="flex justify-between items-start mb-6">
          <span className="text-sm font-black tracking-wider uppercase">Naranja X</span>
          <CreditCard className="opacity-75" size={24} />
        </div>
        <div className="font-mono text-lg sm:text-xl tracking-widest mb-4">
          {cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="flex justify-between text-xs tracking-wider uppercase opacity-90">
          <div>
            <span className="text-[9px] block text-white/70">Titular</span>
            <span className="font-bold truncate max-w-[170px] block">
              {cardHolder || 'NOMBRE DEL TITULAR'}
            </span>
          </div>
          <div>
            <span className="text-[9px] block text-white/70">Vence</span>
            <span className="font-bold">{expiry || 'MM/AA'}</span>
          </div>
        </div>
      </div>

      {/* Formulario de Campos Estructurados */}
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-payment">
        {/* Número de Tarjeta */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            Número de Tarjeta (16 dígitos)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#1d497f] focus:ring-2 focus:ring-[#1d497f]/40"
              data-testid="input-card-number"
            />
            <CreditCard size={18} className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </div>

        {/* Nombre del Titular */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            Nombre completo del titular (como figura en la tarjeta)
          </label>
          <input
            type="text"
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            placeholder="JUAN PEREZ"
            className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all uppercase focus:border-[#1d497f] focus:ring-2 focus:ring-[#1d497f]/40"
            data-testid="input-card-holder"
          />
        </div>

        {/* Fecha de Vencimiento y Código de Seguridad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Vencimiento (MM/AA)
            </label>
            <input
              type="text"
              required
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="08/28"
              className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all text-center focus:border-[#1d497f] focus:ring-2 focus:ring-[#1d497f]/40"
              data-testid="input-card-expiry"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
              Código CVC/CVV
            </label>
            <div className="relative">
              <input
                type="password"
                required
                maxLength={4}
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all text-center focus:border-[#1d497f] focus:ring-2 focus:ring-[#1d497f]/40"
                data-testid="input-card-cvv"
              />
              <Lock size={15} className="absolute right-3.5 top-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* DNI del Titular */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300">
            DNI del titular de la tarjeta
          </label>
          <input
            type="text"
            required
            value={dni}
            onChange={handleDniChange}
            placeholder="Sin puntos ni espacios"
            className="w-full rounded-xl border border-white/15 bg-[#091122] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#1d497f] focus:ring-2 focus:ring-[#1d497f]/40"
            data-testid="input-card-dni"
          />
        </div>

        {/* Botón de Confirmación y Pago */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isValid || processing}
            className="w-full rounded-xl bg-[#93c46d] hover:bg-[#82b25c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 px-6 shadow-lg shadow-green-600/25 active:scale-[0.98] transition-all text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer"
            data-testid="button-confirm-payment"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Procesando adhesión...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                Confirmar adhesión y pagar
              </span>
            )}
          </button>
        </div>

        {/* Sellos de Seguridad */}
        <div className="pt-3 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#93c46d]" /> Conexión segura cifrada SSL
          </span>
          <span>•</span>
          <span>Débito oficial Naranja X</span>
        </div>
      </form>
    </div>
  );
}
