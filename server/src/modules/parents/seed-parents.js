import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {faker} from '@faker-js/faker';

import {Parent} from './parent.model.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

console.log('📥 Insertando padres...');

const parents = [];

// eslint-disable-next-line id-length, no-plusplus
for (let i = 0; i < 100; i++) {
  parents.push({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase()
  });
}

await Parent.insertMany(parents);
console.log('✅ Padres insertados con éxito');

await mongoose.disconnect();
