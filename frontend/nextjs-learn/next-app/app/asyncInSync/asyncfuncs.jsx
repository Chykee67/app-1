"use client"

import { useState, useEffect } from 'react';
import { makeClient } from '../lib/ApolloWrapper';
import { GETJWTTOKEN } from '../lib/actions';
import { gql } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/AuthContext'

export function CHECK_LOGIN_STATUS(){

    const { signOut } = useAuth()

    const router = useRouter();

    console.log("start of checking login status function")

    const [user, setUser] = useState(null);

    useEffect( () => {

        (async () => {
            try{

                const User = await VERIFY_TOKEN();

                if (User){
                    console.log("user verified: ", User)
                    setUser(User);
                }else{}
            }catch(error){
                console.error("token verification error: ", error);
                router.push('/todoapp/signin')
            }
        })();})

    if (user){
        return <div>
            <p>Welcome, {user}!</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    }else{
        return <button>Log In</button>
    }

}

export async function VERIFY_TOKEN(){

    const client = makeClient()

    const {data, loading, error } = await client.mutate({
        mutation: TOKEN_VERIFICATION,
        variables: {token: await GETJWTTOKEN()}
    })

    return new Promise((resolve, reject) => {
        const userName = data.verifyToken.payload.username
        if (userName){
            resolve(userName)
        }else{
            reject(error)
        }
    })
}

const TOKEN_VERIFICATION = gql`
    mutation VerifyToken($token: String!){
        verifyToken(input: {token: $token}){
            payload
        }
    }
`