
import React from 'react';

export const MD3_THEME = {
  light: {
    primary: '#005ac1', // Command Blue
    onPrimary: '#ffffff',
    primaryContainer: '#d8e2ff',
    onPrimaryContainer: '#001a41',
    secondary: '#575e71', // Professional Slate
    onSecondary: '#ffffff',
    secondaryContainer: '#dbe2f9',
    onSecondaryContainer: '#141b2c',
    tertiary: '#715573', // Subtle Violet
    onTertiary: '#ffffff',
    tertiaryContainer: '#fbd7fc',
    onTertiaryContainer: '#29132d',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    surface: '#fdfbff', 
    onSurface: '#1a1b1f',
    surfaceVariant: '#e1e2ec',
    onSurfaceVariant: '#44474f',
    outline: '#74777f',
  },
  dark: {
    primary: '#adc6ff', // Electric Sky
    onPrimary: '#002e69',
    primaryContainer: '#004494',
    onPrimaryContainer: '#d8e2ff',
    secondary: '#bfc6dc', // Steel Grey
    onSecondary: '#293041',
    secondaryContainer: '#3f4759',
    onSecondaryContainer: '#dbe2f9',
    tertiary: '#dfbcde',
    onTertiary: '#402843',
    tertiaryContainer: '#583e5a',
    onTertiaryContainer: '#fbd7fc',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    surface: '#1a1c1e', // Deep Space
    onSurface: '#e2e2e6',
    surfaceVariant: '#44474f',
    onSurfaceVariant: '#c4c6d0',
    outline: '#8e9099',
  }
};

export const MOCK_DEVICES = [
  { id: '4C:32:75:A1:B2:C3', name: 'Audi MMI 3291' },
  { id: '88:44:00:FF:EE:DD', name: 'BMW 520i' },
  { id: '00:11:22:33:44:55', name: 'Sony WH-1000XM4' },
];

export const MOCK_PLAYERS = [
  { package: 'com.spotify.music', name: 'Spotify' },
  { package: 'com.google.android.apps.youtube.music', name: 'YouTube Music' },
  { package: 'com.apple.android.music', name: 'Apple Music' },
  { package: 'org.videolan.vlc', name: 'VLC' },
];

export const VENDOR_DATABASE: Record<string, any> = {
  'Samsung': {
    restrictionLevel: 'Moderate',
    explanation: 'OneUI enforces strict background limits for non-media-session apps. Requires "Keep open" in Recents.',
    recommendations: ['Disable "Put unused apps to sleep"', 'Allow Background Data', 'Exclude from Battery Optimization']
  },
  'Xiaomi': {
    restrictionLevel: 'Aggressive',
    explanation: 'MIUI kills background processes within 5 minutes of screen off unless "Autostart" is toggled and Battery Saver is set to "No restrictions".',
    recommendations: ['Enable Autostart', 'Set Battery Saver to No Restrictions', 'Lock in App Switcher']
  },
  'Google': {
    restrictionLevel: 'None',
    explanation: 'Pixel devices follow standard AOSP Doze behavior. Minimal proprietary intervention.',
    recommendations: ['Exclude from Battery Optimization']
  },
  'Huawei': {
    restrictionLevel: 'Aggressive',
    explanation: 'EMUI has a "Power Intensive" monitor that kills high-frequency Bluetooth polling.',
    recommendations: ['Disable App Launch Management (Set to Manual)', 'Allow Background Activity']
  }
};
