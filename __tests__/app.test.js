import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

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
        password: 'password',
        profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com',
      profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b'
    });
  });

  it('signs in a user via POST', async () => {

    await UserService.create({ email: 'tuckerhoog@tutanota.com', password: 'password', profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b' }); 

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tuckerhoog@tutanota.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com',
      profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b'

    });

  });

});

