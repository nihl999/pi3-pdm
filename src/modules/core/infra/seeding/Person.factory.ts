import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Person } from '../models/Person';

export const PersonFactory = setSeederFactory(Person, create);

function create(faker: Faker): Person {
  const person = new Person();

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
