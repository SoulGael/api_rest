import routes from '../core/routes.js';
import usersModel from './users.model.js';

export default (app) => {
  const instanceRoutes = routes(app, '/api/users', usersModel);
  
  instanceRoutes.setup({
    get: true,
    post: false
  });
};
