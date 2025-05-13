import * as userService from './user.service.js';
import {success, error} from '../../utils/response.js';

export const getUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers(req.query);

    return res.json(success('Users fetched', result));
  } catch (err) {
    return res.json(error('Users error', err));
  }
};
