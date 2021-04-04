const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const billSchema = mongoose.Schema({
  name: { type: String, required: true},
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  product: { type: Object, required: true },
  price: { type: String, required: true },
});

billSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Bill', billSchema);
