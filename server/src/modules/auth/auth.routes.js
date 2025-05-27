
import crypto from 'crypto';

import usersModel from '../users/users.model.js';
import authModel from './auth.model.js';

export default (app) => {
  app.post('/api/login', async (req, res) => { 
    try {
      const {email, password} = req.body;
      const hashPassword = crypto.createHash('sha256').update(password).digest('hex');
      const users = await usersModel.get({email: email, password: hashPassword});
  
      if(users.length > 0){
        const token = crypto.randomBytes(32).toString('hex');
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora

        const auth = await authModel.post({
          user: users[0]._id,
          name: users[0].name,
          token: token,
          expiresAt: expiresAt
        });
  
        return res.json({
          response: auth,
          errors: []
        })
      }
  
      return res.json({
        response: [],
        errors: ['Por favor verifique las credenciales']
      })
    } catch (err) {
      return res.json({
        response: [],
        errors: ['Algo sucedió en el servidor', err.message]
      })
    }
  })
};
