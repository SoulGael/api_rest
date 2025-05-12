import express from 'express';
import { getUsers, createUser } from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import Joi from 'joi';

const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});

router.get('/', getUsers);
router.post('/', validate(userSchema), createUser);

export default router;
