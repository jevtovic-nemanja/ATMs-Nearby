class UserCoordinates {
    constructor(lat, lng) {
        this._lat = lat;
        this._lng = lng;
    }

    get lat() {
        return this._lat;
    }

    get lng() {
        return this._lng;
    }
}

export default UserCoordinates;