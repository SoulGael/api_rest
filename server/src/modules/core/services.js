import {success, error} from '../../utils/response.js';

export default (path, model) => {
  return {
    get: async (req, res) => {
      try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const skip = (page - 1) * limit;

        Reflect.deleteProperty(req.query, 'page');
        Reflect.deleteProperty(req.query, 'limit');
        
        const result = await model.get(req.query, {skip: skip, limit: limit, page: page});

        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(path, err));
      }
    }
  };
};
