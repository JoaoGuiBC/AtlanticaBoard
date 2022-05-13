import { prisma } from '@database/prismaClient';

export class AddressService {
  async listClientAddresses(clientId: string) {
    const Address = await prisma.address.findMany({ where: { clientId } });

    return Address;
  }
}
