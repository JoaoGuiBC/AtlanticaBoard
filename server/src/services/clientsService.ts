import { prisma } from '@database/prismaClient';

interface CreateClientParams {
  name: string;
  email: string;
  contact?: string;
  phoneNumber?: string;
  document: string;
  stateRegistration?: string;
  street: string;
  number?: number;
  state?: string;
  city?: string;
  district?: string;
  cep?: string;
}

export class ClientsService {
  async listClients() {
    const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });

    return clients;
  }

  async createClient({
    email,
    name,
    document,
    street,
    cep,
    city,
    contact,
    district,
    number,
    phoneNumber,
    state,
    stateRegistration,
  }: CreateClientParams) {
    const emailUsed = await prisma.client.findUnique({
      where: { email },
    });

    if (emailUsed) {
      throw new Error('Email já cadastrado');
    }

    const newClient = await prisma.client.create({
      data: {
        document,
        email,
        name,
        contact,
        phoneNumber,
        stateRegistration,
        address: { create: { street, cep, city, district, number, state } },
      },
    });

    return newClient;
  }

  async deleteClient(id: string) {
    const ClientExist = await prisma.client.findUnique({
      where: { id },
    });

    if (!ClientExist) {
      throw new Error('Cliente não cadastrado');
    }

    await prisma.client.delete({ where: { id } });
  }
}
