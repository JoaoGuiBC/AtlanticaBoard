import {
  Arg,
  Args,
  Authorized,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

import { Product } from '@models/Product';
import { ProductsService } from '@services/productsService';
import { CreateProductInput } from '@inputs/create-product-input';
import { UpdateProductInput } from '@inputs/update-product-input';
import { PaginationArgs } from '../args/pagination-args';

@ObjectType()
class ListProductsValue {
  @Field(_type => Int)
  totalProducts: number;

  @Field(_type => [Product])
  products: Product[];
}

@Resolver()
export class ProductResolver {
  private productsService = new ProductsService();

  @Query(() => ListProductsValue)
  @Authorized()
  async listProducts(@Args() { skip, take }: PaginationArgs) {
    const products = await this.productsService.listProducts({ skip, take });

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
