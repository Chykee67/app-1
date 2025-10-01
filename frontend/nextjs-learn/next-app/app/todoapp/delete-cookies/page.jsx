import { DELETE_TOKEN_COOKIE } from '../../lib/graphql_mutations'

import { getClient } from '../../lib/ApolloClient'

export default async function DeleteCookies(){

    const handleClick = async(e) => {
        e.preventDefault();

        try {
            const { data } = await getClient().mutate(
                {mutation: DELETE_TOKEN_COOKIE}
            )
        } catch(error){
            console.error('deleting cookie error', error);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Delete Cookie</button>
        </div>
    )
}