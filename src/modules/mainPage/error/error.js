import "./error.css";

export const displayError = error => {
    const interfaceErrorContainer = document.querySelector(".interface-error-container");
    const filterErrorContainer = document.querySelector(".filter-error-container");

    if (error.code && error.code === 1) {
        interfaceErrorContainer.textContent = "Geolocation is currently disabled. Please enable it in your browser's settings in order to see the results.";
    } else if (error === "NO_RESULTS") {
        filterErrorContainer.textContent = "There are no results for the specified search criteria.";
    } else if (error === "NO_GEOLOCATION") {
        interfaceErrorContainer.textContent = "Unfortunately, geolocation is not supported by your browser.";
    } else {
        interfaceErrorContainer.textContent = "Unfortunately, something has went wrong. Don't worry, we're looking into it.";
    }
};