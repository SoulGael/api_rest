import mongoose from 'mongoose';
import model from '../core/model.js';

const parentSchema = new mongoose.Schema({
  complete_name: {type: String, isSearchable: true},
  job: {type: String},
  phone_number: {type: String}
}, {collection: 'parents'});

const mongooseModel = mongoose.model('parents', parentSchema);
const parentsModel = model(mongooseModel);
export default parentsModel;
