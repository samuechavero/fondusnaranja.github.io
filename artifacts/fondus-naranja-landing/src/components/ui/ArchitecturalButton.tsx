import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArchitecturalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  'data-testid'?: string;
}

export function ArchitecturalButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  icon = <ArrowRight size={17} />,
  'data-testid': testId,
}: ArchitecturalButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 text-xs md:text-sm font-black tracking-[0.14em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/20 ${
        variant === 'primary'
          ? 'bg-[#121c2e] text-[#f4f4ee] border-[#ff5a00]/40 shadow-[0_0_25px_rgba(255,90,0,0.18)]'
          : variant === 'secondary'
          ? 'bg-white/5 text-white border-white/15'
          : 'bg-transparent text-[#ff8141] border-[#ff5a00]/50'
      } ${className}`}
    >
      {/* Background slide-in effect from the left */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#ff5a00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
      />

      {/* Technical corner brackets */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-white/60 pointer-events-none z-20 group-hover:border-[#101828]" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-white/60 pointer-events-none z-20 group-hover:border-[#101828]" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-white/60 pointer-events-none z-20 group-hover:border-[#101828]" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-white/60 pointer-events-none z-20 group-hover:border-[#101828]" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 group-hover:text-[#0b1329] transition-colors duration-300">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}
export default ArchitecturalButton;
