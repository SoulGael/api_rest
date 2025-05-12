import { User } from '../models/user.model.js';

export const getAllUsers = async () => {
  return await User.find({}, 'name email createdAt updatedAt');
};

export const createUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }

  return await User.create(data);
};
