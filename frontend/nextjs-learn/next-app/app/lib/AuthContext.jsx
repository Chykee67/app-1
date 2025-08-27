"use client"

import { createContext, useState, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { makeClient } from './ApolloWrapper'

import {    GET_REFRESH_TOKEN,
            REVOKE_REFRESH_TOKEN,
            DELETE_TOKEN_COOKIE,
            DELETE_REFRESH_TOKEN_COOKIE,
            VERIFY_TOKEN
    } from './graphql_mutations'

import { GETJWTREFRESHTOKEN, GETJWTTOKEN } from './actions'
import { LOGIN } from './graphql_mutations'


export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const router = useRouter()

    const [refreshed, setRefreshed] = useState(false)

    const [user, setUser] = useState("Anonymous");

    const revoked = useRef(false)

    const [errorMessage, setErrorMessage] = useState(null);

    const logIn = async (loginUsername, loginPassword) => {

        const client = makeClient()

        try {

                const { data: loginData } = await client.mutate({
                    mutation: LOGIN,
                    variables: {username: loginUsername, password: loginPassword},
                })

                if (loginData.tokenAuth.token){
                    router.push('/todoapp/')

                }else{}

            } catch(error){
                setErrorMessage("Invalid username or password");
                console.error("Signin Error: ", error)
            }
    }

    const signIn = async (username, password) => {

        const client = makeClient()

        const old_refresh_tk = await GETJWTREFRESHTOKEN()

        if (old_refresh_tk){
            try {

                const {data: revoke_rftk_before_signin_data} = await client.mutate({
                    mutation: REVOKE_REFRESH_TOKEN,
                    variables: { refreshToken: old_refresh_tk}
                })

                if (revoke_rftk_before_signin_data?.revokeToken?.revoked){
                    console.log("Old refresh token revoked successfully before signin")
                    revoked.current = revoke_rftk_before_signin_data.revokeToken.revoked
                }

            } catch(error){

                console.error("Error from revoking old rf token: ", error)

            }finally{

                    await logIn(username, password)
                }
        } else{
            await logIn(username, password)
        }
    }

    const resetCookies = async () => {

        const refresh_Token = await GETJWTREFRESHTOKEN() //get refreshtoken from refreshtoken cookie

        const client = makeClient()

        if (refresh_Token){

            //refresh the token and cookies
            if (revoked.current === false){

                try {

                    const { data: refresh_token_data } = await client.mutate({
                    mutation: GET_REFRESH_TOKEN,
                    variables: { refreshToken: refresh_Token },
                    })

                    console.log("Refresh token data: ", refresh_token_data.refreshToken.refreshToken)

                    //set refreshed state to true if refresh was successful
                    if (refresh_token_data?.refreshToken?.token) {
                        setRefreshed(true)
                        revoked.current = true
                        router.refresh()
                    }else{}

                } catch(error) {

                    console.error("Invalid refresh token: ", error)
                    //router.push('/todoapp/signin')
                    router.refresh()

                }


                try {

                    const { data: revoke_token_data } = await client.mutate({
                        mutation: REVOKE_REFRESH_TOKEN,
                        variables: { refreshToken: refresh_Token}
                    })

                    if (revoke_token_data?.revokeToken?.revoked){
                        console.log("Refresh token revoked successfully on cookie reset")
                        revoked.current = true
                    } else{}

                }catch(error){
                    console.error("Revoking refreshToken error: ", error)
                    revoked.current = false
                }
            }else{
                console.log("Refresh token already revoked")
                router.push('/todoapp/')
            }

        }else{
            setErrorMessage("Please sign in again!!")
            console.error("No refresh token found")
            router.push('/todoapp/signin')
        }
        
    }

    const signOut = async () => {

        const client = makeClient()

        await client.mutate({
            mutation: REVOKE_REFRESH_TOKEN,
            variables: { refreshToken: await GETJWTREFRESHTOKEN() },
        })

        await client.mutate({
            mutation: DELETE_REFRESH_TOKEN_COOKIE,
        })

        await client.mutate({
            mutation: DELETE_TOKEN_COOKIE,
        })

        router.push('/todoapp/signin')
    }

    
    const GET_USER = async () => {

        const client = makeClient();

        try {
            const tk = await GETJWTTOKEN();

            if (tk !== null) {

                const {data} = await client.mutate({
                    mutation: VERIFY_TOKEN,
                    variables: { token: tk }
                })

                if (data?.verifyToken?.payload) {
                    return { User: data.verifyToken.payload.username, error: null }
                }else{
                    return { User: "Anonymous", error: "Invalid token" }
                }

            }else{
                return { User: "Anonymous", error: "No token found" }
            }
        }catch(error){
            console.error("Error verifying token:", error);
            return { User: "Anonymous", error: "Token verification failed" }
        }
    }

    const SET_USER = async () => {

        const { User: loggedInUser, error: setUserError } = await GET_USER();

        if (setUserError){
            console.log("Error from set_user: ", setUserError);
        }

        setUser(loggedInUser);
    }


    return (
        <AuthContext value={{ signIn,
            resetCookies,
            refreshed,
            signOut,
            errorMessage,
            SET_USER,
            user
        }}>
            { children }
        </AuthContext>
    )
}

export const useAuth = () => useContext(AuthContext)