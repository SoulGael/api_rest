import express from 'express';
import { getUsers } from '../controllers/user.controller.js';
import Joi from 'joi';

const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});

router.get('/', getUsers);

export default router;
