import express from 'express';
import {getParents} from './parent.controller.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', getParents);

export default router;
