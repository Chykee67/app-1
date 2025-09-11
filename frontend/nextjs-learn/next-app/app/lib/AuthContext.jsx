"use client"

import { createContext, useState, useContext, useRef } from 'react'
import { makeClient } from './ApolloWrapper'

import {    GET_REFRESH_TOKEN,
            REVOKE_REFRESH_TOKEN,
            DELETE_TOKEN_COOKIE,
            DELETE_REFRESH_TOKEN_COOKIE,
    } from './graphql_mutations'

import { GETJWTREFRESHTOKEN } from './actions'
import { LOGIN } from './graphql_mutations'


export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

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
                    window.location.href = '/todoapp/profile';

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
                        revoked.current = true
                        window.location.href = window.location.href;
                    }else{}

                } catch(error) {

                    console.error("Invalid refresh token: ", error)
                    window.location.href = '/todoapp/signin';

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
                window.location.href = window.location.href//'/todoapp/'; //PART I CHANGED
            }

        }else{
            setErrorMessage("Please sign in again!!")
            console.error("No refresh token found")
            window.location.href = '/todoapp/signin';
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

        window.location.href = '/todoapp/signin';
    }


    return (
        <AuthContext value={{ signIn,
            resetCookies,
            signOut,
            errorMessage,
        }}>
            { children }
        </AuthContext>
    )
}

export const useAuth = () => useContext(AuthContext)