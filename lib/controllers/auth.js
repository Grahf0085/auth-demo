import { Router } from 'express';

export default Router()
  
  .post('/api/v1/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_US
        });
        res.send(user);
      })
      .catch(next);
  });
