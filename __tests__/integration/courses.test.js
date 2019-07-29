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

    let token;
    let name;

    const exec = async () => {
      return await await request(server)
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

    it('saves the genre if it is valid', async () => {
      await exec();
      const course = Course.find({ name: 'genre1' });
      expect(course).not.toBeNull();
    });

    it('returns the genre if it is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });
  });
});