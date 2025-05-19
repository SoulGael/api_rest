import {success, error} from '../../utils/response.js';

export default (path, model, permissions) => {
  if (!permissions) {
    throw new Error('No tienen validador');
  }
    
  return {
    get: async (req, res) => {
      try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const select = req.query.select;
        
        const incomingFieldsRaw = select;
        const incomingFields = incomingFieldsRaw.trim().split(/\s+/);

        const allowedFields = permissions.get;

        const notAllowed = incomingFields.filter((field) => !allowedFields.includes(field));

        if (notAllowed.length > 0) {
          throw new Error(`Campos no permitidos en GET: ${notAllowed.join(', ')}`);
        }
        
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
        const allowedFields = permissions.post;
        const incomingKeys = Object.keys(req.body);

        const notAllowed = incomingKeys.filter((key) => !allowedFields.includes(key));

        if (notAllowed.length > 0) {
          throw new Error(`Campos no permitidos en POST: ${notAllowed.join(', ')}`);
        }

        const result = await model.post(req.body);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    },
    put: async (req, res) => {
      try {
        const allowedFields = permissions.put;
        const incomingKeys = Object.keys(req.body);

        const notAllowed = incomingKeys.filter((key) => !allowedFields.includes(key));

        if (notAllowed.length > 0) {
          throw new Error(`Campos no permitidos en PUT: ${notAllowed.join(', ')}`);
        }

        const result = await model.put(req.body);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    },
    delete: async (req, res) => {
      try {
        const allowedFields = permissions.delete;
        const incomingKeys = Object.keys(req.body);

        const notAllowed = incomingKeys.filter((key) => !allowedFields.includes(key));

        if (notAllowed.length > 0) {
          throw new Error(`Campos no permitidos en DELETE: ${notAllowed.join(', ')}`);
        }

        const result = await model.delete(req.body.id);
        
        return res.json(success(path, result));
      } catch (err) {
        return res.json(error(err.message, 500));
      }
    }
  };
};
