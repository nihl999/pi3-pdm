import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './Doctor';
import { Appointment } from './Appointment';

@Entity()
export class Workplace extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ type: 'boolean', default: true })
  public pendingApproval: boolean;

  @OneToMany(() => Doctor, (doctor) => doctor.workplace)
  public doctors: Doctor[];

  @ManyToOne(() => Doctor)
  @JoinColumn()
  public suggester: Doctor;

  @OneToMany(() => Appointment, (appointment) => appointment.place)
  public appointments: Appointment[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
