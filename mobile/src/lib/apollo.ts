import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

import { SERVER_URI } from '@env';

const httpLink = createHttpLink({
  uri: SERVER_URI,
  fetch,
});

console.log(`${SERVER_URI}`);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link: from([httpLink]), cache });
