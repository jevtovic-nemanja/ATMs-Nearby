class Atm {
    constructor(lat, lng, name, distance, isMultiCurrency) {
        this._lat = lat;
        this._lng = lng;
        this._name = name;
        this._distance = distance;
        this._isMultiCurrency = isMultiCurrency;
    }

    get lat() {
        return this._lat;
    }

    get lng() {
        return this._lng;
    }

    get name() {
        return this._name;
    }

    get distance() {
        return this._distance;
    }

    get isMultiCurrency() {
        return this._isMultiCurrency;
    }
}

export default Atm;