import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from 'type-graphql';

import { BudgetsService } from '@services/budgetsService';
import { ClientsService } from '@services/clientsService';
import { ProductsService } from '@services/productsService';

import { ProductBudget } from '@models/ProductBudget';
import { Budget } from '@models/Budget';

import { CreateBudgetInput } from '@inputs/create-budget-input';
import { Client } from '@models/Client';

@Resolver(() => Budget)
export class BudgetResolver {
  private budgetsService = new BudgetsService();
  private clientsService = new ClientsService();
  private productsService = new ProductsService();

  @Query(() => [Budget])
  @Authorized()
  async listBudgets() {
    const budgets = await this.budgetsService.listBudgets();

    return budgets;
  }

  @FieldResolver(() => Client)
  client(@Root() budget: Budget) {
    return this.clientsService.listClientById(budget.clientId);
  }

  @FieldResolver(() => [ProductBudget])
  async products(@Root() budget: Budget) {
    return this.budgetsService.listBudgetProductsById(budget.id);
  }

  @Mutation(() => String)
  @Authorized()
  async createBudget(@Arg('data') data: CreateBudgetInput) {
    await this.budgetsService.createBudget(data);

    return 'Orçamento criado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async deleteBudget(@Arg('id') id: string) {
    await this.budgetsService.deleteBudget(id);

    return 'Orçamento deletado com sucesso';
  }
}
