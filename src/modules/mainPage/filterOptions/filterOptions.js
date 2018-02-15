import { appendChildren } from "../../../utils/helpers";

import "./filterOptions.css";

export const displayFilterOptions = () => {
    const filterContainer = document.querySelector(".filter-container");
    filterContainer.innerHTML = "";

    const sortButton = document.createElement("button");
    const multiCurrencyButton = document.createElement("button");
    const filterErrorContainer = document.createElement("div");

    sortButton.classList.add("btn-sort");
    multiCurrencyButton.classList.add("btn-filter");
    filterErrorContainer.classList.add("filter-error-container");

    sortButton.innerHTML = "Sort by distance <i class=\"fas fa-check sort-check\"></i>";
    multiCurrencyButton.innerHTML = "Only multi-currency ATMs <i class=\"fas fa-check filter-check\"></i>";
    
    appendChildren(filterContainer, sortButton, multiCurrencyButton, filterErrorContainer);
};

export const toggleCheckmark = element => {
    const checkmark = document.querySelector(`.${element}`);
    const filterErrorContainer = document.querySelector(".filter-error-container");
    
    filterErrorContainer.innerHTML = "";
    checkmark.classList.toggle("show-check");
};