import { GOOGLE_STATIC_MAPS_URL } from "../../../constants";

import { appendChildren, formatDistance } from "../../../utils/helpers";
import { displayFilterOptions } from "../filterOptions/filterOptions";

import "./atmsList.css";

export const clearListContainer = () => {
    const listContainer = document.querySelector(".list-container");
    listContainer.innerHTML = "";
};

let transitionCounter = 0;

export const displayAtm = (atm, isTransition, listLength) => {
    const listContainer = document.querySelector(".list-container");

    const card = document.createElement("div");
    const bankName = document.createElement("p");
    const distanceFromUser = document.createElement("p");
    const map = document.createElement("img");
    const text = document.createElement("div");

    const { lat, lng, name, distance } = atm;
    card.classList.add("card");
    bankName.textContent = name;
    bankName.classList.add("bank-name");
    distanceFromUser.textContent = formatDistance(distance);
    map.src = `${GOOGLE_STATIC_MAPS_URL}?size=150x150&zoom=15&scale=2&markers=size:small|${lat},${lng}`;
    map.alt = "ATM Location Map";
    text.classList.add("atm-info");

    appendChildren(text, bankName, distanceFromUser);
    appendChildren(card, map, text);
    appendChildren(listContainer, card);

    if (isTransition) {
        card.classList.add("card-initial");
        setTimeout(() => {
            card.classList.add("card-transition");
        }, transitionCounter);

        transitionCounter === (listLength - 1) * 100
            ? transitionCounter = 0
            : transitionCounter += 100;
    }
};