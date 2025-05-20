export default (mongooseModel, validator) => {
  if (!validator) {
    throw new Error('No tienen validador');
  }
  
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

      return data;
    }, 
    post: async (body) => {
      Object.entries(validator).forEach(([key]) => {
        const rules = validator[key];
        const value = body[key];
    
        rules.forEach((validateFn) => {
          validateFn(value, key);
        });
      });

      const response = await mongooseModel.create(body);

      return response;
    },
    put: async (body) => {
      Object.entries(validator).forEach(([key]) => {
        const rules = validator[key];
        const value = body[key];

        rules.forEach((validateFn) => {
          validateFn(value, key);
        });
      });

      const response = await mongooseModel.findByIdAndUpdate(body.id, body, {
        new: true,
        runValidators: true
      });

      if (!response) {
        throw new Error(`No se encontró el registro con id ${id}`);
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
