import UserCoordinates from "../entities/userLocation";
import Atm from "../entities/atm";

class DataService {
    constructor() { }

    getUserCoordinates(position) {
        const { latitude, longitude } = position.coords;
        const userCoordinates = new UserCoordinates(latitude, longitude);
        return userCoordinates;
    }

    getAtmData(userCoordinates, getDataSuccess, errorCallback) {
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
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: ["atm"]
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            status === "OK"
                ? results.forEach(
                    result => this.getDistance(
                        userCoordinates, result,
                        distance => this.packAtmData(result, distance, getDataSuccess, errorCallback),
                        errorCallback)
                )
                : errorCallback(status);
        });
    }

    packAtmData(atm, distanceFromUser, getDataSuccess, errorCallback) {
        const lat = atm.geometry.location.lat();
        const lng = atm.geometry.location.lng();
        const name = atm.name;
        const distance = distanceFromUser;
        const isMultiCurrency = name.toLowerCase().includes("telenor");

        const newAtm = new Atm(lat, lng, name, distance, isMultiCurrency);
        getDataSuccess(newAtm);
    }

    getDistance(userCoordinates, atm, getDistanceSuccess, errorCallback) {
        const atmLat = atm.geometry.location.lat();
        const atmLng = atm.geometry.location.lng();

        const request = {
            origins: [{
                lat: userCoordinates.lat,
                lng: userCoordinates.lng
            }],
            destinations: [{
                lat: atmLat,
                lng: atmLng
            }],
            travelMode: "DRIVING"
        };

        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(request, (result, status) => {
            if (status === "OK") {
                getDistanceSuccess(result.rows[0].elements[0].distance.text);
            } else {
                errorCallback(status);
            }
        });
    }
}

export const dataService = new DataService();