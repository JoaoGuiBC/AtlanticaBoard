import 'reflect-metadata';

import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { UserResolver } from '@resolvers/UserResolver';
import { EmployeeResolver } from '@resolvers/EmployeeResolver';
import { ClientResolver } from '@resolvers/ClientResolver';
import { ProductResolver } from '@resolvers/ProductResolver';

import { authChecker } from './http/middlewares/authCheckerMiddleware';

async function main() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      EmployeeResolver,
      ClientResolver,
      ProductResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, '..', 'schema.gql'),
    authChecker,
  });

  const server = new ApolloServer({
    context: ({ req }) => {
      const token = req.headers.authorization || '';

      return { token };
    },
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server is running on: ${url}`); // eslint-disable-line
}

main();
