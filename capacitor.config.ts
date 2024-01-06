import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.filechanger',
  appName: 'filechanger',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
