import { prisma } from '@database/prismaClient';

interface CreateProductParams {
  name: string;
  price: number;
  cost?: number;
  description?: string;
}

interface UpdateProductParams extends Omit<CreateProductParams, 'name'> {
  id: string;
}

export class ProductsService {
  async listProducts() {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    });

    return products;
  }

  async listProductById(id: string) {
    console.log(id);
    const product = await prisma.product.findUnique({ where: { id } });

    return product!;
  }

  async createProduct({ name, description, price, cost }: CreateProductParams) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        cost,
      },
    });

    return newProduct;
  }

  async deleteProduct(id: string) {
    const ProductExist = await prisma.product.findUnique({
      where: { id },
    });

    if (!ProductExist) {
      throw new Error('Produto não cadastrado');
    }

    await prisma.product.delete({ where: { id } });
  }

  async updateProduct({ id, price, cost, description }: UpdateProductParams) {
    const ProductExist = await prisma.product.findUnique({
      where: { id },
    });

    if (!ProductExist) {
      throw new Error('Producte não cadastrado');
    }

    await prisma.product.update({
      where: { id },
      data: {
        price,
        cost,
        description,
      },
    });
  }
}
