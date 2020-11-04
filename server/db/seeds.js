use blackjack;
db.dropDatabase();

db.history.insertMany([
    {
        win: '1',
        loss: '2',
        draw: '3',
        blackjack: '1'
    }
]);
