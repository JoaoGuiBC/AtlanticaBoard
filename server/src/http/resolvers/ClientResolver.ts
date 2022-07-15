import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
  ObjectType,
  Field,
  Int,
  Args,
} from 'type-graphql';

import { CreateClientInput } from '@inputs/create-client-input';
import { UpdateClientInput } from '@inputs/update-client-input';
import { SetClientSignatureInput } from '@inputs/set-client-signature-input';

import { ClientsService } from '@services/clientsService';
import { AddressService } from '@services/addressService';

import { Client } from '@models/Client';

import { PaginationArgs } from '../args/pagination-args';

@ObjectType()
class ListClientsValue {
  @Field(_type => Int)
  totalClients: number;

  @Field(_type => [Client])
  clients: Client[];
}

@Resolver(() => Client)
export class ClientResolver {
  private clientsService = new ClientsService();
  private addressesService = new AddressService();

  @Query(() => String, { nullable: true })
  async getClientSignature(@Arg('id') id: string) {
    console.log(id);
    const signature = await this.clientsService.getClientSignature(id);

    return signature;
  }

  @Query(() => Client)
  @Authorized()
  async getClient(@Arg('id') id: string) {
    const client = await this.clientsService.listClientById(id);

    return client;
  }

  @Query(() => ListClientsValue)
  @Authorized()
  async listClients(@Args() { skip, take }: PaginationArgs) {
    const clients = await this.clientsService.listClients({ skip, take });

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

    return 'Cliente deletado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async updateClient(@Arg('data') data: UpdateClientInput) {
    await this.clientsService.updateClient(data);

    return 'Informações atualizadas com sucesso';
  }

  @Mutation(() => String)
  async setClientSignature(@Arg('data') data: SetClientSignatureInput) {
    await this.clientsService.setClientSignature(data);

    return 'Assinatura atualizada com sucesso';
  }
}
