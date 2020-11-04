use blackjack;
db.dropDatabase();

db.history.insertMany([
    {
        win: '0',
        loss: '0',
        draw: '0',
        blackjack: '0'
    }
]);
