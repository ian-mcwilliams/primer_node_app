const { User } = require('../../models/user');
const { Course } = require('../../models/course');
const request = require('supertest');

let server;

describe('auth middleware', () => {
  let token;

  beforeEach(async () => {
    server = await require('../../app');
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    await Course.remove({});
    await server.close();
  });

  const exec = () => {
    return request(server)
      .post('/api/courses')
      .set('x-auth-token', token)
      .send({name: 'course1'});
  };

  it('returns 401 if no token is provided', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('returns 400 if token is invalid', async () => {
    token = 'a';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('returns 200 if token is valid', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
