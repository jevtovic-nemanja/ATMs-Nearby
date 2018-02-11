import { appendChildren } from "../../../utils/helpers";
import { handleFilterClick, handleSortClick } from "../mainPage";

export const displayFilterOptions = () => {
    const listContainer = document.querySelector(".list-container");

    const buttonGroup = document.createElement("div");
    const sortButton = document.createElement("button");
    const multiCurrencyButton = document.createElement("button");
    const filterErrorContainer = document.createElement("div");

    filterErrorContainer.classList.add("filter-error-container");
    sortButton.classList.add("btn-sort");
    multiCurrencyButton.classList.add("btn-filter");

    sortButton.addEventListener("click", handleSortClick);
    multiCurrencyButton.addEventListener("click", handleFilterClick);

    sortButton.textContent = "Sort by distance";
    multiCurrencyButton.textContent = "Show only multi-currency ATMs";
    
    appendChildren(buttonGroup, sortButton, multiCurrencyButton, filterErrorContainer);
    listContainer.prepend(buttonGroup);
};