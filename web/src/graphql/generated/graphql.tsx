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
};

export type CreateEmployeeInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createEmployee: Scalars['String'];
};


export type MutationCreateEmployeeArgs = {
  data: CreateEmployeeInput;
};

export type Query = {
  __typename?: 'Query';
  listEmployees: Array<Employee>;
  revalidateJWT: Scalars['String'];
  signIn: SignInResponse;
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

export type CreateEmployeeMutationVariables = Exact<{
  data: CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: string };

export type ListEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListEmployeesQuery = { __typename?: 'Query', listEmployees: Array<{ __typename?: 'Employee', email: string, id: string, isAdmin: boolean, name: string }> };

export type SignInQueryVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'Employee', name: string, email: string, isAdmin: boolean, id: string } } };


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