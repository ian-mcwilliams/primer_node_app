const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send(`No customer was found with id ${req.params.id}`);

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateNewCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer(req.body);
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomerUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!customer) return res.status(404).send(`No customer was found with id ${req.params.id}`);

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send(`No customer was found with id ${req.params.id}`);

  res.send(customer);
});

module.exports = router;
