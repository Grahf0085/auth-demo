import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

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

    await UserService.create({ 
      email: 'tuckerhoog@tutanota.com', 
      password: 'password', 
      profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b' 
    }); 

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

describe('post routes', () => {

  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new post', async () => {

    const res = await agent
      .post('/api/v1/posts')
      .send({
        photoURL: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F1c897825-dca0-43fd-91f9-ebba9f749a10%2Fd7cliy8-42606c99-db19-4ebc-85de-e1a2abeeb24d.jpg%2Fv1%2Ffill%2Fw_1024%2Ch_641%2Cq_75%2Cstrp%2Fneon_genesis_evangelion_wallpaper_by_raddo90_d7cliy8-fullview.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQxIiwicGF0aCI6IlwvZlwvMWM4OTc4MjUtZGNhMC00M2ZkLTkxZjktZWJiYTlmNzQ5YTEwXC9kN2NsaXk4LTQyNjA2Yzk5LWRiMTktNGViYy04NWRlLWUxYTJhYmVlYjI0ZC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.ROd-bbidccH_ub_bFFd9MlCX1NDvgQjoP5Ebj3_mjMo&sp=1625071927T659d9a20d4dcd3b09d9be61c69449f4ef61b75dada47d9d8c886861e69cc3a41',
        caption: 'shinji' 
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com',
      profilePhotoUrl: 'https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fi.ibb.co%2FHh5QNsQ%2FWiseman.png&sp=1625069635Tc55a9e659f1c58353e1c991d4fc8177e769586ea4a7948daa9fd9b2a349c3c0b'
    });
  });

});

