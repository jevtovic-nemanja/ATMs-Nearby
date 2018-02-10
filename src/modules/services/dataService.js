import UserLocation from "../entities/userLocation";

export const getUserLocation = position => {
    const { latitude, longitude } = position.coords;
    const userLocation = new UserLocation(latitude, longitude);
    return userLocation;
};