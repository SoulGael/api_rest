import mongoose from 'mongoose';
import model from '../core/model.js';
import authValidator from './auth.validator.js';

const authSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId},
  token: {type: String}
}, {collection: 'auth'});

const mongooseModel = mongoose.model('auth', authSchema);
const authModel = model(mongooseModel, authValidator);

export default authModel;
