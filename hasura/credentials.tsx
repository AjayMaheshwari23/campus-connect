import { ApolloClient, InMemoryCache } from "@apollo/client";
const adminSecretKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

const client = new ApolloClient({
  uri: "https://campusconnect.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": adminSecretKey,
  },
  cache: new InMemoryCache(),
});

export default client;
