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

import { BudgetsService } from '@services/budgetsService';
import { ClientsService } from '@services/clientsService';
import { BudgetProductsService } from '@services/budgetProductsService';

import { Budget } from '@models/Budget';
import { Client } from '@models/Client';
import { ProductBudget } from '@models/ProductBudget';

import { CreateBudgetInput } from '@inputs/create-budget-input';
import { UpdateBudgetInfoInput } from '@inputs/update-budget-info-input';
import { UpdateBudgetProductsInput } from '@inputs/update-budget-products-input';

import { PaginationArgs } from '../args/pagination-args';

@ObjectType()
class ListBudgetsValue {
  @Field(_type => Int)
  totalBudgets: number;

  @Field(_type => [Budget])
  budgets: Budget[];
}

@Resolver(() => Budget)
export class BudgetResolver {
  private budgetsService = new BudgetsService();
  private clientsService = new ClientsService();
  private budgetProductsService = new BudgetProductsService();

  @Query(() => Budget)
  @Authorized()
  async getBudget(@Arg('id') id: string) {
    const budget = await this.budgetsService.listSingleBudget(id);

    return budget;
  }

  @Query(() => ListBudgetsValue)
  @Authorized()
  async listBudgets(@Args() { skip, take }: PaginationArgs) {
    const budgets = await this.budgetsService.listBudgets({ skip, take });

    return budgets;
  }

  @FieldResolver(() => Client)
  client(@Root() budget: Budget) {
    return this.clientsService.listClientById(budget.clientId);
  }

  @FieldResolver(() => [ProductBudget])
  async products(@Root() budget: Budget) {
    return this.budgetProductsService.getBudgetProducts({
      id: budget.id,
    });
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
