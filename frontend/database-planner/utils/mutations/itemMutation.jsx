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

export const DELETE_ITEM = gql`
    mutation DeleteItem($title: String!, $card: String!){
        deleteItem(input: {title: $title, card: $card}){
            deleted
        }
    }
`