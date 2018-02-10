import { appendChildren } from "../utils/helpers";

import { getUserLocation } from "./services/geolocationService";

const app = document.querySelector(".app");

const displayGoButton = () => {
    const div = document.createElement("div");
    const message = document.createElement("span");
    const goButton = document.createElement("button");

    message.textContent = "Find nearby ATMs";
    goButton.textContent = "Go";

    appendChildren(div, message, goButton);
    appendChildren(app, div);
};

export const onPageLoad = () => {
    displayGoButton();
};