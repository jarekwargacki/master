if (process.env.NODE_ENV !== 'production') {
    require('dotenv/config');
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());


const homesRouter = require('./routes/homes');
app.use('/', homesRouter);


const personsRouter = require('./routes/persons');
app.use('/persons', personsRouter);


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.listen(process.env.PORT || 3000);