import { compare, hash } from '../utils/password.js';
import { User } from '../models/user.schema.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async ({ email, passwordStr, name }) => {
  const { password, salt } = await hash(passwordStr);
  try {
    const user = await User.create({ email, password, name });
    return {
      success: true,
      id: user._id,
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Error creating user',
    };
  }
};

export const login = async ({ email, passwordStr }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        code: 401,
        error: 'User not found',
      };
    }

    const { password } = user;
    const isMatch = await compare(passwordStr, password);
    if (!isMatch) {
      return {
        error: 'Wrong email or password!',
      };
    } else {
      const token = generateToken(user);
      return {
        success: true,
        id: user._id,
        token,
      };
    }
  } catch (error) {
    return {
      code: 500,
      error: 'Error processing data, please try again',
    };
  }
};

export const validateUser = async (email, name) => {
  const error = 'User not found';
  try {
    const user = await User.findOne({ email, name });
    if (!user) {
      return {
        error,
      };
    }
    return user;
  } catch (err) {
    console.error(err);
    return {
      error,
    };
  }
};
