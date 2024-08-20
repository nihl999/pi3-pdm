import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Specialty } from './Specialty';

@Entity()
@Index('specialty_doctor_uq', ['plan', 'doctor'], { unique: true })
export class DoctorSpecialty extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors)
  public specialty: Specialty;

  @ManyToOne(() => Doctor, (doctor) => doctor.specialties)
  @JoinColumn({ name: 'doctor_cpf' })
  public doctor: Doctor;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: false })
  public price: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
