export default (modulePermissions) => {
  if(!modulePermissions){
    throw new Error(`Debe tener un modulo de permisos`);
  }
  return (fields, method) => {
    if (!fields) return [];
    const allowedFields = modulePermissions[method];
    const notAllowed = fields.filter((field) => !allowedFields.includes(field));

    if (notAllowed.length > 0) {
      throw new Error(`Campos no permitidos en ${method}: ${notAllowed.join(', ')}`);
    }

    return fields;
  };
}; 
