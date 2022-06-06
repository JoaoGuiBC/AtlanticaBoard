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
  document: Scalars['String'];
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
  document: Scalars['String'];
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
  createProduct: Scalars['String'];
  deleteBudget: Scalars['String'];
  deleteClient: Scalars['String'];
  deleteEmployee: Scalars['String'];
  deleteProduct: Scalars['String'];
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


export type MutationDeleteProductArgs = {
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
  listBudgets: ListBudgetsValue;
  listClients: ListClientsValue;
  listEmployees: Array<Employee>;
  listProducts: ListProductsValue;
  revalidateJWT: Scalars['String'];
  signIn: SignInResponse;
};


export type QueryListBudgetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListClientsArgs = {
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