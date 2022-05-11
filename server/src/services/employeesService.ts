import { hash } from 'bcrypt';

import { prisma } from '@database/prismaClient';

interface CreateEmployeeParams {
  email: string;
  name: string;
  password: string;
}

export class EmployeesService {
  async listEmployees() {
    const employees = await prisma.employee.findMany();

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
}
