import { gql } from "@apollo/client";

export const GET_ALL_CARDS = gql`
    query GetAllCard{
        allCards{
            edges{
                node{
                    id
                    title
                    items{
                        edges{
                            node{
                                id
                                title
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_CARD_BY_TITLE = gql`
    query GetCardByTitle($title: String!){
        allCards(title: $title){
            edges{
                node{
                    id
                    title
                }
            }
        }
    }
`