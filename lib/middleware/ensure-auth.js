import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  console.log(req.cookies);

  const { session } = req.cookies;

  const payload = jwt.verify(session, process.env.APP_SECRET);

  req.user = payload;

  next();

}
