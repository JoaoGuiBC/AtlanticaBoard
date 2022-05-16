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
import { UpdateClientInput } from '@inputs/update-client-input';
import { ClientsService } from '@services/clientsService';
import { AddressService } from '@services/addressService';
import { Client } from '@models/Client';

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

  @Mutation(() => String)
  @Authorized()
  async deleteClient(@Arg('id') id: string) {
    await this.clientsService.deleteClient(id);

    return 'Funcionário deletado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async updateClient(@Arg('data') data: UpdateClientInput) {
    await this.clientsService.updateClient(data);

    return 'Informações atualizadas com sucesso';
  }
}
