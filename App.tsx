
import React, { useState } from 'react';
import { AppTab, ReliabilityTier, AutomationConfig } from './types';
import { Dashboard } from './components/Dashboard';
import { Setup } from './components/Setup';
import { AuditLog } from './components/AuditLog';

const MobileScreen: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode; activeTab: AppTab; setActiveTab: (t: AppTab) => void }> = ({ theme, children, activeTab, setActiveTab }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className={`relative flex flex-col w-[375px] h-[812px] rounded-[48px] border-[12px] overflow-hidden shadow-2xl transition-all duration-700
      ${isDark ? 'bg-[#1a1c1e] border-[#2c2f33]' : 'bg-[#fdfbff] border-slate-900'}`}>
      
      {/* Status Bar */}
      <div className={`h-11 flex items-center justify-between px-8 text-[11px] font-bold tracking-tight ${isDark ? 'text-blue-300/80' : 'text-slate-600'}`}>
        <span>9:41</span>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
          <span className="material-symbols-outlined text-[14px]">wifi</span>
          <span className="material-symbols-outlined text-[14px]">battery_full</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>BtAutoLaunch</h1>
          <p className={`text-[9px] uppercase font-black tracking-[0.4em] ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Indigo System 4.0</p>
        </div>
        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
          <span className={`material-symbols-outlined text-[22px] ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>monitoring</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className={`absolute bottom-0 inset-x-0 h-24 px-4 flex items-center justify-around rounded-t-[32px]
        ${isDark ? 'bg-[#212429] border-t border-white/5' : 'bg-[#f0f4f9] border-t border-blue-50'}`}>
        {[
          { id: AppTab.Dashboard, icon: 'grid_view', label: 'STATUS' },
          { id: AppTab.Setup, icon: 'auto_mode', label: 'RULES' },
          { id: AppTab.Audit, icon: 'list_alt', label: 'LOGS' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className={`px-6 py-2 rounded-2xl transition-all duration-300 relative
              ${activeTab === tab.id ? (isDark ? 'bg-blue-500/20' : 'bg-blue-600/10') : 'hover:bg-blue-500/5'}`}>
              <span className={`material-symbols-outlined text-[28px] transition-colors
                ${activeTab === tab.id ? (isDark ? 'text-blue-200' : 'text-blue-900') : (isDark ? 'text-slate-600' : 'text-slate-400')}`}>
                {tab.icon}
              </span>
            </div>
            <span className={`text-[8px] font-black uppercase tracking-widest transition-colors
              ${activeTab === tab.id ? (isDark ? 'text-blue-100' : 'text-blue-900') : (isDark ? 'text-slate-500' : 'text-slate-500')}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-slate-500/10 dark:bg-blue-500/20" />
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Dashboard);
  const [reliability, setReliability] = useState<ReliabilityTier>('Balanced');
  const [status, setStatus] = useState<'Ready' | 'Searching' | 'Connected' | 'Error'>('Ready');
  const [config, setConfig] = useState<AutomationConfig>({
    deviceId: '4C:32:75:A1:B2:C3',
    packageName: 'com.spotify.music',
    launchDelay: 2,
    checkNetwork: true,
    checkRssi: false
  });

  const updateConfig = (newVal: Partial<AutomationConfig>) => {
    setConfig(prev => ({ ...prev, ...newVal }));
  };

  const renderContent = (theme: 'light' | 'dark') => {
    switch (activeTab) {
      case AppTab.Dashboard:
        return <Dashboard theme={theme} reliability={reliability} setReliability={setReliability} status={status} />;
      case AppTab.Setup:
        return <Setup theme={theme} config={config} updateConfig={updateConfig} />;
      case AppTab.Audit:
        return <AuditLog theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf2] p-8 flex items-center justify-center gap-16 overflow-x-auto">
      {/* Light Mode Preview */}
      <div className="flex flex-col items-center gap-6">
        <span className="px-5 py-1.5 rounded-full bg-white shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-200">System: Strategic</span>
        <MobileScreen theme="light" activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent('light')}
        </MobileScreen>
      </div>

      {/* Dark Mode Preview */}
      <div className="flex flex-col items-center gap-6">
        <span className="px-5 py-1.5 rounded-full bg-[#1c1d27] shadow-lg text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border border-white/5">System: Deep Space</span>
        <MobileScreen theme="dark" activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent('dark')}
        </MobileScreen>
      </div>
    </div>
  );
};

export default App;
