import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {faker} from '@faker-js/faker';

import {User} from './user.model';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

console.log('📥 Insertando usuarios...');
const users = [];

// eslint-disable-next-line id-length, no-plusplus
for (let i = 0; i < 100; i++) {
  users.push({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase()
  });
}

await User.insertMany(users);
console.log('✅ Usuarios insertados con éxito');

await mongoose.disconnect();
