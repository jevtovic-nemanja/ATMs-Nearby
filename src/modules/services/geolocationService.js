import { getUserCoordinates } from "./dataService";

export const getUserGeoPosition = (isNotSupportedHandler, successHandler, errorHandler) => {

    if (!navigator.geolocation) {
        isNotSupportedHandler("Unfortunately, geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => successHandler(getUserCoordinates(position)), error => errorHandler(error));
};