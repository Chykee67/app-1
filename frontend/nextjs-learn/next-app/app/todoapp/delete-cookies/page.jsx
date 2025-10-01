'use client'

import { DELETE_TOKEN_COOKIE } from '../../lib/graphql_mutations'

import { useMutation } from '@apollo/client'

export default function DeleteCookies(){
    const [deleteCookie, { loading, data, error }] = useMutation(DELETE_TOKEN_COOKIE)

    const handleClick = async(e) => {
        e.preventDefault();

        try {
            const { data } = await deleteCookie();
        } catch(error){
            console.error('deleting cookie error', error);
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.messages}</p>

    return (
        <div>
            <button onClick={handleClick}>Delete Cookie</button>
        </div>
    )
}