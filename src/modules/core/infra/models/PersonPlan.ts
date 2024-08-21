import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from './Person';
import { Plan } from './Plan';

@Entity()
@Index('plan_person_uq', ['plan', 'person'], { unique: true })
export class PersonPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  // @Column({ type: 'integer', nullable: false })
  // public planId: number;

  // @Column({ type: 'varchar', nullable: false })
  // public personCpf: string;

  @ManyToOne(() => Plan, (plan) => plan.planUsers)
  public plan: Plan;

  @ManyToOne(() => Person, (person) => person.plans)
  public person: Person;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
