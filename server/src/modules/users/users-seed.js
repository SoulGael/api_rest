import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {faker} from '@faker-js/faker';

import {MongooseParentModel} from './users.model.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

console.log('📥 Insertando usuarios...');
const users = [];

for (let limit = 0; limit < 100; limit += 1) {
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase()
  });
}

await MongooseParentModel.insertMany(users);
console.log('✅ Usuarios insertados con éxito');

await mongoose.disconnect();
