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
import { PersonPlan } from './PersonPlan';

@Entity()
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @OneToMany(() => PersonPlan, (personPlan) => personPlan.plan)
  public planUsers: PersonPlan[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
