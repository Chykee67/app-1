import { gql } from '@apollo/client';

export const CREATE_CARD = gql`
    mutation CreateCard($title: String!){
        createCard(input: {title: $title}){
            card{
                title
            }
        }
    }
`

export const DELETE_CARD = gql`
    mutation DeleteCard($title: String!){
        deleteCard(input: {title: $title}){
            deleted
        }
    }
`