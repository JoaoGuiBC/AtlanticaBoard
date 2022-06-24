import { prisma } from '@database/prismaClient';
import { Pagination } from './pagination';

import { BudgetProductsService } from './budgetProductsService';

interface CreateOrderParams {
  budgetId: string;
}

export class OrdersService {
  private budgetProductsService = new BudgetProductsService();

  async getOrderById(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }

  async listOrders({ skip, take }: Pagination) {
    const orders = await prisma.order.findMany({
      orderBy: [
        { deadline: 'asc' },
        { finished_at: 'desc' },
        { created_at: 'asc' },
      ],
      skip,
      take,
    });

    const totalOrders = await prisma.order.count();

    return { orders, totalOrders };
  }

  async createOrder({ budgetId }: CreateOrderParams) {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: { products: true },
    });

    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    const checkOrderAlreadyExist = await prisma.order.findUnique({
      where: { budgetSerialNumber: budget.serialNumber },
    });

    if (checkOrderAlreadyExist) {
      throw new Error('Já existe um pedido criado com esse orçamento');
    }

    const order = await prisma.order.create({
      data: {
        color: budget.color,
        price: budget.price,
        deadline: budget.deadline,
        clientId: budget.clientId,
        discount: budget.discount || 0,
        budgetSerialNumber: budget.serialNumber,
      },
    });

    budget.products.forEach(async product => {
      await prisma.productBudget.update({
        where: { id: product.id },
        data: {
          order: { connect: { id: order.id } },
        },
      });
    });

    return order;
  }

  async deleteOrder(id: string) {
    const orderExist = await prisma.order.findUnique({
      where: { id },
    });

    if (!orderExist) {
      throw new Error('Pedido não cadastrado');
    }

    await prisma.order.delete({ where: { id } });

    await this.budgetProductsService.deleteBudgetProducts({ id });
  }

  async signOrder(id: string) {
    const orderExist = await prisma.order.findUnique({
      where: { id },
    });

    if (!orderExist) {
      throw new Error('Pedido não cadastrado');
    }

    await prisma.order.update({ where: { id }, data: { signed: true } });
  }

  async finishOrder(id: string) {
    const orderExist = await prisma.order.findUnique({
      where: { id },
    });

    if (!orderExist) {
      throw new Error('Pedido não cadastrado');
    }

    await prisma.order.update({
      where: { id },
      data: { finished_at: new Date(), deadline: null },
    });
  }

  async listOrdersCreatedInWeek() {
    const today = new Date();

    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);

    const orders = await prisma.order.findMany({
      where: {
        created_at: {
          gte: pastWeek,
          lt: today,
        },
        finished_at: null,
      },
      select: { created_at: true },
    });

    const todayOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate(),
    );
    const OneDayBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 1,
    );
    const TwoDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 2,
    );
    const ThreeDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 3,
    );
    const ForDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 4,
    );
    const FiveDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 5,
    );
    const SixDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 6,
    );

    return [
      todayOrders,
      OneDayBeforeOrders,
      TwoDaysBeforeOrders,
      ThreeDaysBeforeOrders,
      ForDaysBeforeOrders,
      FiveDaysBeforeOrders,
      SixDaysBeforeOrders,
    ];
  }

  async listOrdersFinishedInWeek() {
    const today = new Date();

    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);

    const orders = await prisma.order.findMany({
      where: {
        created_at: {
          gte: pastWeek,
          lt: today,
        },
        finished_at: { not: null },
      },
      select: { created_at: true },
    });

    const todayOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate(),
    );
    const OneDayBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 1,
    );
    const TwoDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 2,
    );
    const ThreeDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 3,
    );
    const ForDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 4,
    );
    const FiveDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 5,
    );
    const SixDaysBeforeOrders = orders.filter(
      order => order.created_at.getDate() + 1 === today.getDate() - 6,
    );

    return [
      todayOrders,
      OneDayBeforeOrders,
      TwoDaysBeforeOrders,
      ThreeDaysBeforeOrders,
      ForDaysBeforeOrders,
      FiveDaysBeforeOrders,
      SixDaysBeforeOrders,
    ];
  }
}
