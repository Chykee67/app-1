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