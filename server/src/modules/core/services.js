import {success, error} from '../../utils/response.js';
import permissions from './permissions.js';

export default (path, model, modulePermissions) => {
  const instancePermissions = permissions(modulePermissions);

  return {
    get: async (req, res) => {
      try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const select = req.query.select;
        
        const fields = select ? select.trim().split(/\s+/) : '';

        instancePermissions(fields, 'get');
        
        const skip = (page - 1) * limit;

        Reflect.deleteProperty(req.query, 'page');
        Reflect.deleteProperty(req.query, 'limit');
        Reflect.deleteProperty(req.query, 'select');
        
        const result = await model.get(req.query, {skip: skip, limit: limit, page: page, select: select});

        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    }, 
    post: async (req, res) => {
      try {
        const body = req.body;

        const fields = Object.keys(body);
        instancePermissions(fields, 'post');

        const result = await model.post(body);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    },
    put: async (req, res) => {
      try {
        const body = req.body;

        const fields = Object.keys(body);
        instancePermissions(fields, 'put');

        const result = await model.put(body);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    },
    delete: async (req, res) => {
      try {
        const body = req.body;

        const fields = Object.keys(body);
        instancePermissions(fields, 'delete');

        const result = await model.delete(body.id);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    }
  };
};
