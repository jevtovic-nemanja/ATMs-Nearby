import { RESULTS_PER_REQUEST, GOOGLE_STATIC_MAPS_URL } from "../../constants";
import { appendChildren } from "../../utils/helpers";

import { geolocationService } from "../services/geolocationService";
import { dataService } from "../services/dataService";

const app = document.querySelector(".app");
const data = {
    closestAtms: [],
    currentAtms: []
};

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

const getAtmList = userCoordinates => {
    const allAtms = [];

    dataService.getAtmData(userCoordinates,
        atm => {
            allAtms.push(atm);
            if (allAtms.length === RESULTS_PER_REQUEST) {
                findClosestAtms(allAtms);
                displayAtmsList();
            }
        },
        error => errorHandler(error));
};

const findClosestAtms = atmList => {
    const closestAtmsSorted = sortByDistance(atmList).slice(0, 10);
    const closestAtms = atmList.filter(atm => closestAtmsSorted.includes(atm));
    data.closestAtms = closestAtms;
    data.currentAtms = closestAtms;
};

const sortByDistance = atms => {
    const atmArray = [...atms];
    atmArray.sort((a, b) => {
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);
        return distanceA - distanceB;
    });
    return atmArray;
};

const displayAtmsList = () => {
    data.currentAtms.forEach(atm => {
        const card = document.createElement("div");
        const bankName = document.createElement("p");
        const distanceFromUser = document.createElement("p");
        const map = document.createElement("img");

        const { lat, lng, name, distance } = atm;
        bankName.textContent = name;
        distanceFromUser.textContent = distance;
        map.src = `${GOOGLE_STATIC_MAPS_URL}&markers=size:mid|${lat},${lng}`;
        map.alt = "ATM Location Map";

        appendChildren(card, map, bankName, distanceFromUser);
        appendChildren(app, card);
    });
};

export const onPageLoad = () => {
    displayInterface();
};