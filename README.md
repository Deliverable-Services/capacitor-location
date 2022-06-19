# Geolocation for web, android and ios.

> React library for fetching location on web, android and ios using capacitor js.

[![NPM](https://img.shields.io/npm/v/@deliverables/capacitor-location.svg)](https://www.npmjs.com/package/@deliverables/capacitor-location) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @deliverables/capacitor-location

yarn add @deliverables/capacitor-location

```

## Usage

```tsx
import { useCapacitorLocation } from '@deliverables/capacitor-location'

const { coords, removeLocationWatcher, removeBackgroundLocationWatcher } =
  useCapacitorLocation({
    watchForBackgroundLocation: true,
    onBackgroundLocationChange: (location) => {
      console.log('Background location changed', location)
    },
    onError: (error) => {
      alert('Error: ' + error.message)
    },
    onBackgroundLocationError(error) {
      alert('Background location error: ' + error.message)
    }
  })
```

## License

MIT © [hitesh-webRepo](https://github.com/hitesh-webRepo)
