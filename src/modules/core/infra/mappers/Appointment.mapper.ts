import { Injectable } from '@nestjs/common';
import { Appointment } from '../models/Appointment';

export interface AppointmentDTO {}

//FIXME: AA
@Injectable()
export class AppointmentMapper {
  public toDTO(appointmentModel: Appointment): AppointmentDTO {
    return {
      createdAt: appointmentModel.createdAt,
      updatedAt: appointmentModel.updatedAt,
      deletedAt: appointmentModel.deletedAt,
    } as AppointmentDTO;
  }
}
