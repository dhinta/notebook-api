import { Router } from 'express';
import { login, signup, validateUser } from '../services/users.js';
import { decodeToken } from '../utils/jwt.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const response = await signup({
    email: req.body.email,
    passwordStr: req.body.password,
    name: req.body.name,
  });
  res.json(response);
});

router.post('/login', async (req, res) => {
  const response = await login({
    email: req.body.email,
    passwordStr: req.body.password,
  });

  return res.json(response);
});

router.get('/me', async (req, res) => {
  const authToken = decodeToken(req.headers.authtoken);
  const [email, name] = authToken.split('-');
  const response = await validateUser(email, name);

  if (response.error) {
    return res.status(401).json(response);
  }

  return res.json(response);
});

export default router;
