const baseURL = 'http://localhost:3000/api/history/';

export default {
    getResult() {
        return fetch(baseURL)
            .then(res => res.json())
    },

    updateResult(result) {
        return fetch(baseURL + result._id, {
            method: "PUT",
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }
}