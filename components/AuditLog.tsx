
import React from 'react';
import { MD3Card } from './MD3Components';
import { LogEntry } from '../types';

interface AuditLogProps {
  theme: 'light' | 'dark';
}

const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '14:22:01.442', event: 'Started', details: 'Foregound Service (BtAutoLaunchListener) initiated.' },
  { id: '2', timestamp: '14:22:05.122', event: 'Launched', details: 'Spotify package intent sent to system.' },
  { id: '3', timestamp: '14:35:12.889', event: 'Killed', details: 'LowMemoryKiller (LMK) terminated process (OOM_ADJ: 100).' },
  { id: '4', timestamp: '14:35:15.112', event: 'Recovered', details: 'JobScheduler restarted service as persistent.' },
  { id: '5', timestamp: '15:01:44.221', event: 'Failed', details: 'RSSI -98dbm. Aborted auto-launch for network stability.' },
];

export const AuditLog: React.FC<AuditLogProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const getEventIcon = (event: LogEntry['event']) => {
    switch(event) {
      case 'Started': return 'power_settings_new';
      case 'Killed': return 'dangerous';
      case 'Recovered': return 'refresh';
      case 'Launched': return 'rocket_launch';
      case 'Failed': return 'report';
    }
  };

  const getEventColor = (event: LogEntry['event']) => {
    switch(event) {
      case 'Started': return 'text-blue-500';
      case 'Killed': return 'text-red-500';
      case 'Recovered': return 'text-green-500';
      case 'Launched': return 'text-purple-500';
      case 'Failed': return 'text-amber-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>System Lifecycle Events</h3>
        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>LOG_LEVEL: VERBOSE</span>
      </div>

      <MD3Card theme={theme} variant="outlined" className="p-0 overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
        {MOCK_LOGS.map((log) => (
          <div key={log.id} className="p-4 flex gap-4 transition-colors hover:bg-slate-50/5">
            <span className={`material-symbols-outlined shrink-0 ${getEventColor(log.event)}`}>
              {getEventIcon(log.event)}
            </span>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{log.event}</span>
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{log.timestamp}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {log.details}
              </p>
            </div>
          </div>
        ))}
      </MD3Card>

      <div className="flex items-center justify-center p-4">
        <button className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          <span className="material-symbols-outlined text-sm">download</span>
          Export Diagnostic Bundle
        </button>
      </div>
    </div>
  );
};
