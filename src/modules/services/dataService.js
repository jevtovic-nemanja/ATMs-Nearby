import UserCoordinates from "../entities/userLocation";

class DataService {
    constructor() { }

    getUserCoordinates(position) {
        const { latitude, longitude } = position.coords;
        const userCoordinates = new UserCoordinates(latitude, longitude);
        return userCoordinates;
    }

    getAtmData(userCoordinates, successCallback, errorCallback) {
        const mapOptions = {
            center: {
                lat: userCoordinates.lat,
                lng: userCoordinates.lng
            },
            zoom: 15
        };

        const map = new google.maps.Map(document.getElementById("map"), mapOptions);

        const request = {
            location: mapOptions.center,
            radius: "50000",
            type: ["atm"]
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            status === "OK"
                ? successCallback(results)
                : errorCallback(status);
        });
    }
}

export const dataService = new DataService();