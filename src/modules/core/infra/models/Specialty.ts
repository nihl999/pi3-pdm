import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorSpecialty } from './DoctorSpecialty';

@Entity()
export class Specialty extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ type: 'boolean', default: true })
  public pendingApproval: boolean;

  @OneToMany(
    () => DoctorSpecialty,
    (doctorSpecialty) => doctorSpecialty.specialty,
  )
  public doctors: DoctorSpecialty[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
