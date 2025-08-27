import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`query MyQuery {
        allTasks {
            edges{
                node{
                    id
                    title
                    description
                }
            }
        }
    }`;