import { GOOGLE_STATIC_MAPS_URL } from "../../../constants";

import { appendChildren, formatDistance } from "../../../utils/helpers";
import { displayFilterOptions } from "../filterOptions/filterOptions";

export const displayAtmsList = (currentAtms, errorHandler) => {
    const listContainer = document.querySelector(".list-container");
    listContainer.innerHTML = "";

    displayFilterOptions();

    if (currentAtms.length) {
        currentAtms.forEach(atm => {
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