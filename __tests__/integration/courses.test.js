const request = require('supertest');
const { Course } = require('../../models/course');

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
});