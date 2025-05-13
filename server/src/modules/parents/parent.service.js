import {Parent} from './parent.model.js';

export const getAllParents = async (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const search = query.search?.toLowerCase() || '';

  const filter = {
    $or: [
      {name: {$regex: search, $options: 'i'}},
      {email: {$regex: search, $options: 'i'}}
    ]
  };

  const [parents, total] = await Promise.all([
    Parent.find(filter, 'name email createdAt updatedAt').skip(skip).limit(limit),
    Parent.countDocuments(filter)
  ]);

  return {
    parents,
    page,
    totalPages: Math.ceil(total / limit),
    total
  };
};

export const createParent = async (data) => {
  const existing = await Parent.findOne({email: data.email});

  if (existing) {
    const error = new Error('Email already exists');
    
    error.status = 409;
    throw error;
  }

  return Parent.create(data);
};
