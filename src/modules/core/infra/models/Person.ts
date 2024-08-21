import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonPlan } from './PersonPlan';
import { Appointment } from './Appointment';

export enum PersonGender {
  Male,
  Female,
  NonBinary,
}

@Entity()
export class Person extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public cpf: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ type: 'timestamp' })
  public birthDate: Date;

  @Column({ type: 'enum', enum: PersonGender })
  public gender: PersonGender;

  //Note: This way, we can get all dependents from a person, and the root of a dependent from a dependent
  @ManyToOne(() => Person, (person) => person.dependents)
  public rootPerson: Person;

  @OneToMany(() => Person, (person) => person.rootPerson)
  public dependents: Person[];

  @OneToMany(() => PersonPlan, (personPlan) => personPlan.person)
  public plans: PersonPlan[];

  @OneToMany(() => Appointment, (appointment) => appointment.person)
  public appointments: Appointment[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
