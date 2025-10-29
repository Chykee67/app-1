import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
    mutation CreateItem($title: String!, $card: String!){
        createItem(input: {title: $title, card: $card}){
            item{
                id
                title
            }
        }
    }
`