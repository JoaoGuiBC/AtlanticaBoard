import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { EmployeesService } from '@services/employeesService';

import { CreateEmployeeInput } from '../inputs/create-employee-input';

import { Employee } from '../models/Employee';

@Resolver()
export class EmployeeResolver {
  private employeesService: EmployeesService = new EmployeesService();

  @Query(() => [Employee])
  async listEmployees() {
    const employees = await this.employeesService.listEmployees();

    return employees;
  }

  @Mutation(() => String)
  async createEmployee(@Arg('data') data: CreateEmployeeInput) {
    await this.employeesService.createEmployee(data);

    return 'Usuário criado com sucesso';
  }
}
