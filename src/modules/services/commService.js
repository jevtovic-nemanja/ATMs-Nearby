class CommService {
    constructor() { }

    getAtmData(userCoordinates, getDataSuccess, errorCallback) {
        const request = {
            location: {
                lat: userCoordinates.lat,
                lng: userCoordinates.lng
            },
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: ["atm"]
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            status === "OK"
                ? results.forEach(
                    result => this.getDistance(
                        userCoordinates, result,
                        distance => getDataSuccess(result, distance),
                        errorCallback)
                )
                : errorCallback(status);
        });
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

export const commService = new CommService();