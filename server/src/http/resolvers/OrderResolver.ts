import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
  Args,
  Int,
  ObjectType,
  Field,
} from 'type-graphql';

import { OrdersService } from '@services/ordersService';
import { ClientsService } from '@services/clientsService';
import { BudgetProductsService } from '@services/budgetProductsService';

import { Order } from '@models/Order';
import { Client } from '@models/Client';
import { ProductBudget } from '@models/ProductBudget';

import { PaginationArgs } from '../args/pagination-args';

@ObjectType()
class DayCreatedValue {
  @Field(_type => Date)
  created_at: Date;
}

@ObjectType()
class DayFinishedValue {
  @Field(_type => Date)
  finished_at: Date;
}

@ObjectType()
class ListOrdersValue {
  @Field(_type => Int)
  totalOrders: number;

  @Field(_type => [Order])
  orders: Order[];
}

@Resolver(() => Order)
export class OrderResolver {
  private ordersService = new OrdersService();
  private clientsService = new ClientsService();
  private budgetProductsService = new BudgetProductsService();

  @Query(() => Order)
  @Authorized()
  async getOrder(@Arg('id') id: string) {
    const order = await this.ordersService.getOrderById(id);

    return order;
  }

  @Query(() => ListOrdersValue)
  @Authorized()
  async listOrders(@Args() { skip, take }: PaginationArgs) {
    const orders = await this.ordersService.listOrders({ skip, take });

    return orders;
  }

  @FieldResolver(() => Client)
  client(@Root() order: Order) {
    return this.clientsService.listClientById(order.clientId);
  }

  @FieldResolver(() => [ProductBudget])
  async products(@Root() order: Order) {
    return this.budgetProductsService.getBudgetProducts({ id: order.id });
  }

  @Mutation(() => String)
  @Authorized()
  async createOrder(@Arg('budgetId') budgetId: string) {
    await this.ordersService.createOrder({ budgetId });

    return 'Pedido criado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async deleteOrder(@Arg('id') id: string) {
    await this.ordersService.deleteOrder(id);

    return 'Pedido deletado com sucesso';
  }

  @Mutation(() => String)
  async signOrder(@Arg('id') id: string) {
    await this.ordersService.signOrder(id);

    return 'Pedido assinado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async finishOrder(@Arg('id') id: string) {
    await this.ordersService.finishOrder(id);

    return 'Pedido concluído com sucesso';
  }

  @Query(() => [[DayCreatedValue]])
  @Authorized()
  async listLastOrdersCreated() {
    const days = await this.ordersService.listOrdersCreatedInWeek();

    return days;
  }

  @Query(() => [[DayFinishedValue]])
  @Authorized()
  async listLastOrdersFinished() {
    const days = await this.ordersService.listOrdersFinishedInWeek();

    return days;
  }

  @Query(() => Number)
  @Authorized()
  async getMonthlyProfit() {
    const profit = await this.ordersService.getMonthlyProfit();

    return profit;
  }
}
