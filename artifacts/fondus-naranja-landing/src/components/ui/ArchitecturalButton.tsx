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
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-[#ff5a00] via-[#ff6a12] to-[#ff7b35] text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]'
          : variant === 'secondary'
          ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/25 rounded-xl'
          : 'bg-transparent text-[#ff8141] hover:text-[#ff9b6a] border border-[#ff5a00]/40 hover:border-[#ff5a00] rounded-xl'
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2.5 font-bold">
        {children}
        {icon && (
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}
export default ArchitecturalButton;
