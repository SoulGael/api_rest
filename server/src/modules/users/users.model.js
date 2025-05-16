import mongoose from 'mongoose';
import model from '../core/model.js';

const userSchema = new mongoose.Schema({
  name: {type: String, isSearchable: true},
  email: {type: String}
}, {collection: 'users'});

const mongooseModel = mongoose.model('users', userSchema);
const usersModel = model(mongooseModel);

export default usersModel;
