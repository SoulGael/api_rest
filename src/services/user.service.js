import { User } from '../models/user.model.js';

export const getAllUsers = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search?.toLowerCase() || '';

  const filter = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  };

  const [users, total] = await Promise.all([
    User.find(filter, 'name email createdAt updatedAt')
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter)
  ]);

  return {
    users,
    page,
    totalPages: Math.ceil(total / limit),
    total
  };
};