import React from 'react' // eslint-disable-line no-unused-vars

export interface ICoords {
  latitude: number
  longitude: number
}

export interface IProps {}

export interface IReturn {
  coords: ICoords
}

export const useCapacitorLocation = (): IReturn => {
  const [coords, setCoords] = React.useState<ICoords>({
    latitude: 0,
    longitude: 0
  })

  React.useEffect(() => {
    getWebLocation()
  }, [])

  // fetch location from navigator
  const getWebLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    }
  }

  return {
    coords
  }
}
