const baseURL = 'http://localhost:3000/api/history/';

export default {
    getResult() {
        return fetch(baseURL)
            .then(res => res.json())
    }
}