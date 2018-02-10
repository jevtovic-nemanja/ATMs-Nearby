import UserCoordinates from "../entities/userLocation";

export const getUserCoordinates = position => {
    const { latitude, longitude } = position.coords;
    const userCoordinates = new UserCoordinates(latitude, longitude);
    return userCoordinates;
};