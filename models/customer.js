const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  }
}));

const validateNewCustomer = customer => {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(20).required(),
  };
  return Joi.validate(customer, schema)
};

const validateCustomerUpdate = customer => {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50),
    phone: Joi.string().min(5).max(20),
  };
  return Joi.validate(customer, schema)
};

exports.Customer = Customer;
exports.validateNew = validateNewCustomer;
exports.validateUpdate = validateCustomerUpdate;