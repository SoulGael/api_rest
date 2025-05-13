import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
}, {timestamps: true});

export const Parent = mongoose.model('Parent', parentSchema);
