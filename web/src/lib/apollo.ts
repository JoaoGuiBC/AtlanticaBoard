import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_URI,
  fetch,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({ link: from([httpLink]), cache });
