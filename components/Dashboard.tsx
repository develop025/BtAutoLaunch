
import React from 'react';
import { MD3Card, MD3Button } from './MD3Components';
import { ReliabilityTier, VendorInfo } from '../types';
import { VENDOR_DATABASE } from '../constants';

interface DashboardProps {
  theme: 'light' | 'dark';
  reliability: ReliabilityTier;
  setReliability: (t: ReliabilityTier) => void;
  status: 'Ready' | 'Searching' | 'Connected' | 'Error';
}

export const Dashboard: React.FC<DashboardProps> = ({ theme, reliability, setReliability, status }) => {
  const isDark = theme === 'dark';
  const vendor: VendorInfo = { manufacturer: 'Samsung', ...VENDOR_DATABASE['Samsung'] };

  const getStatusColor = () => {
    switch(status) {
      case 'Ready': return isDark ? '#adc6ff' : '#005ac1';
      case 'Searching': return isDark ? '#dfbcde' : '#715573';
      case 'Connected': return '#34a853'; // Standard MD3 Success
      case 'Error': return '#ea4335'; // Standard MD3 Error
    }
  };

  // Параметри для SVG кільця
  const size = 192; // відповідає w-48
  const center = size / 2;
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2 - 4; // Запас для запобігання обрізанню
  const circumference = 2 * Math.PI * radius;
  
  // Розрахунок зміщення для анімації
  const dashOffset = status === 'Ready' ? circumference * 0.25 : status === 'Connected' ? 0 : circumference * 0.75;

  return (
    <div className="space-y-6">
      {/* Status Ring Section */}
      <MD3Card theme={theme} variant="elevated" className="flex flex-col items-center">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg 
            className="absolute w-full h-full transform -rotate-90 overflow-visible"
            viewBox={`0 0 ${size} ${size}`}
          >
            {/* Background Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={isDark ? '#2a2c31' : '#eef2f6'}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active Progress */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={getStatusColor()}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          
          <div className="text-center z-10">
            <span className="material-symbols-outlined text-5xl block mb-1 font-light" style={{color: getStatusColor()}}>
              {status === 'Ready' ? 'shield_check' : status === 'Searching' ? 'search' : 'hub'}
            </span>
            <div className={`text-xl font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>{status}</div>
            <div className={`text-[10px] font-mono tracking-widest ${isDark ? 'text-blue-500/60' : 'text-slate-400'}`}>LINK_ID: 001</div>
          </div>
        </div>
        <div className={`mt-6 text-[11px] font-bold uppercase tracking-tight text-center max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Engine listening for broadcast intents. Monitoring stack.
        </div>
      </MD3Card>

      {/* Reliability Tier Selector */}
      <div className="space-y-3">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ml-2 ${isDark ? 'text-blue-400/50' : 'text-slate-500'}`}>Performance Tier</h3>
        <div className="grid grid-cols-3 gap-2">
          {(['Eco', 'Balanced', 'High'] as ReliabilityTier[]).map((tier) => (
            <MD3Button
              key={tier}
              theme={theme}
              label={tier}
              variant={reliability === tier ? 'filled' : 'tonal'}
              onClick={() => setReliability(tier)}
              active={reliability === tier}
            />
          ))}
        </div>
      </div>

      {/* Vendor Intelligence Widget */}
      <MD3Card theme={theme} variant="filled" className="border-l-4 border-blue-600 rounded-l-none">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/10'}`}>
            <span className="material-symbols-outlined text-blue-600 font-bold">memory</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>{vendor.manufacturer} Diagnostics</h3>
              <span className="px-2 py-0.5 rounded border border-blue-600/30 text-blue-600 text-[9px] font-black uppercase tracking-widest">
                {vendor.restrictionLevel}
              </span>
            </div>
            <p className={`text-[11px] mb-4 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {vendor.explanation}
            </p>
            <div className="space-y-2">
              {vendor.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight">
                  <span className="material-symbols-outlined text-[14px] text-blue-600">check_small</span>
                  <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MD3Card>
    </div>
  );
};
