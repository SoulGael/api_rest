export default (mongooseModel) => {
  // console.log('🚀 ~ get: ~ mongooseModel:', JSON.stringify(mongooseModel.schema.paths.name.options));
  return {
    get: async (filters, params) => {
      const filter = {};

      const searchableFields = Object.entries(mongooseModel.schema.paths)
      .filter(([_, val]) => val.options?.isSearchable)
      .map(([key]) => key);
      
      for (const key in filters) {
        if (searchableFields.includes(key)) {
          filter[key] = { $regex: filters[key], $options: 'i' };
        } else {
          filter[key] = filters[key];
        }
      }

      const data = await mongooseModel.find(filter)
      .skip(params.skip)
      .limit(params.limit)
      .select(params.select);

      return data;
    }
  }
}