import { dataService } from "./dataService";

class GeolocationService {
    constructor() { }

    getUserGeoPosition(isNotSupportedHandler, successHandler, errorHandler) {

        if (!navigator.geolocation) {
            isNotSupportedHandler("Unfortunately, geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => successHandler(dataService.getUserCoordinates(position)),
            error => errorHandler(error)
        );
    }
}

export const geolocationService = new GeolocationService();