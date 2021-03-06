const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Course, validate } = require('../models/course');

router.get('/', async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({ name: req.body.name });
  course = await course.save();
  res.send(course);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send(`No course was found with id ${req.params.id}`);

  res.send(course);
});

module.exports = router;
