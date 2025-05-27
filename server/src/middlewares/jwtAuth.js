import {success, error} from '../utils/response.js';
import authModel from '../modules/auth/auth.model.js';
import usersModel from '../modules/users/users.model.js';

export default () => {
  return async (req, res, next) => {
    try {
      const pathRequest = req.path;
      if(pathRequest == '/api/login'){
        return next();
      }
      
      const authHeader = req.get('Authorization');

      const token = authHeader.split(' ')[1];
      
      const record = await authModel.get({token: token});
  
      if (new Date() > new Date(record[0].expiresAt)) {
        return res.status(401).json({ success: false, message: 'Token expirado' });
      }
      
      const users = await usersModel.get({_id: record[0].user});

      const allowedRoutes = users[0].routes;
      const allowed = allowedRoutes.some((route) => pathRequest.includes(`/api/${route}`));

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos suficientes para acceder a esta ruta'
        });
      }
      
      req.user = users[0];

  
      return next();
    } catch (err) {
      console.log('🚀 ~ return ~ err:', err);
      return res.json(error('Ha sucedido un problema, por favor revise sus credenciales', 500));
    }
  };
};
