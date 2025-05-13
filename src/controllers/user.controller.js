import * as userService from '../services/user.service.js';
import { success, error } from '../utils/response.js';
import { toCapitalCase } from '../utils/format.js';

export const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    return res.json(success('Users fetched', result));
  } catch (err) {
    next(err);
  }
};
