import { commService } from "./commService";

import UserCoordinates from "../entities/userCoordinates";
import Atm from "../entities/atm";

class DataService {
    constructor() { }

    getUserCoordinates(isNotSupportedHandler, successHandler, errorHandler) {
        commService.getUserGeoPosition(isNotSupportedHandler, successHandler, errorHandler);
    }

    packUserCoordinates(position) {
        const { latitude, longitude } = position.coords;
        const userCoordinates = new UserCoordinates(latitude, longitude);
        return userCoordinates;
    }

    getAtmData(userCoordinates, handleData, errorCallback) {
        commService.getAtmData(
            userCoordinates,
            (atmData, distanceFromUser, atmsLength) => handleData(
                this.packAtmData(atmData, distanceFromUser),
                atmsLength
            ),
            errorCallback
        );
    }

    packAtmData(atm, distanceFromUser) {
        const lat = atm.geometry.location.lat();
        const lng = atm.geometry.location.lng();
        const name = atm.name;
        const distance = parseFloat(distanceFromUser);
        const isMultiCurrency = name.toLowerCase().includes("telenor");

        const newAtm = new Atm(lat, lng, name, distance, isMultiCurrency);
        return newAtm;
    }
}

export const dataService = new DataService();