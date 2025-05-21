export default () => ({
  maxLength: (expectedLength) => (value, field) => {
    if (value.length > expectedLength) {
      throw new Error(`${field} debe tener máximo ${expectedLength} caracteres`);
    }
  },
  
  minLength: (expectedLength) => (value, field) => {
    console.log('🚀 ~ value, field:', value, field);

    if (value.length < expectedLength) {
      throw new Error(`${field} debe tener al menos ${expectedLength} caracteres`);
    }
  },
  
  exactLength: (expectedLength) => (value, field) => {
    if (value.length !== expectedLength) {
      throw new Error(`${field} debe tener exactamente ${expectedLength} caracteres`);
    }
  }
});
