import mongoose from 'mongoose';
import model from '../core/model.js';

const parentSchema = new mongoose.Schema({
  name: {type: String, isSearchable: true},
  email: {type: String}
}, {collection: 'parents'});

const mongooseModel = mongoose.model('parents', parentSchema);
const parentsModel = model(mongooseModel);
export default parentsModel;
