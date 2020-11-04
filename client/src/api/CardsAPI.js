import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api';

export default class CardsAPI {

    static shuffleNewDeck() {
        return axios.get(`${BASE_URL}/deck/new/shuffle/?deck_count=6`)
            .then(response => response.data);
    }


    static draw(id, number) {
        return axios.get(`${BASE_URL}/deck/${id}/draw/?count=${number}`)
            .then(response => response.data);
    }

}
