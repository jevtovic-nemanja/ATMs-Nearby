import { MAX_RESULTS_PER_LIST } from "../../constants";

import { dataService } from "../services/dataService";

import { displayInterface, changeUIPosition } from "./userInterface/userInterface";
import { displayFilterOptions, toggleCheckmark } from "./filterOptions/filterOptions";
import { clearListContainer, displayAtm } from "./atmsList/atmsList";
import { showLoader, hideLoader } from "./loader/loader";
import { displayError } from "./error/error";

let data = {
    atms: [],
    sortedAtms: [],
    currentAtms: [],
    sort: false,
    onlyMultiCurrency: false
};

const addFindListener = () => {
    const findButton = document.querySelector(".btn-find");
    findButton.addEventListener("click", getUserLocationData);
};

const getUserLocationData = () => {
    const interfaceErrorContainer = document.querySelector(".interface-error-container");
    interfaceErrorContainer.textContent = "";

    dataService.getUserCoordinates(
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
        (atm, atmsLength) => {
            allAtms.push(atm);
            if (allAtms.length === atmsLength) {
                findClosestAtms(allAtms, atmsLength);
                hideLoader();
                changeUIPosition();
                displayFilterOptions();
                addFilterListeners();
                clearListContainer();
                data.currentAtms.forEach(atm => displayAtm(atm, true, atmsLength));
            }
        },
        error => displayError(error));
};

const addFilterListeners = () => {
    const sortButton = document.querySelector(".btn-sort");
    const filterButton = document.querySelector(".btn-filter");
    sortButton.addEventListener("click", handleSortClick);
    filterButton.addEventListener("click", handleFilterClick);
};

const handleSortClick = () => {
    data.sort = !data.sort;
    toggleCheckmark("sort-check");
    assignCurrentAtms();
};

const handleFilterClick = () => {
    data.onlyMultiCurrency = !data.onlyMultiCurrency;
    toggleCheckmark("filter-check");
    assignCurrentAtms();
};

const findClosestAtms = (atmList, atmsLength) => {
    const resultsPerList = atmsLength < MAX_RESULTS_PER_LIST ? atmsLength : MAX_RESULTS_PER_LIST;
    const closestAtms = sortByDistance(atmList).slice(0, resultsPerList);
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

    clearListContainer();
    
    if (data.currentAtms.length) {
        data.currentAtms.forEach(atm => displayAtm(atm, false));
    } else {
        displayError("NO_RESULTS");
    }
};

export const onPageLoad = () => {
    displayInterface();
    addFindListener();
};