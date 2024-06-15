import { compare, hash } from '../utils/password.js';
import { User } from '../models/user.schema.js';

export const signup = async ({ email, passwordStr, name }) => {
  const { password, salt } = await hash(passwordStr);
  console.log('Password', password, salt);
  try {
    const user = await User.create({ email, password, name });
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Error creating user',
    };
  }
};

export const login = async ({ email, passwordStr }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  const { password } = user;
  const isMatch = await compare(passwordStr, password);
  if (!isMatch) {
    return {
      error: 'Wrong password',
    };
  } else {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
};
