export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const isTestFlightBuild = process.env.EXPO_PUBLIC_APP_ENV === 'testflight'; 