import * as Location from "expo-location";
export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const currentLocation = async (): Promise<[number, number] | void> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  const { latitude: lat, longitude: lng } = location.coords;
  return [lat, lng];
};
export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=67df16ae7b9da696850246vuq28b965`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.address) {
      const { neighbourhood, city, state } = data.address;
      return `${neighbourhood || ""}, ${city || ""}, ${state || ""}`;
    }

  } catch (error) {
    console.error("Error fetching location:", error);
  }

  return "Unknown location";
};
