import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BASE_URL } from './environment';

const client = new ApolloClient({
  uri: BASE_URL, // Replace with your endpoint
  cache: new InMemoryCache()
});

export default client;
