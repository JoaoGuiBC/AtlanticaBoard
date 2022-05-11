import 'reflect-metadata';

import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { UserResolver } from '@resolvers/UserResolver';
import { EmployeeResolver } from '@resolvers/EmployeeResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, EmployeeResolver],
    emitSchemaFile: path.resolve(__dirname, '..', 'schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server is running on: ${url}`); // eslint-disable-line
}

main();
