import UserLocation from "../entities/userLocation";

export const getUserLocation = position => {
    const { latitude, longitude } = position.coordinates;
    const userLocation = new UserLocation(latitude, longitude);
    return userLocation;
};