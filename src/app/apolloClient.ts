import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  name: "AirsoftSeven",
  version: "1.0",
  uri: "http://localhost:4000/", // TODO unhardcode
  cache: new InMemoryCache(),
});

export default client;
