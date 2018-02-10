import { getUserLocation } from "./services/geolocationService";

const app = document.querySelector(".app");

export const onPageLoad = () => {
    app.textContent = "The app is running.";
};