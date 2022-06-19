import { Capacitor } from '@capacitor/core'
import React from 'react' // eslint-disable-line no-unused-vars
import { Geolocation } from '@capacitor/geolocation'
import { registerPlugin } from '@capacitor/core'
import {
  BackgroundGeolocationPlugin,
  Location
} from '@capacitor-community/background-geolocation'
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  'BackgroundGeolocation'
)

export interface ICoords {
  latitude: number
  longitude: number
}

export interface IProps {
  watchForBackgroundLocation?: boolean
  onBackgroundLocationChange?: (location: Location) => any
  onBackgroundLocationError?: (error: Error) => any
  onError?: (error: Error) => any
}

export interface IReturn {
  coords: ICoords
  removeBackgroundLocationWatcher: () => void
  removeLocationWatcher: () => void
}

export const useCapacitorLocation = (props?: IProps): IReturn => {
  const [coords, setCoords] = React.useState<ICoords>({
    latitude: 0,
    longitude: 0
  })

  const [bgLocWatchId, setBgLocWatchId] = React.useState<string | null>(null)
  const [watchId, setWatchId] = React.useState<string | null>(null)

  React.useEffect(() => {
    getWebLocation()
    getAppLocation()
    if (props?.watchForBackgroundLocation) {
      watchForLocation()
    }
  }, [])

  // fetch location from navigator
  const getWebLocation = () => {
    // watch for web location changes
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          if (props?.onError) props?.onError(error as any)
        }
      )
      setWatchId(watchId.toString())
    }
  }

  // fetch location for android and ios and watch for changes
  const getAppLocation = () => {
    if (!Capacitor.isPluginAvailable('Geolocation')) return

    Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        if (props?.onError) props.onError(err)
      }
      if (position) {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }
    }).then((watchId) => {
      setWatchId(watchId)
    })
  }

  // watch for location updates for background location
  const watchForLocation = () => {
    if (!Capacitor.isPluginAvailable('BackgroundGeolocation')) return

    BackgroundGeolocation.addWatcher(
      {
        backgroundMessage: 'Cancel to prevent battery drain.',
        backgroundTitle: 'Tracking You.',
        requestPermissions: true,
        stale: false,
        distanceFilter: 50
      },
      function callback(location, error) {
        if (error) {
          props?.onBackgroundLocationError?.(error)
        }
        if (!location) {
          throw new Error('No location found')
        }

        if (props?.onBackgroundLocationChange) {
          props.onBackgroundLocationChange(location)
        }
      }
    ).then(function after_the_watcher_has_been_added(watcher_id) {
      setBgLocWatchId(watcher_id)
    })
  }

  // remove background location watcher
  const removeBackgroundLocationWatcher = () => {
    if (!Capacitor.isPluginAvailable('BackgroundGeolocation')) return
    if (bgLocWatchId) BackgroundGeolocation.removeWatcher({ id: bgLocWatchId })
  }

  const removeLocationWatcher = () => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(Number(watchId))
    }

    if (!Capacitor.isPluginAvailable('Geolocation')) return
    if (watchId) Geolocation.clearWatch({ id: watchId })
  }

  return {
    coords,
    removeBackgroundLocationWatcher,
    removeLocationWatcher
  }
}
