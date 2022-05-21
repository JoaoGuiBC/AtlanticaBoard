import { prisma } from '@database/prismaClient';

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

// interface UpdateClientParams
//   extends Omit<CreateClientParams, 'name' | 'email' | 'document' | 'street'> {
//   id: string;
//   idAddress: string;
// }

export class BudgetsService {
  async listBudgets() {
    const budgets = await prisma.budget.findMany({
      orderBy: { created_at: 'desc' },
    });

    return budgets;
  }

  async listBudgetProductsById(budgetId: string) {
    const products = await prisma.productBudget.findMany({
      where: { budgetId },
      include: { product: {} },
    });

    return products;
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
    const BudgetExist = await prisma.budget.findUnique({
      where: { id },
    });

    if (!BudgetExist) {
      throw new Error('Orçamento não cadastrado');
    }

    await prisma.budget.delete({ where: { id } });
  }
}
