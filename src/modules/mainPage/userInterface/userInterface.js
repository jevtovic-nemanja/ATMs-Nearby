import { appendChildren } from "../../../utils/helpers";
import { getUserLocationData } from "../mainPage";

export const displayInterface = () => {
    const app = document.querySelector(".app");
    const userInterface = document.createElement("div");
    const message = document.createElement("span");
    const findButton = document.createElement("button");
    const interfaceErrorContainer = document.createElement("div");
    const listContainer = document.createElement("div");

    message.textContent = "Find nearby ATMs";
    findButton.textContent = "Use My Location";
    findButton.classList.add("btn-find");
    interfaceErrorContainer.classList.add("interface-error-container");
    listContainer.classList.add("list-container");

    findButton.addEventListener("click", getUserLocationData);

    appendChildren(userInterface, message, findButton, interfaceErrorContainer);
    appendChildren(app, userInterface, listContainer);
};