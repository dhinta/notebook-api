import { Router } from 'express';
import { login, signup } from '../services/users.js';
import { generateToken } from '../utils/jwt.js';

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

  if (response.error) {
    return res.json(response);
  } else {
    const token = generateToken(response);
    return res.json({ ...response, token });
  }
});

export default router;
