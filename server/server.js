const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/createRouter.js');
const cors = require('cors')

app.use(parser.json());
app.use(cors())

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        const db = client.db('blackjack');
        const blackjackCollection = db.collection('history');
        const blackjackRouter = createRouter(blackjackCollection);
        app.use('/api/history', blackjackRouter);

    })
    .catch(console.error);


app.listen(3000, function () {
    console.log(`Listening on port ${this.address().port}`);
});
