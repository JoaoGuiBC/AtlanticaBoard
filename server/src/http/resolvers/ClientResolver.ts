import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from 'type-graphql';

import { CreateClientInput } from '@inputs/create-client-input';
import { Client } from '@models/Client';
import { ClientsService } from '@services/clientsService';
import { AddressService } from '@services/addressService';

@Resolver(() => Client)
export class ClientResolver {
  private clientsService = new ClientsService();
  private addressesService = new AddressService();

  @Query(() => [Client])
  @Authorized()
  async listClients() {
    const clients = await this.clientsService.listClients();

    return clients;
  }

  @FieldResolver()
  address(@Root() client: Client) {
    return this.addressesService.listClientAddresses(client.id);
  }

  @Mutation(() => String)
  @Authorized()
  async createClient(@Arg('data') data: CreateClientInput) {
    await this.clientsService.createClient(data);

    return 'Cliente criado com sucesso';
  }
}
