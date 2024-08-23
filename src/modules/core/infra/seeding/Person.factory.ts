import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { PersonModel } from '../models/Person';

export const PersonFactory = setSeederFactory(PersonModel, create);

function create(faker: Faker): PersonModel {
  const person = new PersonModel();

  const gender = faker.number.int({ min: 0, max: 2 });
  person.gender = gender;
  person.name = faker.person.fullName({
    sex: gender == 0 ? 'male' : 'female',
  });
  person.cpf = faker.string.numeric(11);
  person.birthDate = faker.date.birthdate({ min: 8, max: 80, mode: 'age' });

  person.rootPerson = undefined;

  return person;
}
