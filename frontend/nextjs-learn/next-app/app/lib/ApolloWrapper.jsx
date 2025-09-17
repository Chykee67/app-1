"use client"

import { AuthProvider } from './AuthContext'
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"

import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs"

export function makeClient(){
    const httpLink = new UploadHttpLink({
        uri: "http://127.0.0.1:3031/graphql/",
        credentials: "include"
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    })
}

export function ApolloWrapper({ children }){
    return(
        <ApolloNextAppProvider makeClient={makeClient}>
            <AuthProvider>
                { children }
            </AuthProvider>
        </ApolloNextAppProvider>
    )
}