import { validateUser } from '../services/users.js';
import { decodeToken } from '../utils/jwt.js';

export async function verifyUser(req, res, next) {
  const error = { error: 'Unauthorized' };
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json(error);
  }

  try {
    const token = decodeToken(authToken);
    const [email, name] = token.split('-');

    const data = await validateUser(email, name);
    if (data.error) {
      return res.status(401).json(error);
    }
    res.locals.user = data;
    next();
  } catch (err) {
    return res.status(401).json(error);
  }
}
