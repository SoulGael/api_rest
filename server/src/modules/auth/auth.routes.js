
import crypto from 'crypto';

import usersModel from '../users/users.model.js';
import authModel from './auth.model.js';

export default (app) => {
  app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const hashPassword = crypto.createHash('sha256').update(password).digest('hex');
    const users = await usersModel.get({email: email, password: hashPassword});
    console.log('🚀 ~ app.post ~ users:', users);

    if(users.length > 0){
      const token = crypto.randomBytes(32).toString('hex');
      const auth = await authModel.post({
        user: users[0]._id,
        name: users[0].name,
        token: token
      });

      return res.json({
        response: auth,
        errors: []
      })
    }

    return res.json({
      response: [],
      errors: ['no logged in']
    })
  })
};
