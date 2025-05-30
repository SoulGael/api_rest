import validators from './validators.js';

export default (mongooseModel, moduleValidator) => {
  const instanceValidators = validators(moduleValidator);
  
  return {
    get: async (filters, params = {}) => {
      const filter = {};

      const searchableFields = Object.entries(mongooseModel.schema.paths)
      .filter(([, val]) => val.options?.isSearchable)
      .map(([key]) => key);
      
      for (const key in filters) {
        if (searchableFields.includes(key)) {
          filter[key] = {$regex: filters[key], $options: 'i'};
        } else {
          filter[key] = filters[key];
        }
      }

      const data = await mongooseModel.find(filter)
      .skip(params.skip)
      .limit(params.limit)
      .select(params.select);

      const totalDataCount = await mongooseModel.countDocuments(filter);
      const totalPages = Math.ceil(totalDataCount / params.limit);

      const result = {
        data: data,
        pagination: {
          page: params.page,
          limit: params.limit,
          total: totalDataCount,
          totalPages: totalPages
        }
      }

      return result;
    }, 
    post: async (body) => {
      instanceValidators(body);

      const response = await mongooseModel.create(body);

      return response;
    },
    put: async (body) => {
      instanceValidators(body);

      const response = await mongooseModel.findByIdAndUpdate(body._id, body, {
        new: true,
        runValidators: true
      });

      if (!response) {
        throw new Error(`No se encontró el registro con id ${body._id}`);
      }

      return response;
    },
    delete: async (id) => {
      const response = await mongooseModel.findByIdAndDelete(id);

      if (!response) {
        throw new Error(`No se encontró el registro con id ${id}`);
      }

      return { success: true, message: 'Registro eliminado correctamente' };
    }
  };
};
