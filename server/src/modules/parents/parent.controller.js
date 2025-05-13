import * as parentService from './parent.service.js';
import {success, error} from '../../utils/response.js';

export const getParents = async (req, res) => {
  try {
    const result = await parentService.getAllParents(req.query);

    return res.json(success('Parents fetched', result));
  } catch (err) {
    return res.json(error('Users error', err));
  }
};
