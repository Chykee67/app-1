import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"

import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs"

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new UploadHttpLink({
      uri: "http://127.0.0.1:8000/graphql/",
      credentials: "include"
    })
  })
})