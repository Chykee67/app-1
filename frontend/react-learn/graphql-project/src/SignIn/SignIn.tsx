import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'


const SIGN_IN = gql`
    mutation tokenAuth($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            token
        }
    }
`

function SignIn(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [signin, { data, error, reset }] = useMutation(SIGN_IN)


    if (error) return <p>"Submission error!": {error.message}</p>

    console.log(data)

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                signin({ variables: { username: username, password: password } })
            }}>
                <input onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <br />
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn