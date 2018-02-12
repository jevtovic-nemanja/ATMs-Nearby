import { appendChildren } from "../../../utils/helpers";
import { getUserLocationData } from "../mainPage";

import "./userInterface.css";

export const displayInterface = () => {
    const app = document.querySelector(".app");
    const uiContainer = document.createElement("div");
    const message = document.createElement("h4");
    const findButton = document.createElement("button");
    const interfaceErrorContainer = document.createElement("div");
    const loaderContainer = document.createElement("div");
    const listContainer = document.createElement("div");

    uiContainer.classList.add("ui-container");
    message.textContent = "Find nearby ATM";
    message.classList.add("title");
    findButton.textContent = "Use My Location";
    findButton.classList.add("btn-find");
    interfaceErrorContainer.classList.add("interface-error-container");
    listContainer.classList.add("list-container");
    loaderContainer.classList.add("loader-container");

    findButton.addEventListener("click", getUserLocationData);
    findButton.addEventListener("click", changeUIPosition);

    appendChildren(uiContainer, message, findButton, interfaceErrorContainer, loaderContainer);
    appendChildren(app, uiContainer, listContainer);
};

const changeUIPosition = () => {
    const userInterface = document.querySelector(".ui-container");
    userInterface.classList.add("ui-container-top");
};