const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Course = mongoose.model('Course', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

const validateCourse = course => {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(course, schema);
};

router.get('/', async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});

router.post('/', async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({ name: req.body.name });
  course = await course.save();
  res.send(course);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

module.exports = router;
