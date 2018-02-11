import { RESULTS_PER_REQUEST } from "../../constants";

import { geolocationService } from "../services/geolocationService";
import { dataService } from "../services/dataService";

import { displayInterface } from "./userInterface/userInterface";
import { displayAtmsList } from "./atmsList/atmsList";

const app = document.querySelector(".app");
let data = {
    atms: [],
    sortedAtms: [],
    currentAtms: [],
    sort: false,
    onlyMultiCurrency: false
};

const geolocationNotSupportedHandler = (message) => {
    const errorContainer = document.querySelector(".interface-error-container");
    errorContainer.textContent = message;
};

const errorHandler = error => {
    const interfaceErrorContainer = document.querySelector(".interface-error-container");
    const filterErrorContainer = document.querySelector(".filter-error-container");

    if (error.code && error.code === 1) {
        interfaceErrorContainer.textContent = "Geolocation is currently disabled. Please enable it in your browser's settings in order to see the results.";
    } else if (error === "NO_RESULTS") {
        filterErrorContainer.textContent = "There are no results for the specified search criteria.";
    } else {
        interfaceErrorContainer.textContent = "Unfortunately, something has went wrong. Don't worry, we're looking into it.";
    }
};

export const getUserLocationData = () => {
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
                displayAtmsList(data.currentAtms, errorHandler);
            }
        },
        error => errorHandler(error));
};

const findClosestAtms = atmList => {
    const closestAtms = sortByDistance(atmList).slice(0, 10);
    const atms = atmList.filter(atm => closestAtms.includes(atm));
    data.atms = atms;
    data.currentAtms = atms;
    data.sortedAtms = closestAtms;
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

export const handleSortClick = () => {
    data.sort = !data.sort;
    assignCurrentAtms();
};

export const handleFilterClick = () => {
    data.onlyMultiCurrency = !data.onlyMultiCurrency;
    assignCurrentAtms();
};

const assignCurrentAtms = () => {
    const { atms, sortedAtms, sort, onlyMultiCurrency } = data;

    if (!sort && !onlyMultiCurrency) {
        data.currentAtms = atms;
    } else if (sort && !onlyMultiCurrency) {
        data.currentAtms = sortedAtms;
    } else if (!sort && onlyMultiCurrency) {
        data.currentAtms = atms.filter(atm => atm.isMultiCurrency);
    } else if (sort && onlyMultiCurrency) {
        data.currentAtms = sortedAtms.filter(atm => atm.isMultiCurrency);
    }

    displayAtmsList(data.currentAtms, errorHandler);
};

export const onPageLoad = () => {
    displayInterface();
};