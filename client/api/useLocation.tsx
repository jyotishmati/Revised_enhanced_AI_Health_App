import { useEffect, useState } from "react";
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from "@react-native-community/geolocation";

const useLocation = (): [number, number] | null => {
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position: GeolocationResponse) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      },
      (error: GeolocationError) => console.error("Location Error:", error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useLocation;
