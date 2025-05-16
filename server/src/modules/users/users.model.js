import mongoose from 'mongoose';
import model from '../core/model.js';
import usersValidator from './users.validator.js';

const userSchema = new mongoose.Schema({
  name: {type: String, isSearchable: true},
  email: {type: String},
  password: {type: String}
}, {collection: 'users'});

const mongooseModel = mongoose.model('users', userSchema);
const usersModel = model(mongooseModel, usersValidator);

export default usersModel;
