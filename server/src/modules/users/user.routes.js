import express from 'express';
import {getUsers} from './user.controller.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', getUsers);

export default router;
