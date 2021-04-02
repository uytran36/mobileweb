const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://uytran:<uy12081999>@dbweb.htjgv.mongodb.net/dbweb?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });



module.exports = app;