import { appendChildren } from "../../utils/helpers";

import { geolocationService } from "../services/geolocationService";
import { dataService } from "../services/dataService";

const app = document.querySelector(".app");
const atms = [];

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

    if (error.code && error.code === 1) {
        errorContainer.textContent = "Geolocation is currently disabled. Please enable it in your browser's settings in order to see the results.";
    } else {
        errorContainer.textContent = "Unfortunately, something has went wrong. Don't worry, we're looking into it.";
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

const getAtmList = userCoordinates => dataService.getAtmData(
    userCoordinates,
    atm => atms.push(atm),
    error => errorHandler(error)
);

export const onPageLoad = () => {
    displayInterface();
};