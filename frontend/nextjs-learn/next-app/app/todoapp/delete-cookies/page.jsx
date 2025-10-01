import { DELETE_TOKEN_COOKIE } from '../../lib/graphql_mutations'

import { getClient } from '../../lib/ApolloClient'

export default async function DeleteCookies(){

    try {
        const { data } = await getClient().mutate(
            {mutation: DELETE_TOKEN_COOKIE}
        )

        console.log(data)
    } catch(error){
        console.error('deleting cookie error', error);
    }

}