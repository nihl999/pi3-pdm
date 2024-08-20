import {
  BaseEntity,
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
import { Plan } from './Plan';

@Entity()
@Index('plan_doctor_uq', ['plan', 'doctor'], { unique: true })
export class DoctorPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @ManyToOne(() => Plan, (plan) => plan.planUsers)
  public plan: Plan;

  @ManyToOne(() => Doctor, (doctor) => doctor.supportedPlans)
  @JoinColumn({ name: 'doctor_cpf' })
  public doctor: Doctor;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
