import validatorsComponents from '../../utils/validators.js';

export default {
  name: [validatorsComponents().maxLength(50)], 
  email: [validatorsComponents().maxLength(50)],
  password: [validatorsComponents().maxLength(20)]
};
