'use client'

import { makeClient } from '../lib/ApolloWrapper'
import { GET_REFRESH_TOKEN } from '../lib/graphql_mutations'
import { useMutation } from '@apollo/client'

export const testMutation = () => {

    const refresh_token = "d0f0ca6f29ce9f79cb6f690f8550ccf7a1ec7ec0"

    const [refresh_Token, { data, loading, error }] = useMutation(GET_REFRESH_TOKEN, {
        variables: {
            refreshToken: refresh_token
        }
    })

    console.log(data)

    return (
        <div>
            <p> Mutation was successful </p>
            <button onClick={() => refresh_Token()}>
                Refresh Token
            </button>
        </div>
    )
}

export default testMutation