const request = require('supertest');
const mongoose = require('mongoose');
const { Course } = require('../../models/course');
const { User } = require('../../models/user');

let server;

describe('/api/courses', () => {

  beforeEach(() => { server = require('../../app')});
  afterEach(async () => {
    await Course.remove({});
    server.close();
  });

  describe('GET', () => {
    it('returns all courses', async () => {
      await Course.collection.insertMany([
        { name: 'course1' },
        { name: 'course2' }
      ]);

      const res = await request(server).get('/api/courses');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(c => c.name === 'course1')).toBeTruthy();
      expect(res.body.some(c => c.name === 'course2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('returns a course if a valid id is passed', async () => {
      const course = new Course({ name: 'course1' });
      await course.save();

      const res = await request(server).get(`/api/courses/${course._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', course.name);
    });

    it('returns a 404 if an invalid id is passed', async () => {
      const res = await request(server).get('/api/courses/1');
      expect(res.status).toBe(404);
    });

    it('returns a 404 if no course exists for the id passed', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/courses/${id}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {

    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/courses')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'course1';
    });

    it('returns a 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('returns a 400 if course is less than 5 characters', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('returns a 400 if course is more than 50 characters', async () => {
      name = 'a'.repeat(51);
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('saves the course if it is valid', async () => {
      await exec();
      const course = Course.find({ name: 'genre1' });
      expect(course).not.toBeNull();
    });

    it('returns the course if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });
  });

  describe('PUT /:id', () => {

    let token;
    let name;
    let course_id;

    const exec = async () => {
      return await request(server)
        .put(`/api/courses/${course_id}`)
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(async () => {
      const course = new Course({ name: 'course1' });
      await course.save();
      course_id = course._id;
      token = new User().generateAuthToken();
      name = 'course2';
    });

    it('returns a 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('returns a 400 if course is less than 5 characters', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('returns a 400 if course is more than 50 characters', async () => {
      name = 'a'.repeat(51);
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('returns a 404 if no course exists for the id passed', async () => {
      course_id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('saves the course if it is valid', async () => {
      await exec();
      const course = Course.find({ name: 'course2' });
      expect(course).not.toBeNull();
    });

    it('returns the course if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });
  });

  describe('DELETE /:id', () => {

    let token;
    let course_id;

    const exec = async () => {
      return await request(server)
        .del(`/api/courses/${course_id}`)
        .set('x-auth-token', token);
    };

    beforeEach(async () => {
      const course = new Course({ name: 'course1' });
      await course.save();
      course_id = course._id;
      const user = new User();
      user.isAdmin = true;
      token = user.generateAuthToken();
    });

    it('returns a 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('returns a 403 if client is not logged in as admin', async () => {
      token = new User().generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it('returns a 404 if no course exists for the id passed', async () => {
      course_id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('deletes the course if it is valid', async () => {
      await exec();
      const course = await Course.find({ name: 'course1' });
      expect(course).toBeEmpty();
    });

    it('returns the course if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });
  });
});
