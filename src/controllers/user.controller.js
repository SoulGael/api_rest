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

export const createUser = async (req, res, next) => {
  try {
    req.body.name = toCapitalCase(req.body.name);
    req.body.email = req.body.email.toLowerCase().trim();
    const newUser = await userService.createUser(req.body);
    return res.status(201).json(success('User created', newUser.id));
  } catch (err) {
    next(err);
  }
};
