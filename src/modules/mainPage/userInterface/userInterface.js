import { appendChildren } from "../../../utils/helpers";

import "./userInterface.scss";

export const displayInterface = () => {
    const app = document.querySelector(".app");
    const wrapper = document.createElement("div");
    const uiContainer = document.createElement("div");
    const loaderContainer = document.createElement("div");
    const filterContainer = document.createElement("div");
    const listContainer = document.createElement("div");
    const interfaceErrorContainer = document.createElement("div");
    const title = document.createElement("h4");
    const findButton = document.createElement("button");

    wrapper.classList.add("wrapper");
    uiContainer.classList.add("ui-container");
    loaderContainer.classList.add("loader-container");
    filterContainer.classList.add("filter-container");
    listContainer.classList.add("list-container");
    interfaceErrorContainer.classList.add("interface-error-container");

    title.textContent = "Find nearby ATMs";
    title.classList.add("title");
    findButton.textContent = "Use My Location";
    findButton.classList.add("btn-find");

    appendChildren(uiContainer, title, findButton, interfaceErrorContainer, loaderContainer);
    appendChildren(wrapper, uiContainer, filterContainer, listContainer);
    appendChildren(app, wrapper);
};

export const changeUIPosition = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.add("wrapper-top");
};