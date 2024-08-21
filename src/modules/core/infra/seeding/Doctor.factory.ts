import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Doctor } from '../models/Doctor';

export const DoctorFactory = setSeederFactory(Doctor, create);

function create(faker: Faker): Doctor {
  const doctor = new Doctor();

  doctor.crm = faker.string.numeric(6);
  doctor.acceptingAppointment = faker.helpers.maybe(() => true);

  return doctor;
}
