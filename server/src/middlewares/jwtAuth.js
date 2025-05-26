import {success, error} from '../utils/response.js';
import authModel from '../modules/auth/auth.model.js';
import usersModel from '../modules/users/users.model.js';

export default () => {
  return async (req, res, next) => {
    try {
      if(req.path == '/api/login'){
        return next();
      }
      
      const authHeader = req.get('Authorization');

      const token = authHeader.split(' ')[1];
      const record = await authModel.get({token: token});
  
      const users = await usersModel.get({_id: record[0].user});
      req.user = users[0];
  
      return next();
    } catch (err) {
      console.log('🚀 ~ return ~ err:', err);
      return res.json(error('Ha sucedido un problema, por favor revise sus credenciales', 500));
    }
  };
};
