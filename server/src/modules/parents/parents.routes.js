import routes from '../core/routes.js';
import parentsModel from './parents.model.js';

export default (app) => {
  
  const instanceRoutes = routes(app, '/api/parents', parentsModel);

  instanceRoutes.setup({
    get: true,
    post: true
  });
};
