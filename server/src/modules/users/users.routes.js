import routes from '../core/routes.js';
import {User} from './users.model.js';

export default (app) => {
  const model = {
    get: async (query, pagination) => {
      const filter = {};
      const allowedFields = ['name', 'email'];

      allowedFields.forEach((field) => {
        if (query[field]) {
          filter[field] = { $regex: query[field], $options: 'i' };
        }
      });
      
      const [users, total] = await Promise.all([
        User.find(filter, 'name email createdAt updatedAt')
        .skip(pagination.skip)
        .limit(pagination.limit),
        User.countDocuments(filter)
      ]);

      return {
        page: pagination.page,
        totalPages: Math.ceil(total / pagination.limit),
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
