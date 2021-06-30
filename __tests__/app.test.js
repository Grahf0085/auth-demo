import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

// const agent = request.agent(app);

describe('user routes', () => {

  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async () => {

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'tuckerhoog@tutanota.com',
        password: 'p@ssword'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com'
    });
  });

});

