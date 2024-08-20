import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workplace } from './Workplace';
import { Person } from './Person';
import { DoctorPlan } from './DoctorPlan';
import { DoctorSpecialty } from './DoctorSpecialty';
import { Appointment } from './Appointment';

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public personCpf: string;

  @OneToOne(() => Person, {})
  @JoinColumn()
  public person: Person;

  @Column({ nullable: false, unique: true })
  public crm: string;

  @ManyToOne(() => Workplace, (workplace) => workplace.doctors)
  public workplace: Workplace;

  @OneToMany(() => DoctorPlan, (plans) => plans.doctor)
  public supportedPlans: DoctorPlan[];

  @OneToMany(() => DoctorSpecialty, (doctorSpecialty) => doctorSpecialty.doctor)
  public specialties: DoctorSpecialty[];

  @Column({ type: 'boolean', default: true })
  public pendingApproval: boolean;

  @Column({ type: 'boolean', default: true })
  public acceptingAppointment: boolean;

  @Column({ type: 'boolean', default: true })
  public canAcceptAppointment: boolean;

  @Column({ type: 'boolean', default: false })
  public hide: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  public appointments: Appointment[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
