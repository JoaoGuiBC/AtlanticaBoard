import { prisma } from '@database/prismaClient';
import { Pagination } from './pagination';

interface CreateClientParams {
  name: string;
  email: string;
  contact?: string;
  phoneNumber?: string;
  document?: string;
  stateRegistration?: string;
  street: string;
  number?: number;
  state?: string;
  city?: string;
  district?: string;
  cep?: string;
}

interface UpdateClientParams
  extends Omit<CreateClientParams, 'name' | 'email' | 'document'> {
  id: string;
  idAddress: string;
}

export class ClientsService {
  async listClients({ skip, take }: Pagination) {
    const clients = await prisma.client.findMany({
      orderBy: { name: 'asc' },
      skip,
      take,
    });

    const totalClients = await prisma.client.count();

    return { clients, totalClients };
  }

  async listClientById(id: string) {
    const client = await prisma.client.findUnique({ where: { id } });

    return client!;
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

    const documentUsed = await prisma.client.findUnique({
      where: { document },
    });

    if (documentUsed && documentUsed.document) {
      throw new Error('CPF/CNPJ já cadastrado');
    }

    const newClient = await prisma.client.create({
      data: {
        document: document === '' ? undefined : document,
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

  async updateClient({
    id,
    idAddress,
    street,
    cep,
    city,
    contact,
    district,
    number,
    phoneNumber,
    state,
    stateRegistration,
  }: UpdateClientParams) {
    if (id) {
      const ClientExist = await prisma.client.findUnique({
        where: { id },
      });

      if (!ClientExist) {
        throw new Error('Cliente não cadastrado');
      }

      await prisma.client.update({
        where: { id },
        data: {
          stateRegistration,
          phoneNumber,
          contact,
        },
      });
    }
    if (idAddress) {
      const AddressExist = await prisma.address.findUnique({
        where: { id: idAddress },
      });

      if (!AddressExist) {
        throw new Error('Endereço não cadastrado');
      }

      await prisma.address.update({
        where: { id: idAddress },
        data: {
          street,
          cep,
          city,
          district,
          number,
          state,
        },
      });
    }
  }
}
