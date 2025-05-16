import mongoose from 'mongoose';
import model from '../core/model.js';
import parentsValidator from './parents.validator.js';

const parentSchema = new mongoose.Schema({
  complete_name: {type: String, isSearchable: true},
  job: {type: String},
  phone_number: {type: String}
}, {collection: 'parents'});

const mongooseModel = mongoose.model('parents', parentSchema);
const parentsModel = model(mongooseModel, parentsValidator);
export default parentsModel;
