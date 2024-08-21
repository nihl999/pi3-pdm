import { DatabaseConfiguration } from 'src/ormconfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { PersonFactory } from './Person.factory';
import { DoctorFactory } from './Doctor.factory';
import { MainSeeder } from './MainSeeder';

const SeedOptions: DataSourceOptions & SeederOptions = {
  ...DatabaseConfiguration,
  factories: [PersonFactory, DoctorFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(SeedOptions);
dataSource.initialize().then(async () => {
  console.log('Running seeds');
  await runSeeders(dataSource);
  console.log('Seeds run');
  process.exit();
});
