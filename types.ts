
export type ReliabilityTier = 'Eco' | 'Balanced' | 'High';

export interface VendorInfo {
  manufacturer: string;
  restrictionLevel: 'Aggressive' | 'Moderate' | 'None';
  explanation: string;
  recommendations: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  event: 'Started' | 'Killed' | 'Recovered' | 'Launched' | 'Failed';
  details: string;
}

export interface AutomationConfig {
  deviceId: string;
  packageName: string;
  launchDelay: number;
  checkNetwork: boolean;
  checkRssi: boolean;
}

export enum AppTab {
  Dashboard = 'dashboard',
  Setup = 'setup',
  Audit = 'audit'
}
