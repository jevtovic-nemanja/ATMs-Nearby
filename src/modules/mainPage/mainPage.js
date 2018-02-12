import { RESULTS_PER_REQUEST } from "../../constants";

import { geolocationService } from "../services/geolocationService";
import { dataService } from "../services/dataService";

import { displayInterface, changeUIPosition } from "./userInterface/userInterface";
import { displayFilterOptions, toggleCheckmark } from "./filterOptions/filterOptions";
import { displayAtmsList } from "./atmsList/atmsList";
import { showLoader, hideLoader } from "./loader/loader";
import { displayError } from "./error/error";

const app = document.querySelector(".app");
let data = {
    atms: [],
    sortedAtms: [],
    currentAtms: [],
    sort: false,
    onlyMultiCurrency: false
};

export const getUserLocationData = () => {
    const interfaceErrorContainer = document.querySelector(".interface-error-container");
    interfaceErrorContainer.textContent = "";

    geolocationService.getUserGeoPosition(
        message => displayError(message),
        userCoordinates => {
            showLoader();
            getAtmList(userCoordinates);
        },
        error => displayError(error)
    );
};

const getAtmList = userCoordinates => {
    const allAtms = [];

    dataService.getAtmData(userCoordinates,
        atm => {
            allAtms.push(atm);
            if (allAtms.length === RESULTS_PER_REQUEST) {
                findClosestAtms(allAtms);
                hideLoader();
                changeUIPosition();
                displayFilterOptions();
                displayAtmsList(data.currentAtms, displayError);
            }
        },
        error => displayError(error));
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
    toggleCheckmark("sort-check");
    assignCurrentAtms();
};

export const handleFilterClick = () => {
    data.onlyMultiCurrency = !data.onlyMultiCurrency;
    toggleCheckmark("filter-check");
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

    displayAtmsList(data.currentAtms, displayError);
};

export const onPageLoad = () => {
    displayInterface();
};