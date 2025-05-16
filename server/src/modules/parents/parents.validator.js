import validatorsComponents from '../../utils/validators.js';

export default {
  phone_number: [validatorsComponents().minLength(10)], 
  job: [validatorsComponents().maxLength(50)]
}
