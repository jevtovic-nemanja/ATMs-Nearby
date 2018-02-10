import { getUserLocation } from "./dataService";

export const getUserPosition = (isNotSupportedHandler, successHandler, errorHandler) => {

    if (!navigator.geolocation) {
        isNotSupportedHandler("Unfortunately, geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => successHandler(getUserLocation(position)), error => errorHandler(error));
};