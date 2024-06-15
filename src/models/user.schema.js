import mongoose, { Schema } from 'mongoose';

export const USER_TYPE = {
  ADMIN: 'admin',
  REGULAR: 'regular',
  PREMIUM: 'premium',
};

export const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, default: USER_TYPE.REGULAR },
});

export const User = mongoose.model('User', userSchema);
