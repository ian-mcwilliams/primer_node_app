const mongoose = require('mongoose');
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

exports.Course = Course;
exports.validate = validateCourse;
