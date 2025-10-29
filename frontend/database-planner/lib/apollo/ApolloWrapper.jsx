"use client"

import { HttpLink } from "@apollo/client"

import {
    ApolloClient,
    InMemoryCache,
    ApolloNextAppProvider,
} from "@apollo/client-integration-nextjs"

export function makeClient(){
    const httpLink = new HttpLink({
        uri: "http://127.0.0.1:8000/graphql/",
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    })
}

export function ApolloWrapper({ children }){
    return(
        <ApolloNextAppProvider makeClient={makeClient}>
            { children }
        </ApolloNextAppProvider>
    )
}