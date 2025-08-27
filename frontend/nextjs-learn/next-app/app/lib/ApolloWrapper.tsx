"use client"

import { AuthProvider } from './AuthContext'
import { HttpLink } from "@apollo/client"

import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs"

import { TestContextProvider } from './TestContext'

export function makeClient(){
    const httpLink = new HttpLink({
        uri: "http://127.0.0.1:8000/graphql/",
        credentials: "include"
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    })
}

export function ApolloWrapper({ children }: React.PropsWithChildren){
    return(
        <ApolloNextAppProvider makeClient={makeClient}>
            <AuthProvider>
                { children }
            </AuthProvider>
        </ApolloNextAppProvider>
    )
}