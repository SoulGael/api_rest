import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { MongooseParentModel } from './parents.model.js';
// export { mongooseModel as MongooseParentModel }; => agregar al final antes del export default 

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

console.log('📥 Insertando padres...');

const parents = [];

for (let i = 0; i < 100; i++) {
  parents.push({
    complete_name: faker.person.fullName(),
    job: faker.person.jobTitle(),
    phone_number: faker.phone.number()
  });
}

await MongooseParentModel.insertMany(parents);
console.log('✅ Padres insertados con éxito');

await mongoose.disconnect();
