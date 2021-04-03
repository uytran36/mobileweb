const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/products');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/dbweb', {useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.set("view engine", "pug");
app.set("views", "../frontend/views");
app.use(express.static('../frontend'));

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;