import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
}, {timestamps: true});

export const Parents = mongoose.model('Parent', parentSchema);
