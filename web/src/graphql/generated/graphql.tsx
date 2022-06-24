import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

/** The address model */
export type Address = {
  __typename?: 'Address';
  cep?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  number?: Maybe<Scalars['Float']>;
  state?: Maybe<Scalars['String']>;
  street: Scalars['String'];
};

/** The budget model */
export type Budget = {
  __typename?: 'Budget';
  client: Client;
  color?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  deadline?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  products: Array<ProductBudget>;
  serialNumber: Scalars['Float'];
};

/** The client model */
export type Client = {
  __typename?: 'Client';
  address: Array<Address>;
  contact?: Maybe<Scalars['String']>;
  document?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  stateRegistration?: Maybe<Scalars['String']>;
};

export type CreateBudgetInput = {
  clientId: Scalars['String'];
  color?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  discount?: InputMaybe<Scalars['Float']>;
  products: Array<ProductInput>;
};

export type CreateClientInput = {
  cep?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  number?: InputMaybe<Scalars['Float']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  stateRegistration?: InputMaybe<Scalars['String']>;
  street: Scalars['String'];
};

export type CreateEmployeeInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateProductInput = {
  cost?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

/** The employee model */
export type Employee = {
  __typename?: 'Employee';
  email: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type ListBudgetsValue = {
  __typename?: 'ListBudgetsValue';
  budgets: Array<Budget>;
  totalBudgets: Scalars['Int'];
};

export type ListClientsValue = {
  __typename?: 'ListClientsValue';
  clients: Array<Client>;
  totalClients: Scalars['Int'];
};

export type ListOrdersValue = {
  __typename?: 'ListOrdersValue';
  orders: Array<Order>;
  totalOrders: Scalars['Int'];
};

export type ListProductsValue = {
  __typename?: 'ListProductsValue';
  products: Array<Product>;
  totalProducts: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBudget: Scalars['String'];
  createClient: Scalars['String'];
  createEmployee: Scalars['String'];
  createOrder: Scalars['String'];
  createProduct: Scalars['String'];
  deleteBudget: Scalars['String'];
  deleteClient: Scalars['String'];
  deleteEmployee: Scalars['String'];
  deleteOrder: Scalars['String'];
  deleteProduct: Scalars['String'];
  finishOrder: Scalars['String'];
  signOrder: Scalars['String'];
  updateBudgetInfo: Scalars['String'];
  updateBudgetProducts: Scalars['String'];
  updateClient: Scalars['String'];
  updateProduct: Scalars['String'];
};


export type MutationCreateBudgetArgs = {
  data: CreateBudgetInput;
};


export type MutationCreateClientArgs = {
  data: CreateClientInput;
};


export type MutationCreateEmployeeArgs = {
  data: CreateEmployeeInput;
};


export type MutationCreateOrderArgs = {
  budgetId: Scalars['String'];
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationDeleteBudgetArgs = {
  id: Scalars['String'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationFinishOrderArgs = {
  id: Scalars['String'];
};


export type MutationSignOrderArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBudgetInfoArgs = {
  data: UpdateBudgetInfoInput;
};


export type MutationUpdateBudgetProductsArgs = {
  data: UpdateBudgetProductsInput;
};


export type MutationUpdateClientArgs = {
  data: UpdateClientInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};

/** The order model */
export type Order = {
  __typename?: 'Order';
  budgetSerialNumber: Scalars['Float'];
  client: Client;
  color?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  deadline?: Maybe<Scalars['DateTime']>;
  discount: Scalars['Float'];
  finished_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  products: Array<ProductBudget>;
  serialNumber: Scalars['Float'];
  signed: Scalars['Boolean'];
};

/** The product model */
export type Product = {
  __typename?: 'Product';
  cost?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  productBudget: Array<ProductBudget>;
};

/** The product budget model */
export type ProductBudget = {
  __typename?: 'ProductBudget';
  base: Scalars['Float'];
  budget: Budget;
  height: Scalars['Float'];
  id: Scalars['ID'];
  price: Scalars['Float'];
  product: Product;
};

export type ProductBudgetList = {
  base: Scalars['Float'];
  height: Scalars['Float'];
  price: Scalars['Float'];
  productId: Scalars['String'];
};

export type ProductInput = {
  base: Scalars['Float'];
  height: Scalars['Float'];
  price: Scalars['Float'];
  productId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getBudget: Budget;
  getClient: Client;
  getOrder: Order;
  getProduct: Product;
  listBudgets: ListBudgetsValue;
  listClients: ListClientsValue;
  listEmployees: Array<Employee>;
  listOrders: ListOrdersValue;
  listProducts: ListProductsValue;
  revalidateJWT: Scalars['String'];
  signIn: SignInResponse;
};


export type QueryGetBudgetArgs = {
  id: Scalars['String'];
};


export type QueryGetClientArgs = {
  id: Scalars['String'];
};


export type QueryGetOrderArgs = {
  id: Scalars['String'];
};


export type QueryGetProductArgs = {
  id: Scalars['String'];
};


export type QueryListBudgetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListClientsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListOrdersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListProductsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRevalidateJwtArgs = {
  userId: Scalars['String'];
};


export type QuerySignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The logged user model */
export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String'];
  user: Employee;
};

export type UpdateBudgetInfoInput = {
  color?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  discount?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
};

export type UpdateBudgetProductsInput = {
  budgetProducts: Array<ProductBudgetList>;
  id: Scalars['String'];
};

export type UpdateClientInput = {
  cep?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  contact?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  idAddress: Scalars['String'];
  number?: InputMaybe<Scalars['Float']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  stateRegistration?: InputMaybe<Scalars['String']>;
  street: Scalars['String'];
};

export type UpdateProductInput = {
  cost?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  price: Scalars['Float'];
};

export type CreateBudgetMutationVariables = Exact<{
  data: CreateBudgetInput;
}>;


export type CreateBudgetMutation = { __typename?: 'Mutation', createBudget: string };

export type DeleteBudgetMutationVariables = Exact<{
  deleteBudgetId: Scalars['String'];
}>;


export type DeleteBudgetMutation = { __typename?: 'Mutation', deleteBudget: string };

export type GetBudgetQueryVariables = Exact<{
  getBudgetId: Scalars['String'];
}>;


export type GetBudgetQuery = { __typename?: 'Query', getBudget: { __typename?: 'Budget', id: string, serialNumber: number, price: number, color?: string | null, deadline?: any | null, discount?: number | null, created_at: any, products: Array<{ __typename?: 'ProductBudget', id: string, base: number, height: number, price: number, product: { __typename?: 'Product', id: string, name: string } }>, client: { __typename?: 'Client', name: string, email: string, contact?: string | null, phoneNumber?: string | null } } };

export type ListBudgetsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type ListBudgetsQuery = { __typename?: 'Query', listBudgets: { __typename?: 'ListBudgetsValue', totalBudgets: number, budgets: Array<{ __typename?: 'Budget', id: string, serialNumber: number, price: number, color?: string | null, deadline?: any | null, discount?: number | null, created_at: any, products: Array<{ __typename?: 'ProductBudget', id: string, base: number, height: number, price: number, product: { __typename?: 'Product', id: string, name: string } }>, client: { __typename?: 'Client', name: string, email: string, contact?: string | null, phoneNumber?: string | null } }> } };

export type UpdateBudgetInfoMutationVariables = Exact<{
  data: UpdateBudgetInfoInput;
}>;


export type UpdateBudgetInfoMutation = { __typename?: 'Mutation', updateBudgetInfo: string };

export type UpdateBudgetProductsMutationVariables = Exact<{
  data: UpdateBudgetProductsInput;
}>;


export type UpdateBudgetProductsMutation = { __typename?: 'Mutation', updateBudgetProducts: string };

export type CreateClientMutationVariables = Exact<{
  data: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: string };

export type DeleteClientMutationVariables = Exact<{
  deleteClientId: Scalars['String'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: string };

export type ListClientsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type ListClientsQuery = { __typename?: 'Query', listClients: { __typename?: 'ListClientsValue', totalClients: number, clients: Array<{ __typename?: 'Client', id: string, name: string, contact?: string | null, email: string, phoneNumber?: string | null, document?: string | null, stateRegistration?: string | null, address: Array<{ __typename?: 'Address', id: string, street: string, number?: number | null, state?: string | null, city?: string | null, district?: string | null, cep?: string | null }> }> } };

export type UpdateClientMutationVariables = Exact<{
  data: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: string };

export type CreateEmployeeMutationVariables = Exact<{
  data: CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: string };

export type DeleteEmployeeMutationVariables = Exact<{
  deleteEmployeeId: Scalars['String'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee: string };

export type ListEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListEmployeesQuery = { __typename?: 'Query', listEmployees: Array<{ __typename?: 'Employee', email: string, id: string, isAdmin: boolean, name: string }> };

export type RevalidateJwtQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type RevalidateJwtQuery = { __typename?: 'Query', revalidateJWT: string };

export type SignInQueryVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'Employee', name: string, email: string, isAdmin: boolean, id: string } } };

export type CreateOrderMutationVariables = Exact<{
  budgetId: Scalars['String'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: string };

export type DeleteOrderMutationVariables = Exact<{
  deleteOrderId: Scalars['String'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder: string };

export type FinishOrderMutationVariables = Exact<{
  finishOrderId: Scalars['String'];
}>;


export type FinishOrderMutation = { __typename?: 'Mutation', finishOrder: string };

export type GetOrderQueryVariables = Exact<{
  getOrderId: Scalars['String'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'Order', id: string, serialNumber: number, budgetSerialNumber: number, price: number, color?: string | null, deadline?: any | null, discount: number, signed: boolean, finished_at?: any | null, client: { __typename?: 'Client', id: string, name: string, email: string, contact?: string | null, phoneNumber?: string | null }, products: Array<{ __typename?: 'ProductBudget', id: string, base: number, height: number, product: { __typename?: 'Product', name: string } }> } };

export type ListOrdersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type ListOrdersQuery = { __typename?: 'Query', listOrders: { __typename?: 'ListOrdersValue', totalOrders: number, orders: Array<{ __typename?: 'Order', id: string, serialNumber: number, budgetSerialNumber: number, price: number, color?: string | null, discount: number, deadline?: any | null, signed: boolean, finished_at?: any | null, client: { __typename?: 'Client', id: string, name: string }, products: Array<{ __typename?: 'ProductBudget', product: { __typename?: 'Product', name: string } }> }> } };

export type SignOrderMutationVariables = Exact<{
  signOrderId: Scalars['String'];
}>;


export type SignOrderMutation = { __typename?: 'Mutation', signOrder: string };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: string };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: string };

export type ListProductsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type ListProductsQuery = { __typename?: 'Query', listProducts: { __typename?: 'ListProductsValue', totalProducts: number, products: Array<{ __typename?: 'Product', id: string, name: string, price: number, cost?: number | null, description?: string | null }> } };

export type UpdateProductMutationVariables = Exact<{
  data: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: string };


export const CreateBudgetDocument = gql`
    mutation CreateBudget($data: CreateBudgetInput!) {
  createBudget(data: $data)
}
    `;
export type CreateBudgetMutationFn = Apollo.MutationFunction<CreateBudgetMutation, CreateBudgetMutationVariables>;

/**
 * __useCreateBudgetMutation__
 *
 * To run a mutation, you first call `useCreateBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBudgetMutation, { data, loading, error }] = useCreateBudgetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBudgetMutation(baseOptions?: Apollo.MutationHookOptions<CreateBudgetMutation, CreateBudgetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument, options);
      }
export type CreateBudgetMutationHookResult = ReturnType<typeof useCreateBudgetMutation>;
export type CreateBudgetMutationResult = Apollo.MutationResult<CreateBudgetMutation>;
export type CreateBudgetMutationOptions = Apollo.BaseMutationOptions<CreateBudgetMutation, CreateBudgetMutationVariables>;
export const DeleteBudgetDocument = gql`
    mutation DeleteBudget($deleteBudgetId: String!) {
  deleteBudget(id: $deleteBudgetId)
}
    `;
export type DeleteBudgetMutationFn = Apollo.MutationFunction<DeleteBudgetMutation, DeleteBudgetMutationVariables>;

/**
 * __useDeleteBudgetMutation__
 *
 * To run a mutation, you first call `useDeleteBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBudgetMutation, { data, loading, error }] = useDeleteBudgetMutation({
 *   variables: {
 *      deleteBudgetId: // value for 'deleteBudgetId'
 *   },
 * });
 */
export function useDeleteBudgetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBudgetMutation, DeleteBudgetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DeleteBudgetDocument, options);
      }
export type DeleteBudgetMutationHookResult = ReturnType<typeof useDeleteBudgetMutation>;
export type DeleteBudgetMutationResult = Apollo.MutationResult<DeleteBudgetMutation>;
export type DeleteBudgetMutationOptions = Apollo.BaseMutationOptions<DeleteBudgetMutation, DeleteBudgetMutationVariables>;
export const GetBudgetDocument = gql`
    query GetBudget($getBudgetId: String!) {
  getBudget(id: $getBudgetId) {
    id
    serialNumber
    price
    color
    deadline
    discount
    created_at
    products {
      id
      base
      height
      price
      product {
        id
        name
      }
    }
    client {
      name
      email
      contact
      phoneNumber
    }
  }
}
    `;

/**
 * __useGetBudgetQuery__
 *
 * To run a query within a React component, call `useGetBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetQuery({
 *   variables: {
 *      getBudgetId: // value for 'getBudgetId'
 *   },
 * });
 */
export function useGetBudgetQuery(baseOptions: Apollo.QueryHookOptions<GetBudgetQuery, GetBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetQuery, GetBudgetQueryVariables>(GetBudgetDocument, options);
      }
export function useGetBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetQuery, GetBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetQuery, GetBudgetQueryVariables>(GetBudgetDocument, options);
        }
export type GetBudgetQueryHookResult = ReturnType<typeof useGetBudgetQuery>;
export type GetBudgetLazyQueryHookResult = ReturnType<typeof useGetBudgetLazyQuery>;
export type GetBudgetQueryResult = Apollo.QueryResult<GetBudgetQuery, GetBudgetQueryVariables>;
export const ListBudgetsDocument = gql`
    query ListBudgets($skip: Int, $take: Int) {
  listBudgets(skip: $skip, take: $take) {
    totalBudgets
    budgets {
      id
      serialNumber
      price
      color
      deadline
      discount
      created_at
      products {
        id
        base
        height
        price
        product {
          id
          name
        }
      }
      client {
        name
        email
        contact
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useListBudgetsQuery__
 *
 * To run a query within a React component, call `useListBudgetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBudgetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBudgetsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useListBudgetsQuery(baseOptions?: Apollo.QueryHookOptions<ListBudgetsQuery, ListBudgetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBudgetsQuery, ListBudgetsQueryVariables>(ListBudgetsDocument, options);
      }
export function useListBudgetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBudgetsQuery, ListBudgetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBudgetsQuery, ListBudgetsQueryVariables>(ListBudgetsDocument, options);
        }
export type ListBudgetsQueryHookResult = ReturnType<typeof useListBudgetsQuery>;
export type ListBudgetsLazyQueryHookResult = ReturnType<typeof useListBudgetsLazyQuery>;
export type ListBudgetsQueryResult = Apollo.QueryResult<ListBudgetsQuery, ListBudgetsQueryVariables>;
export const UpdateBudgetInfoDocument = gql`
    mutation UpdateBudgetInfo($data: UpdateBudgetInfoInput!) {
  updateBudgetInfo(data: $data)
}
    `;
export type UpdateBudgetInfoMutationFn = Apollo.MutationFunction<UpdateBudgetInfoMutation, UpdateBudgetInfoMutationVariables>;

/**
 * __useUpdateBudgetInfoMutation__
 *
 * To run a mutation, you first call `useUpdateBudgetInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBudgetInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBudgetInfoMutation, { data, loading, error }] = useUpdateBudgetInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBudgetInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBudgetInfoMutation, UpdateBudgetInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBudgetInfoMutation, UpdateBudgetInfoMutationVariables>(UpdateBudgetInfoDocument, options);
      }
export type UpdateBudgetInfoMutationHookResult = ReturnType<typeof useUpdateBudgetInfoMutation>;
export type UpdateBudgetInfoMutationResult = Apollo.MutationResult<UpdateBudgetInfoMutation>;
export type UpdateBudgetInfoMutationOptions = Apollo.BaseMutationOptions<UpdateBudgetInfoMutation, UpdateBudgetInfoMutationVariables>;
export const UpdateBudgetProductsDocument = gql`
    mutation UpdateBudgetProducts($data: UpdateBudgetProductsInput!) {
  updateBudgetProducts(data: $data)
}
    `;
export type UpdateBudgetProductsMutationFn = Apollo.MutationFunction<UpdateBudgetProductsMutation, UpdateBudgetProductsMutationVariables>;

/**
 * __useUpdateBudgetProductsMutation__
 *
 * To run a mutation, you first call `useUpdateBudgetProductsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBudgetProductsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBudgetProductsMutation, { data, loading, error }] = useUpdateBudgetProductsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBudgetProductsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBudgetProductsMutation, UpdateBudgetProductsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBudgetProductsMutation, UpdateBudgetProductsMutationVariables>(UpdateBudgetProductsDocument, options);
      }
export type UpdateBudgetProductsMutationHookResult = ReturnType<typeof useUpdateBudgetProductsMutation>;
export type UpdateBudgetProductsMutationResult = Apollo.MutationResult<UpdateBudgetProductsMutation>;
export type UpdateBudgetProductsMutationOptions = Apollo.BaseMutationOptions<UpdateBudgetProductsMutation, UpdateBudgetProductsMutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($data: CreateClientInput!) {
  createClient(data: $data)
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation DeleteClient($deleteClientId: String!) {
  deleteClient(id: $deleteClientId)
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      deleteClientId: // value for 'deleteClientId'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const ListClientsDocument = gql`
    query ListClients($skip: Int, $take: Int) {
  listClients(skip: $skip, take: $take) {
    totalClients
    clients {
      id
      name
      contact
      address {
        id
        street
        number
        state
        city
        district
        cep
      }
      email
      phoneNumber
      document
      stateRegistration
    }
  }
}
    `;

/**
 * __useListClientsQuery__
 *
 * To run a query within a React component, call `useListClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListClientsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useListClientsQuery(baseOptions?: Apollo.QueryHookOptions<ListClientsQuery, ListClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListClientsQuery, ListClientsQueryVariables>(ListClientsDocument, options);
      }
export function useListClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListClientsQuery, ListClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListClientsQuery, ListClientsQueryVariables>(ListClientsDocument, options);
        }
export type ListClientsQueryHookResult = ReturnType<typeof useListClientsQuery>;
export type ListClientsLazyQueryHookResult = ReturnType<typeof useListClientsLazyQuery>;
export type ListClientsQueryResult = Apollo.QueryResult<ListClientsQuery, ListClientsQueryVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($data: UpdateClientInput!) {
  updateClient(data: $data)
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($data: CreateEmployeeInput!) {
  createEmployee(data: $data)
}
    `;
export type CreateEmployeeMutationFn = Apollo.MutationFunction<CreateEmployeeMutation, CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, options);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const DeleteEmployeeDocument = gql`
    mutation DeleteEmployee($deleteEmployeeId: String!) {
  deleteEmployee(id: $deleteEmployeeId)
}
    `;
export type DeleteEmployeeMutationFn = Apollo.MutationFunction<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;

/**
 * __useDeleteEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeMutation, { data, loading, error }] = useDeleteEmployeeMutation({
 *   variables: {
 *      deleteEmployeeId: // value for 'deleteEmployeeId'
 *   },
 * });
 */
export function useDeleteEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>(DeleteEmployeeDocument, options);
      }
export type DeleteEmployeeMutationHookResult = ReturnType<typeof useDeleteEmployeeMutation>;
export type DeleteEmployeeMutationResult = Apollo.MutationResult<DeleteEmployeeMutation>;
export type DeleteEmployeeMutationOptions = Apollo.BaseMutationOptions<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;
export const ListEmployeesDocument = gql`
    query ListEmployees {
  listEmployees {
    email
    id
    isAdmin
    name
  }
}
    `;

/**
 * __useListEmployeesQuery__
 *
 * To run a query within a React component, call `useListEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<ListEmployeesQuery, ListEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListEmployeesQuery, ListEmployeesQueryVariables>(ListEmployeesDocument, options);
      }
export function useListEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListEmployeesQuery, ListEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListEmployeesQuery, ListEmployeesQueryVariables>(ListEmployeesDocument, options);
        }
export type ListEmployeesQueryHookResult = ReturnType<typeof useListEmployeesQuery>;
export type ListEmployeesLazyQueryHookResult = ReturnType<typeof useListEmployeesLazyQuery>;
export type ListEmployeesQueryResult = Apollo.QueryResult<ListEmployeesQuery, ListEmployeesQueryVariables>;
export const RevalidateJwtDocument = gql`
    query RevalidateJWT($userId: String!) {
  revalidateJWT(userId: $userId)
}
    `;

/**
 * __useRevalidateJwtQuery__
 *
 * To run a query within a React component, call `useRevalidateJwtQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevalidateJwtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevalidateJwtQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRevalidateJwtQuery(baseOptions: Apollo.QueryHookOptions<RevalidateJwtQuery, RevalidateJwtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevalidateJwtQuery, RevalidateJwtQueryVariables>(RevalidateJwtDocument, options);
      }
export function useRevalidateJwtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevalidateJwtQuery, RevalidateJwtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevalidateJwtQuery, RevalidateJwtQueryVariables>(RevalidateJwtDocument, options);
        }
export type RevalidateJwtQueryHookResult = ReturnType<typeof useRevalidateJwtQuery>;
export type RevalidateJwtLazyQueryHookResult = ReturnType<typeof useRevalidateJwtLazyQuery>;
export type RevalidateJwtQueryResult = Apollo.QueryResult<RevalidateJwtQuery, RevalidateJwtQueryVariables>;
export const SignInDocument = gql`
    query SignIn($password: String!, $email: String!) {
  signIn(password: $password, email: $email) {
    token
    user {
      name
      email
      isAdmin
      id
    }
  }
}
    `;

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignInQuery(baseOptions: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
      }
export function useSignInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>;
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>;
export type SignInQueryResult = Apollo.QueryResult<SignInQuery, SignInQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($budgetId: String!) {
  createOrder(budgetId: $budgetId)
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      budgetId: // value for 'budgetId'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($deleteOrderId: String!) {
  deleteOrder(id: $deleteOrderId)
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      deleteOrderId: // value for 'deleteOrderId'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const FinishOrderDocument = gql`
    mutation FinishOrder($finishOrderId: String!) {
  finishOrder(id: $finishOrderId)
}
    `;
export type FinishOrderMutationFn = Apollo.MutationFunction<FinishOrderMutation, FinishOrderMutationVariables>;

/**
 * __useFinishOrderMutation__
 *
 * To run a mutation, you first call `useFinishOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishOrderMutation, { data, loading, error }] = useFinishOrderMutation({
 *   variables: {
 *      finishOrderId: // value for 'finishOrderId'
 *   },
 * });
 */
export function useFinishOrderMutation(baseOptions?: Apollo.MutationHookOptions<FinishOrderMutation, FinishOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishOrderMutation, FinishOrderMutationVariables>(FinishOrderDocument, options);
      }
export type FinishOrderMutationHookResult = ReturnType<typeof useFinishOrderMutation>;
export type FinishOrderMutationResult = Apollo.MutationResult<FinishOrderMutation>;
export type FinishOrderMutationOptions = Apollo.BaseMutationOptions<FinishOrderMutation, FinishOrderMutationVariables>;
export const GetOrderDocument = gql`
    query GetOrder($getOrderId: String!) {
  getOrder(id: $getOrderId) {
    id
    serialNumber
    budgetSerialNumber
    price
    color
    deadline
    discount
    signed
    finished_at
    client {
      id
      name
      email
      contact
      phoneNumber
    }
    products {
      id
      base
      height
      product {
        name
      }
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      getOrderId: // value for 'getOrderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const ListOrdersDocument = gql`
    query ListOrders($skip: Int, $take: Int) {
  listOrders(skip: $skip, take: $take) {
    totalOrders
    orders {
      id
      serialNumber
      budgetSerialNumber
      price
      color
      discount
      deadline
      signed
      finished_at
      client {
        id
        name
      }
      products {
        product {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useListOrdersQuery__
 *
 * To run a query within a React component, call `useListOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrdersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useListOrdersQuery(baseOptions?: Apollo.QueryHookOptions<ListOrdersQuery, ListOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrdersQuery, ListOrdersQueryVariables>(ListOrdersDocument, options);
      }
export function useListOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrdersQuery, ListOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrdersQuery, ListOrdersQueryVariables>(ListOrdersDocument, options);
        }
export type ListOrdersQueryHookResult = ReturnType<typeof useListOrdersQuery>;
export type ListOrdersLazyQueryHookResult = ReturnType<typeof useListOrdersLazyQuery>;
export type ListOrdersQueryResult = Apollo.QueryResult<ListOrdersQuery, ListOrdersQueryVariables>;
export const SignOrderDocument = gql`
    mutation SignOrder($signOrderId: String!) {
  signOrder(id: $signOrderId)
}
    `;
export type SignOrderMutationFn = Apollo.MutationFunction<SignOrderMutation, SignOrderMutationVariables>;

/**
 * __useSignOrderMutation__
 *
 * To run a mutation, you first call `useSignOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOrderMutation, { data, loading, error }] = useSignOrderMutation({
 *   variables: {
 *      signOrderId: // value for 'signOrderId'
 *   },
 * });
 */
export function useSignOrderMutation(baseOptions?: Apollo.MutationHookOptions<SignOrderMutation, SignOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOrderMutation, SignOrderMutationVariables>(SignOrderDocument, options);
      }
export type SignOrderMutationHookResult = ReturnType<typeof useSignOrderMutation>;
export type SignOrderMutationResult = Apollo.MutationResult<SignOrderMutation>;
export type SignOrderMutationOptions = Apollo.BaseMutationOptions<SignOrderMutation, SignOrderMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data)
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const ListProductsDocument = gql`
    query ListProducts($skip: Int, $take: Int) {
  listProducts(skip: $skip, take: $take) {
    totalProducts
    products {
      id
      name
      price
      cost
      description
    }
  }
}
    `;

/**
 * __useListProductsQuery__
 *
 * To run a query within a React component, call `useListProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useListProductsQuery(baseOptions?: Apollo.QueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
      }
export function useListProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
        }
export type ListProductsQueryHookResult = ReturnType<typeof useListProductsQuery>;
export type ListProductsLazyQueryHookResult = ReturnType<typeof useListProductsLazyQuery>;
export type ListProductsQueryResult = Apollo.QueryResult<ListProductsQuery, ListProductsQueryVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($data: UpdateProductInput!) {
  updateProduct(data: $data)
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;