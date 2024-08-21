import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Doctor } from '../models/Doctor';
import { Person } from '../models/Person';
import { PersonPlan } from '../models/PersonPlan';
import { Plan } from '../models/Plan';
import { DoctorPlan } from '../models/DoctorPlan';
import { Specialty } from '../models/Specialty';
import { DoctorSpecialty } from '../models/DoctorSpecialty';
import { Workplace } from '../models/Workplace';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding Plan...');

    const plans = await Plan.save([
      { name: 'Unimed', id: 1 },
      { name: 'Sulmed', id: 2 },
      { name: 'Porto Seguro Saúde', id: 3 },
    ]);

    console.log('seeding Specialty...');

    const specialties = await Specialty.save([
      { name: 'Pediatra', id: 1 },
      { name: 'Oftalmologista', id: 2 },
      { name: 'Otorrinolaringologista', id: 3 },
    ]);

    const personFactory = factoryManager.get(Person);
    const doctorFactory = factoryManager.get(Doctor);

    console.log('seeding Persons...');
    const pacients = await personFactory.saveMany(10);

    const rootPerson = faker.helpers.arrayElement(pacients);
    pacients.map(async (person) => {
      const hasRootPerson = faker.number.int({ min: 0, max: 100 });
      if (hasRootPerson > 70 && person.cpf !== rootPerson.cpf) {
        person.rootPerson = rootPerson;
      }
      person.plans = faker.helpers
        .arrayElements(plans, { min: 0, max: 2 })
        .map((plan) => {
          const personPlan = new PersonPlan();
          personPlan.plan = plan;
          personPlan.person = person;
          return personPlan;
        });
      await PersonPlan.save(person.plans);
    });

    //TODO Fix, not seeding anything doctor-related
    const doctors = await Promise.all(
      [].fill('', 0, 10).map(async () => {
        const doctorPerson = await personFactory.save();
        const doctor = await doctorFactory.save({
          person: doctorPerson,
        });
        doctor.supportedPlans = faker.helpers
          .arrayElements(plans, { min: 0, max: 2 })
          .map((plan) => {
            const doctorPlan = new DoctorPlan();
            doctorPlan.plan = plan;
            doctorPlan.doctor = doctor;
            return doctorPlan;
          });
        doctor.specialties = faker.helpers
          .arrayElements(specialties, { min: 0, max: 2 })
          .map((specialty) => {
            const doctorSpecialty = new DoctorSpecialty();
            doctorSpecialty.doctor = doctor;
            doctorSpecialty.specialty = specialty;
            doctorSpecialty.price = faker.number.float({
              min: 20,
              max: 150,
              fractionDigits: 2,
            });
            return doctorSpecialty;
          });
        doctor.workplace = Workplace.create({
          name: faker.location.streetAddress(true),
          suggester: doctor,
        });

        await DoctorPlan.save(doctor.supportedPlans);
        await Workplace.save(doctor.workplace);
        await DoctorSpecialty.save(doctor.specialties);
        return doctor;
      }),
    );

    await Person.save(pacients);
    await Doctor.save(doctors);
  }
}
