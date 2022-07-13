import { prisma } from '@database/prismaClient';
import { Pagination } from './pagination';

import { BudgetProductsService } from './budgetProductsService';

type Product = {
  productId: string;
  base: number;
  height: number;
  price: number;
};

interface CreateBudgetParams {
  color?: string;
  deadline?: Date;
  discount?: number;
  clientId: string;
  products: Product[];
}

interface UpdateBudgetInfoParams {
  id: string;
  color?: string;
  deadline?: Date;
  discount?: number;
}

interface ProductBudget {
  base: number;
  height: number;
  price: number;
  productId: string;
}

interface UpdateBudgetProductsParams {
  id: string;
  budgetProducts: ProductBudget[];
}

export class BudgetsService {
  private budgetProductsService = new BudgetProductsService();

  async listSingleBudget(budgetId: string) {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
    });

    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    return budget;
  }

  async listBudgets({ skip, take }: Pagination) {
    const budgets = await prisma.budget.findMany({
      orderBy: { created_at: 'desc' },
      skip,
      take,
    });

    const totalBudgets = await prisma.budget.count();

    return { budgets, totalBudgets };
  }

  async createBudget({
    color,
    deadline,
    discount,
    clientId,
    products,
  }: CreateBudgetParams) {
    const productsPrices = products.map(productBudget => productBudget.price);

    const price = productsPrices.reduce((accum, curr) => accum + curr);

    const newBudget = await prisma.budget.create({
      data: {
        color,
        price,
        deadline,
        discount,
        clientId,
        products: { createMany: { data: products } },
      },
    });

    return newBudget;
  }

  async deleteBudget(id: string) {
    const budgetExist = await prisma.budget.findUnique({
      where: { id },
    });

    if (!budgetExist) {
      throw new Error('Orçamento não cadastrado');
    }

    
    await this.budgetProductsService.deleteBudgetProducts({ id });

    await prisma.budget.delete({where: { id }});
  }

  async updateBudgetInfo({
    id,
    color,
    deadline,
    discount,
  }: UpdateBudgetInfoParams) {
    const BudgetExist = await prisma.budget.findUnique({
      where: { id },
    });

    if (!BudgetExist) {
      throw new Error('Orçamento não cadastrado');
    }

    await prisma.budget.update({
      where: { id },
      data: {
        color,
        deadline,
        discount,
      },
    });
  }

  async updateBudgetProducts({
    id,
    budgetProducts,
  }: UpdateBudgetProductsParams) {
    const BudgetExist = await prisma.budget.findUnique({
      where: { id },
    });

    if (!BudgetExist) {
      throw new Error('Orçamento não cadastrado');
    }

    await prisma.productBudget.deleteMany({ where: { budgetId: id } });

    await prisma.budget.update({
      where: { id },
      data: {
        products: { createMany: { data: budgetProducts } },
      },
    });
  }
}
