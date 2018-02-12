import { dataService } from "./dataService";

class GeolocationService {
    constructor() { }

    getUserGeoPosition(isNotSupportedHandler, successHandler, errorHandler) {

        if (!navigator.geolocation) {
            isNotSupportedHandler("NO_GEOLOCATION");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => successHandler(dataService.getUserCoordinates(position)),
            error => errorHandler(error)
        );
    }
}

export const geolocationService = new GeolocationService();