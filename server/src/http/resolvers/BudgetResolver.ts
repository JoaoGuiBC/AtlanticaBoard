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

import { ProductBudget } from '@models/ProductBudget';
import { Budget } from '@models/Budget';

import { CreateBudgetInput } from '@inputs/create-budget-input';
import { Client } from '@models/Client';
import { UpdateBudgetInfoInput } from '@inputs/update-budget-info-input';
import { UpdateBudgetProductsInput } from '@inputs/update-budget-products-input';

@Resolver(() => Budget)
export class BudgetResolver {
  private budgetsService = new BudgetsService();
  private clientsService = new ClientsService();

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

  @Mutation(() => String)
  @Authorized()
  async updateBudgetInfo(@Arg('data') data: UpdateBudgetInfoInput) {
    await this.budgetsService.updateBudgetInfo(data);

    return 'Informações atualizadas com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async updateBudgetProducts(@Arg('data') data: UpdateBudgetProductsInput) {
    await this.budgetsService.updateBudgetProducts(data);

    return 'Informações atualizadas com sucesso';
  }
}
