import { appendChildren } from "../../../utils/helpers";
import { getUserLocationData } from "../mainPage";

import "./userInterface.css";

export const displayInterface = () => {
    const app = document.querySelector(".app");
    const uiContainer = document.createElement("div");
    const wrapper = document.createElement("div");
    const message = document.createElement("h4");
    const findButton = document.createElement("button");
    const interfaceErrorContainer = document.createElement("div");
    const loaderContainer = document.createElement("div");
    const listContainer = document.createElement("div");
    const filterContainer = document.createElement("div");

    uiContainer.classList.add("ui-container");
    filterContainer.classList.add("filter-container");
    message.textContent = "Find nearby ATM";
    message.classList.add("title");
    findButton.textContent = "Use My Location";
    findButton.classList.add("btn-find");
    interfaceErrorContainer.classList.add("interface-error-container");
    listContainer.classList.add("list-container");
    loaderContainer.classList.add("loader-container");
    wrapper.classList.add("wrapper");

    findButton.addEventListener("click", getUserLocationData);

    appendChildren(uiContainer, message, findButton, interfaceErrorContainer, loaderContainer);
    appendChildren(wrapper, uiContainer, filterContainer, listContainer);
    appendChildren(app, wrapper);
};

export const changeUIPosition = () => {
    const userInterface = document.querySelector(".wrapper");
    userInterface.classList.add("wrapper-top");
};