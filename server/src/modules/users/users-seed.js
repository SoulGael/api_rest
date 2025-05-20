import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import {faker} from '@faker-js/faker';

import {MongooseParentModel} from './users.model.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

const hashPassword = crypto.createHash('sha256').update('123456').digest('hex');

console.log('📥 Insertando usuarios...');
const users = [];

for (let limit = 0; limit < 100; limit += 1) {
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: hashPassword
  });
}

await MongooseParentModel.insertMany(users);
console.log('✅ Usuarios insertados con éxito');

await mongoose.disconnect();
