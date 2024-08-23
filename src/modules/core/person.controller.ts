import { Controller, Get, Query } from '@nestjs/common';
import { Person } from './infra/models/Person';
import { PersonMapper } from './infra/mappers/Person.mapper';

export interface FindAllQuery {
  page: number;
  qtd: number;
}

export const MAX_PAGINATION_QTD = 50;

export interface PaginatedQueryResponse<Datatype> {
  qtd: number;
  page: number;
  data: Datatype;
}

export type AsyncPaginatedQueryResponse<Datatype> = Promise<
  PaginatedQueryResponse<Datatype>
>;

interface PersonDTO {
  //Temp
}

@Controller('person')
export class PersonController {
  constructor(private readonly personMapper: PersonMapper) {}

  @Get('all')
  async getAll(
    @Query() query: FindAllQuery,
  ): AsyncPaginatedQueryResponse<PersonDTO[]> {
    const take =
      query.qtd > 0 && query.qtd < MAX_PAGINATION_QTD ? query.qtd : 15;
    const page = query.page >= 0 ? query.page : 0;
    const people = await Person.find({
      take: take,
      skip: take * page, //TODO: Test if skip is inclusive or exclusive : +1 or not
    });

    const peopleDTO = [];
    for (const person of people) {
      const personDTO = this.personMapper.toDTO(person);
      peopleDTO.push(personDTO);
    }

    return {} as any;
  }
}
