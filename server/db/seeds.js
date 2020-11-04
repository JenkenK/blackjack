use blackjack;
db.dropDatabase();

db.history.insertMany([
    {
        name: "Jenken",
        history:
            [
                {
                    win: true,
                    cardTotal: 20,
                    cardNum: 3,
                    blackjack: false
                },
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
        history:
            [
                {
                    win: false,
                    cardTotal: 23,
                    cardNum: 3,
                    blackjack: false
                },
                {
                    win: true,
                    cardTotal: 20,
                    cardNum: 3,
                    blackjack: false
                }
            ]
    },
    {
        name: "Dave",
        history:
            [
                {
                    win: true,
                    cardTotal: 21,
                    cardNum: 3,
                    blackjack: false
                },
                {
                    win: true,
                    cardTotal: 20,
                    cardNum: 3,
                    blackjack: false
                }
            ]
    },
    {
        name: "Yana",
        history:
            [
                {
                    win: true,
                    cardTotal: 21,
                    cardNum: 2,
                    backjack: true
                },
                {
                    win: true,
                    cardTotal: 20,
                    cardNum: 3,
                    blackjack: false
                }
            ]
    },
]);
