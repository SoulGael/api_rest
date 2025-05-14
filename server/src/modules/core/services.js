import {success, error} from '../../utils/response.js';

export default (path, model) => {
  return {
    get: async (req, res) => {
      try {
        const result = await model.get(req.query);

        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(path, err));
      }
    }
  };
};
