import { prisma } from '@database/prismaClient';

interface BudgetProductsParams {
  id: string;
}

export class BudgetProductsService {
  async getBudgetProducts({ id }: BudgetProductsParams) {
    const productsByBudget = await prisma.productBudget.findMany({
      where: { budgetId: id },
      include: { product: {} },
    });

    if (productsByBudget.length > 0) {
      return productsByBudget;
    }

    const productsByOrder = await prisma.productBudget.findMany({
      where: { orderId: id },
      include: { product: {} },
    });

    return productsByOrder;
  }

  async deleteBudgetProducts({ id }: BudgetProductsParams) {
    const productsByBudget = await prisma.productBudget.findMany({
      where: { budgetId: id },
    });

    productsByBudget.forEach(async product => {
      if (product.orderId) return;

      await prisma.productBudget.delete({ where: { id: product.id } });
    });

    const productsByOrder = await prisma.productBudget.findMany({
      where: { orderId: id },
    });

    productsByOrder.forEach(async product => {
      if (product.budgetId) return;

      await prisma.productBudget.delete({ where: { id: product.id } });
    });
  }
}
