export default () => ({
  maxLength: (expectedLength) => (value, field) => {
    if (!value) {
      throw new Error(`Faltan campos obligatorios`);
    }
    if (value.length > expectedLength) {
      throw new Error(`${field} debe tener máximo ${expectedLength} caracteres`);
    }
  },
  
  minLength: (expectedLength) => (value, field) => {
    if (!value) {
      throw new Error(`Faltan campos obligatorios`);
    }

    if (value.length < expectedLength) {
      throw new Error(`${field} debe tener al menos ${expectedLength} caracteres`);
    }
  },
  
  exactLength: (expectedLength) => (value, field) => {
    if (!value) {
      throw new Error(`Faltan campos obligatorios`);
    }
    if (value.length !== expectedLength) {
      throw new Error(`${field} debe tener exactamente ${expectedLength} caracteres`);
    }
  }
});
