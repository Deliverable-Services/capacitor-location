import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.capacitorlocationplugin.app',
  appName: 'capacitor-location-plugin',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    allowNavigation: [],
    hostname: 'app',
    iosScheme: 'ionic',
    androidScheme: 'http',
    url: 'http://192.168.43.237:3000'
  }
}

export default config
