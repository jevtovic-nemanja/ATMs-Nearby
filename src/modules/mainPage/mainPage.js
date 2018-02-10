import { appendChildren } from "../../utils/helpers";

import { geolocationService } from "../services/geolocationService";

const app = document.querySelector(".app");

const displayInterface = () => {
    const userInterface = document.createElement("div");
    const message = document.createElement("span");
    const allowButton = document.createElement("button");
    const interfaceErrorContainer = document.createElement("div");

    message.textContent = "Find nearby ATMs";
    allowButton.textContent = "Use My Location";
    allowButton.addEventListener("click", getUserLocationData);
    interfaceErrorContainer.classList.add("interface-error-container");

    appendChildren(userInterface, message, allowButton, interfaceErrorContainer);
    appendChildren(app, userInterface);
};

const geolocationNotSupportedHandler = (message) => {
    const errorContainer = document.querySelector(".interface-error-container");
    errorContainer.textContent = message;
};

const errorHandler = error => {
    const errorContainer = document.querySelector(".interface-error-container");

    if (error.code === 1) {
        errorContainer.textContent = "Geolocation is currently disabled. Please enable it in your browser's settings in order to see the results.";
    } else {
        errorContainer.textContent = "Unfortunately, we are currently unable to retrieve your location";
    }
};

const getUserLocationData = () => {
    const errorContainer = document.querySelector(".interface-error-container");
    errorContainer.textContent = "";

    geolocationService.getUserGeoPosition(
        message => geolocationNotSupportedHandler(message),
        userCoordinates => getAtmList(userCoordinates),
        error => errorHandler(error)
    );
};

const getAtmList = (userCoordinates) => console.log(userCoordinates);

export const onPageLoad = () => {
    displayInterface();
};