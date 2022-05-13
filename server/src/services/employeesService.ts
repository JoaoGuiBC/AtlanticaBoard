import { hash } from 'bcrypt';

import { prisma } from '@database/prismaClient';

interface CreateEmployeeParams {
  email: string;
  name: string;
  password: string;
}

export class EmployeesService {
  async listEmployees() {
    const employees = await prisma.employee.findMany({
      orderBy: [{ isAdmin: 'desc' }, { name: 'asc' }],
    });

    return employees;
  }

  async createEmployee({ email, name, password }: CreateEmployeeParams) {
    const employeeExist = await prisma.employee.findUnique({
      where: { email },
    });

    if (employeeExist) {
      throw new Error('Email já cadastrado');
    }

    const hashPassword = await hash(password, 10);

    const newEmployee = await prisma.employee.create({
      data: { email, name, password: hashPassword, isAdmin: false },
    });

    return newEmployee;
  }

  async deleteEmployee(id: string) {
    const employeeExist = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employeeExist) {
      throw new Error('Funcionário não cadastrado');
    }

    await prisma.employee.delete({ where: { id } });
  }
}
