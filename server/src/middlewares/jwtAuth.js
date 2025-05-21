import authModel from '../modules/auth/auth.model.js';
import usersModel from '../modules/users/users.model.js';

export default () => {
  return async (req, res, next) => {
    if(req.path == '/api/login'){
      return next();
    }

    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const record = await authModel.get({token: token});
    
    if (!record || record.length === 0) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    const users = await usersModel.get({_id: record[0].user});
    req.user = users[0];

    return next();
  };
}
