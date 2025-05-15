import routes from '../core/routes.js';
import {Parents} from './parents.model.js';

export default (app) => {
  const model = {
    get: async (query, pagination) => {
      const filter = {};
      const allowedFields = ['name', 'email'];

      allowedFields.forEach((field) => {
        if (query[field]) {
          filter[field] = {$regex: query[field], $options: 'i'};
        }
      });

      const [parents, total] = await Promise.all([
        Parents.find(filter, 'name email createdAt updatedAt')
        .skip(pagination.skip)
        .limit(pagination.limit),
        Parents.countDocuments(filter)
      ]);
  
      return {
        page: pagination.page,
        totalPages: Math.ceil(total / pagination.limit),
        total,
        parents
      };
    }
  };

  const instanceRoutes = routes(app, '/api/parents', model);

  instanceRoutes.setup({
    get: true,
    post: false
  });
};
