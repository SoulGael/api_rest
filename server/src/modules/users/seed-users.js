import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {faker} from '@faker-js/faker';

import {User} from './user.model';

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

await User.insertMany(users);
console.log('✅ Usuarios insertados con éxito');

await mongoose.disconnect();
