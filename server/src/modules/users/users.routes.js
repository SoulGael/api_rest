import routes from '../core/routes.js';
import usersModel from './users.model.js';
import userPermissions from './users.permissions.js';

export default (app) => {
  const instanceRoutes = routes(app, '/api/users', usersModel, userPermissions);
  
  instanceRoutes.setup({
    get: true,
    post: true
  });
};
