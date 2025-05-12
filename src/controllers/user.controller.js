import * as userService from '../services/user.service.js';
import { success, error } from '../utils/response.js';
import { toCapitalCase } from '../utils/format.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(success('Users fetched', users));
  } catch (err) {
    next(err);
  }
};