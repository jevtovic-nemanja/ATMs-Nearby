import UserCoordinates from "../entities/userLocation";

class DataService {
    constructor() { }

    getUserCoordinates(position) {
        const { latitude, longitude } = position.coords;
        const userCoordinates = new UserCoordinates(latitude, longitude);
        return userCoordinates;
    }
}

export const dataService = new DataService();