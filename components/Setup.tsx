
import React from 'react';
import { MD3Card, MD3Switch, MD3Slider } from './MD3Components';
import { AutomationConfig } from '../types';
import { MOCK_DEVICES, MOCK_PLAYERS } from '../constants';

interface SetupProps {
  theme: 'light' | 'dark';
  config: AutomationConfig;
  updateConfig: (c: Partial<AutomationConfig>) => void;
}

export const Setup: React.FC<SetupProps> = ({ theme, config, updateConfig }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      {/* Device Selection */}
      <div className="space-y-3">
        <h3 className={`text-sm font-medium ml-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Target Hardware</h3>
        <MD3Card theme={theme} variant="outlined" className="p-2">
          {MOCK_DEVICES.map((dev) => (
            <button
              key={dev.id}
              onClick={() => updateConfig({ deviceId: dev.id })}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-colors state-layer
                ${config.deviceId === dev.id ? (isDark ? 'bg-[#3b4858]' : 'bg-[#d7e3f7]') : 'hover:bg-slate-100/5'}`}
            >
              <div className={`p-2 rounded-full ${config.deviceId === dev.id ? (isDark ? 'bg-[#9ecaff] text-[#003258]' : 'bg-[#0061a4] text-white') : (isDark ? 'bg-slate-800' : 'bg-slate-100')}`}>
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <div className="flex-1">
                <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{dev.name}</div>
                <div className={`text-xs mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{dev.id}</div>
              </div>
              {config.deviceId === dev.id && (
                <span className="material-symbols-outlined text-primary">check_circle</span>
              )}
            </button>
          ))}
        </MD3Card>
      </div>

      {/* Player Selection */}
      <div className="space-y-3">
        <h3 className={`text-sm font-medium ml-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Media Payload</h3>
        <MD3Card theme={theme} variant="outlined" className="p-2">
          {MOCK_PLAYERS.map((player) => (
            <button
              key={player.package}
              onClick={() => updateConfig({ packageName: player.package })}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-colors state-layer
                ${config.packageName === player.package ? (isDark ? 'bg-[#3b4858]' : 'bg-[#d7e3f7]') : 'hover:bg-slate-100/5'}`}
            >
              <div className={`p-2 rounded-full ${config.packageName === player.package ? (isDark ? 'bg-[#9ecaff] text-[#003258]' : 'bg-[#0061a4] text-white') : (isDark ? 'bg-slate-800' : 'bg-slate-100')}`}>
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
              </div>
              <div className="flex-1">
                <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{player.name}</div>
                <div className={`text-xs mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{player.package}</div>
              </div>
              {config.packageName === player.package && (
                <span className="material-symbols-outlined text-primary">check_circle</span>
              )}
            </button>
          ))}
        </MD3Card>
      </div>

      {/* Advanced Controls */}
      <MD3Card theme={theme} variant="filled" className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>timer</span>
              <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Launch Delay</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-md ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>Wait time</span>
          </div>
          <MD3Slider theme={theme} value={config.launchDelay} onChange={(v) => updateConfig({ launchDelay: v })} max={10} />
        </div>

        <div className="h-px w-full bg-slate-200/50 dark:bg-slate-700/50" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Network Verification</span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Require active 4G/5G for launch</span>
            </div>
            <MD3Switch theme={theme} checked={config.checkNetwork} onChange={() => updateConfig({ checkNetwork: !config.checkNetwork })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Signal Filter (RSSI)</span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Wait for high-quality connection</span>
            </div>
            <MD3Switch theme={theme} checked={config.checkRssi} onChange={() => updateConfig({ checkRssi: !config.checkRssi })} />
          </div>
        </div>
      </MD3Card>
    </div>
  );
};
