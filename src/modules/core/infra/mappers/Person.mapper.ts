import { Injectable } from '@nestjs/common';
import { Person } from '../models/Person';
import { PlanMapper } from './Plan.mapper';
import { AppointmentMapper } from './Appointment.mapper';

export interface PersonDTO {}

@Injectable()
export class PersonMapper {
  constructor(
    private readonly planMapper: PlanMapper,
    private readonly appointmentMapper: AppointmentMapper,
  ) {}
  public toDTO(personModel: Person): PersonDTO {
    return {
      cpf: personModel.cpf,
      name: personModel.name,
      birthDate: personModel.birthDate,
      gender: personModel.gender,
      rootPerson: personModel.rootPerson.cpf,
      dependents: personModel.dependents.map((person) => person.cpf),
      plans: personModel.plans.map((plan) => this.planMapper.toDTO(plan.plan)),
      appointments: personModel.appointments.map((appointment) =>
        this.appointmentMapper.toDTO(appointment),
      ),
      createdAt: personModel.createdAt,
      updatedAt: personModel.updatedAt,
      deletedAt: personModel.deletedAt,
    };
  }
}
