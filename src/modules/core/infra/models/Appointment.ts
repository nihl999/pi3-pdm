import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './Doctor';
import { PersonModel } from './Person';
import { Specialty } from './Specialty';
import { Workplace } from './Workplace';

export enum AppointmentShowStatus {
  BeforeDate,
  PersonShowed,
  PersonNotShowed,
  Cancelled,
}
export enum AppointmentPayStatus {
  Unpaid,
  Paid,
}

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_cpf' })
  public doctor: Doctor;

  @ManyToOne(() => PersonModel, (person) => person.appointments)
  @JoinColumn({ name: 'person_cpf' })
  public person: PersonModel;

  //NOTE: Maybe add inverse relation for managment purposes?
  @ManyToOne(() => Specialty)
  @JoinColumn({ name: 'doctor_specialty' })
  public specialty: Specialty;

  @ManyToOne(() => Workplace, (workplace) => workplace.appointments)
  public place: Workplace;

  @Column({ type: 'timestamp' })
  public appointment_date: Date;

  @Column({
    type: 'enum',
    enum: AppointmentShowStatus,
    default: AppointmentShowStatus.BeforeDate,
  })
  public showStatus: AppointmentShowStatus;

  @Column({
    type: 'enum',
    enum: AppointmentPayStatus,
    default: AppointmentShowStatus.BeforeDate,
  })
  public payStatus: AppointmentPayStatus;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: false })
  public price: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
