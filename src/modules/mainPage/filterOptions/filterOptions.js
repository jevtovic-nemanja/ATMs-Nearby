import { appendChildren } from "../../../utils/helpers";
import { handleFilterClick, handleSortClick } from "../mainPage";

import "./filterOptions.css";

export const displayFilterOptions = () => {
    const filterContainer = document.querySelector(".filter-container");

    const sortButton = document.createElement("button");
    const multiCurrencyButton = document.createElement("button");
    const filterErrorContainer = document.createElement("div");

    filterErrorContainer.classList.add("filter-error-container");
    sortButton.classList.add("btn-sort");
    multiCurrencyButton.classList.add("btn-filter");

    sortButton.addEventListener("click", handleSortClick);
    multiCurrencyButton.addEventListener("click", handleFilterClick);

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