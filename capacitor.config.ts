import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.filechanger',
  appName: 'filechanger',
  webDir: 'www\browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
