import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Product } from '@models/Product';
import { ProductsService } from '@services/productsService';
import { CreateProductInput } from '@inputs/create-product-input';
import { UpdateProductInput } from '@inputs/update-product-input';

@Resolver()
export class ProductResolver {
  private productsService = new ProductsService();

  @Query(() => [Product])
  @Authorized()
  async listProducts() {
    const products = await this.productsService.listProducts();

    return products;
  }

  @Mutation(() => String)
  @Authorized()
  async createProduct(@Arg('data') data: CreateProductInput) {
    await this.productsService.createProduct(data);

    return 'Produto criado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async deleteProduct(@Arg('id') id: string) {
    await this.productsService.deleteProduct(id);

    return 'Produto deletado com sucesso';
  }

  @Mutation(() => String)
  @Authorized()
  async updateProduct(@Arg('data') data: UpdateProductInput) {
    await this.productsService.updateProduct(data);

    return 'Informações atualizadas com sucesso';
  }
}
