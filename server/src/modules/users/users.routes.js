import routes from '../core/routes.js';
import {User} from './users.model.js';

export default (app) => {
  const model = {
    get: async (query) => {
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

      const [users, total] = await Promise.all([
        User.find(filter, 'name email createdAt updatedAt')
        .skip(skip)
        .limit(limit),
        User.countDocuments(filter)
      ]);

      return {
        page,
        totalPages: Math.ceil(total / limit),
        total,
        users
      };
    }
  };

  const instanceRoutes = routes(app, '/api/users', model);
  
  instanceRoutes.setup({
    get: true,
    post: false
  });
};
