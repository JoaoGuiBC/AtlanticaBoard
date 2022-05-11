import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { EmployeesService } from '@services/employeesService';

import { CreateEmployeeInput } from '../inputs/create-employee-input';

import { Employee } from '../models/Employee';

@Resolver()
export class EmployeeResolver {
  private employeesService = new EmployeesService();

  @Query(() => [Employee])
  @Authorized()
  async listEmployees() {
    const employees = await this.employeesService.listEmployees();

    return employees;
  }

  @Mutation(() => String)
  @Authorized()
  async createEmployee(@Arg('data') data: CreateEmployeeInput) {
    await this.employeesService.createEmployee(data);

    return 'Usuário criado com sucesso';
  }
}
