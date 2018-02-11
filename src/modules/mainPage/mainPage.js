import { RESULTS_PER_REQUEST, GOOGLE_STATIC_MAPS_URL } from "../../constants";
import { appendChildren, formatDistance } from "../../utils/helpers";

import { geolocationService } from "../services/geolocationService";
import { dataService } from "../services/dataService";

const app = document.querySelector(".app");
let data = {
    closestAtms: [],
    currentAtms: [],
    sort: false,
    onlyMultyCurrency: false
};

const displayInterface = () => {
    const userInterface = document.createElement("div");
    const message = document.createElement("span");
    const allowButton = document.createElement("button");
    const interfaceErrorContainer = document.createElement("div");
    const listContainer = document.createElement("div");

    message.textContent = "Find nearby ATMs";
    allowButton.textContent = "Use My Location";
    allowButton.addEventListener("click", getUserLocationData);
    interfaceErrorContainer.classList.add("interface-error-container");
    listContainer.classList.add("list-container");

    appendChildren(userInterface, message, allowButton, interfaceErrorContainer);
    appendChildren(app, userInterface, listContainer);
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
    const listContainer = document.querySelector(".list-container");
    listContainer.innerHTML = "";

    displayFilterOptions();

    if (data.currentAtms.length) {
        data.currentAtms.forEach(atm => {
            const card = document.createElement("div");
            const bankName = document.createElement("p");
            const distanceFromUser = document.createElement("p");
            const map = document.createElement("img");

            const { lat, lng, name, distance } = atm;
            bankName.textContent = name;
            distanceFromUser.textContent = formatDistance(distance);
            map.src = `${GOOGLE_STATIC_MAPS_URL}&markers=size:mid|${lat},${lng}`;
            map.alt = "ATM Location Map";

            appendChildren(card, map, bankName, distanceFromUser);
            appendChildren(listContainer, card);
        });
    } else {
        errorHandler("NO_RESULTS");
    }
};

const displayFilterOptions = () => {
    const listContainer = document.querySelector(".list-container");

    const buttonGroup = document.createElement("div");
    const sortButton = document.createElement("button");
    const multiCurrencyButton = document.createElement("button");
    const filterErrorContainer = document.createElement("div");

    sortButton.textContent = "Sort by distance";
    multiCurrencyButton.textContent = "Show only multi-currency ATMs";
    filterErrorContainer.classList.add("filter-error-container");

    sortButton.addEventListener("click", handleSortClick);
    multiCurrencyButton.addEventListener("click", handleFilterClick);

    appendChildren(buttonGroup, sortButton, multiCurrencyButton, filterErrorContainer);
    listContainer.prepend(buttonGroup);
};

const handleSortClick = () => {
    data.sort = !data.sort;
    assignCurrentAtms();
};

const handleFilterClick = () => {
    data.onlyMultyCurrency = !data.onlyMultyCurrency;
    assignCurrentAtms();
};

const assignCurrentAtms = () => {
    const { closestAtms, sort, onlyMultyCurrency } = data;

    if (sort && !onlyMultyCurrency) {
        data.currentAtms = sortByDistance(closestAtms);
    } else if (sort && onlyMultyCurrency) {
        data.currentAtms = sortByDistance(closestAtms).filter(atm => atm.isMultiCurrency);
    } else if (!sort && onlyMultyCurrency) {
        data.currentAtms = data.currentAtms.filter(atm => atm.isMultiCurrency);
    } else if (!sort && !onlyMultyCurrency) {
        data.currentAtms = closestAtms;
    }
    
    displayAtmsList();
};

export const onPageLoad = () => {
    displayInterface();
};