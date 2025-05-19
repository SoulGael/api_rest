import validatorsComponents from '../../utils/validators.js';

export default {
  phoneNumber: [validatorsComponents().minLength(10)], 
  job: [validatorsComponents().maxLength(50)]
};
