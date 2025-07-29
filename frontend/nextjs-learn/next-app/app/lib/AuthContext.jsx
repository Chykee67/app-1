"use client"

import { createContext, useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { TestContextProvider } from './TestContext'

const GET_TOKEN = gql`
  mutation tokenAuth($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
      token
      payload
    }
  }
`

export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [login, { data, loading, error }] = useMutation(GET_TOKEN)

    function SignIn (username, password) {

        login({
            variables: {username, password},
            onCompleted(data){
                console.log(data.tokenAuth.token)
                setUser(data.tokenAuth.payload.username)
                console.log(user)
            }
        })

        //persist login status in an httponly cookie
    }

    const SignOut = () => {
        setUser(null)
        // clear cookie
    }

    return (
        <AuthContext value={{user, SignIn, SignOut }}>
            { children }
        </AuthContext>
    )
}

export const useAuth = () => {
    useContext(AuthContext)
}