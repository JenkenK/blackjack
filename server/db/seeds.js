use games_hub;
db.dropDatabase();

db.games.insertMany([
    {
        name: "Jenken",
        historyResult: [
            {
                win: true,
                cardTotal: 20,
                cardNum: 3,
                blackjack: false
            }
        ]
    },
    {
        name: "Paul",
        historyResult: [
            {
                win: false,
                cardTotal: 23,
                cardNum: 3,
                blackjack: false
            }
        ]
    },
    {
        name: "Dave",
        historyResult: [
            {
                win: true,
                cardTotal: 21,
                cardNum: 3,
                blackjack: false
            }
        ]
    },
    {
        name: "Yana",
        historyResult: [
            {
                win: true,
                cardTotal: 21,
                cardNum: 2,
                backjack: true

            }
        ]
    },
]);
