import routes from '../core/routes.js';
import {Parents} from './parents.model.js';

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
  
      const [parents, total] = await Promise.all([
        Parents.find(filter, 'name email createdAt updatedAt').skip(skip).limit(limit),
        Parents.countDocuments(filter)
      ]);
  
      return {
        parents,
        page,
        totalPages: Math.ceil(total / limit),
        total
      };
    }
  };

  const instanceRoutes = routes(app, '/api/parents', model);

  instanceRoutes.setup({
    get: true,
    post: false
  });
};
