class CommService {
    constructor() { }

    getData(url, successHandler, errorHandler) {
        fetch(url)
            .then(response => response.json())
            .then(data => successHandler(data))
            .catch(error => errorHandler(error));
    }
}

export const commService = new CommService();