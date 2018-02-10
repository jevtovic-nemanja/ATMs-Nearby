import { appendChildren } from "../../utils/helpers";

import { getUserPosition } from "../services/geolocationService";

const app = document.querySelector(".app");

const displayGoButton = () => {
    const div = document.createElement("div");
    const message = document.createElement("span");
    const goButton = document.createElement("button");

    message.textContent = "Find nearby ATMs";
    goButton.textContent = "Go";
    goButton.disabled = true;

    appendChildren(div, message, goButton);
    appendChildren(app, div);
};

export const onPageLoad = () => {
    displayGoButton();
};