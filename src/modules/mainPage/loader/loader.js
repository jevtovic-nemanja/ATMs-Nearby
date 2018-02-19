import "./loader.scss";

export const showLoader = () => {
    const loaderContainer = document.querySelector(".loader-container");
    loaderContainer.innerHTML = "<i class=\"fas fa-spinner fa-spin fa-lg\"></i>";
};

export const hideLoader = () => {
    const loaderContainer = document.querySelector(".loader-container");
    loaderContainer.innerHTML = "";
};