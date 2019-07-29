const request = require('supertest');
const { Course } = require('../../models/course');
const { User } = require('../../models/user');

let server;

describe('/api/courses', () => {

  beforeEach(() => { server = require('../../app')});
  afterEach(async () => {
    server.close();
    await Course.remove({});
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
      //
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('returns a 401 if client is not logged in', async () => {
      const res = await request(server)
        .post('/api/courses')
        .send({ name: 'course1' });

      expect(res.status).toBe(401);
    });

    it('returns a 400 if course is less than 5 characters', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post('/api/courses')
        .set('x-auth-token', token)
        .send({ name: '1234' });

      expect(res.status).toBe(400);
    });

    it('returns a 400 if course is more than 50 characters', async () => {
      const token = new User().generateAuthToken();

      const name = 'a'.repeat(51);

      const res = await request(server)
        .post('/api/courses')
        .set('x-auth-token', token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });

    it('saves the genre if it is valid', async () => {
      const token = new User().generateAuthToken();

      await request(server)
        .post('/api/courses')
        .set('x-auth-token', token)
        .send({ name: 'course1' });

      const course = Course.find({ name: 'genre1' });
      expect(course).not.toBeNull();
    });

    it('returns the genre if it is valid', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post('/api/courses')
        .set('x-auth-token', token)
        .send({ name: 'course1' });

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });
  });
});