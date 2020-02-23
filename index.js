const mongoose = require('mongoose');

require('./models/comments.model');

const express = require('express');
const commentsController = require('./controllers/commentsController');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://komarik:1111@cluster0-i3mdk.mongodb.net/DiscussionPage?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let app = express();

//Middlewares
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/comments', commentsController);

app.listen(3001, () => {
    console.log('Server Express started at 3001 port');
});