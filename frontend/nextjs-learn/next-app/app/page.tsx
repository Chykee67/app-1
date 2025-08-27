'use client'

import { useMutation, gql } from "@apollo/client";
import { useState } from 'react'

const GET_TOKEN = gql`
  mutation tokenAuth($username: String!, $password: String!){
    tokenAuth(input: {username: $username, password: $password}){
      token
      payload
    }
  }
`

export default function Page() {

  const [login, {data, loading, error}] = useMutation(GET_TOKEN)

  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  const [username, setUsername] = useState("Enter Username")
  const [password, setPassword] = useState("Enter Password")

  if (loading) return "Loading..."
  if (error){
    console.log(error)
    return `Loading error: ${error.message}`
  }
  if (user){
    console.log(user, authToken)
    console.log(data.tokenAuth.payload.exp)
  }

  return (
        <div>
            <h1 className="font-black font-serif p-2 m-4 text-2xl">Sign In</h1>
            <form onSubmit={(e) => {
              e.preventDefault()
              login({
                variables: { username, password },
                onCompleted (data){
                  setUser(data.tokenAuth.payload.username)
                  setAuthToken(data.tokenAuth.token)
                }
              })
            }}>
                <input type="text" placeholder="Username"
                    className="border-gray-600 rounded-full border-2
                        p-2 m-4"
                    autoFocus
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                />
                <br />
                <input type="password" placeholder="Password"
                    className="border-black rounded-full border-2
                        p-2 m-4"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                />
                <br />
                <button type="submit"
                    className="p-2 m-4 bg-blue-300
                        border-2 rounded-full
                        font-sans font-bold"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}
