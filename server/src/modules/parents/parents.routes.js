import routes from '../core/routes.js';
import parentsModel from './parents.model.js';
import parentsPermissions from './parents.permissions.js';

export default (app) => {
  const instanceRoutes = routes(app, '/api/parents', parentsModel, parentsPermissions);

  instanceRoutes.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
