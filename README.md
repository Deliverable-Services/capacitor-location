# atomikku

> React UI library

[![NPM](https://img.shields.io/npm/v/atomikku.svg)](https://www.npmjs.com/package/atomikku) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @deliverable/capacitor-location
yarn add @deliverable/capacitor-location
```

## Usage

```tsx
import { useCapacitorLocation } from '@deliverable/capacitor-location'

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
