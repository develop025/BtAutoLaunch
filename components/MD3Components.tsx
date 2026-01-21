
import React from 'react';
import { MD3_THEME } from '../constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'elevated';
  className?: string;
  theme: 'light' | 'dark';
}

export const MD3Card: React.FC<CardProps> = ({ children, variant = 'filled', className = '', theme }) => {
  const isDark = theme === 'dark';
  const colors = MD3_THEME[theme];
  
  const baseStyles = "rounded-[24px] p-6 transition-all duration-300 ";
  
  const variantStyles = {
    filled: isDark ? "bg-[#212429] border border-white/5" : "bg-[#f0f4f9]",
    outlined: `border ${isDark ? "border-[#44474f] bg-transparent" : "border-[#74777f] bg-transparent"}`,
    elevated: isDark ? "bg-[#25282e] border border-white/10 shadow-xl shadow-black/50" : "bg-[#ffffff] shadow-md shadow-blue-100",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

interface ButtonProps {
  onClick: () => void;
  label: string;
  icon?: string;
  variant?: 'filled' | 'tonal' | 'outlined' | 'text';
  theme: 'light' | 'dark';
  active?: boolean;
}

export const MD3Button: React.FC<ButtonProps> = ({ onClick, label, icon, variant = 'filled', theme, active }) => {
  const isDark = theme === 'dark';
  const colors = MD3_THEME[theme];
  
  const styles = {
    filled: isDark ? "bg-[#adc6ff] text-[#002e69]" : "bg-[#005ac1] text-white",
    tonal: isDark ? "bg-[#3f4759] text-[#dbe2f9]" : "bg-[#dbe2f9] text-[#141b2c]",
    outlined: `border ${isDark ? "border-[#8e9099] text-[#adc6ff]" : "border-[#74777f] text-[#005ac1]"}`,
    text: isDark ? "text-[#adc6ff]" : "text-[#005ac1]",
  };

  const activeStyles = active ? (isDark ? "ring-2 ring-[#adc6ff] ring-offset-2 ring-offset-[#1a1c1e]" : "ring-2 ring-[#005ac1]") : "";

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold uppercase text-[12px] tracking-widest transition-all state-layer ${styles[variant]} ${activeStyles}`}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      <span className="text-sm">{label}</span>
    </button>
  );
};

export const MD3Switch: React.FC<{ checked: boolean; onChange: () => void; theme: 'light' | 'dark' }> = ({ checked, onChange, theme }) => {
  const isDark = theme === 'dark';
  return (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-8 w-14 items-center rounded-lg transition-colors focus:outline-none 
        ${checked ? (isDark ? 'bg-[#adc6ff]' : 'bg-[#005ac1]') : (isDark ? 'bg-[#44474f]' : 'bg-[#e1e2ec]')}`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-md transition-transform 
          ${checked ? 'translate-x-7 bg-white shadow-lg' : 'translate-x-1 ' + (isDark ? 'bg-[#8e9099]' : 'bg-[#74777f]')}`}
      />
    </button>
  );
};

export const MD3Slider: React.FC<{ value: number; onChange: (v: number) => void; max: number; theme: 'light' | 'dark' }> = ({ value, onChange, max, theme }) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#adc6ff' : '#005ac1';
  const trackColor = isDark ? '#44474f' : '#e1e2ec';

  return (
    <div className="w-full flex items-center gap-4">
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 rounded-none appearance-none cursor-pointer`}
        style={{
          background: `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${(value / max) * 100}%, ${trackColor} ${(value / max) * 100}%, ${trackColor} 100%)`
        }}
      />
      <span className={`text-sm font-black w-10 text-right font-mono ${isDark ? 'text-[#adc6ff]' : 'text-[#005ac1]'}`}>{value}s</span>
    </div>
  );
};
