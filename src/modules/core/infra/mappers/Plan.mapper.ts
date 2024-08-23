import { Injectable } from '@nestjs/common';
import { Plan } from '../models/Plan';

export interface PlanDTO {}

//FIXME:
@Injectable()
export class PlanMapper {
  constructor() {}
  public toDTO(planModel: Plan): PlanDTO {
    return {
      id: planModel.id,
    } as PlanDTO;
  }
}
