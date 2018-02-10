export const getUserLocation = (isNotSupportedHandler, successHandler, errorHandler) => {

    if (!navigator.geolocation) {
        isNotSupportedHandler("Unfortunately, geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => successHandler(position), error => errorHandler(error));
};