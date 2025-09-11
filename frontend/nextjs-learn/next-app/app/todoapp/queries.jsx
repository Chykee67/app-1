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

export const GET_PROFILE_DETAILS = gql`
    query GetProfileDetails{
        profile{
            user{
                username
            }
            bio
            avatarUrl
        }
    }
`;

export const GET_PROFILE_USERNAME = gql`
    query GetProfileUsername{
        profile{
            user{
                username
            }
        }
    }
`;

export const GET_PROFILE_BIO = gql`
    query GetProfileBio{
        profile{
            bio
        }
    }
`;

export const GET_PROFILE_AVATAR = gql`
    query GetProfileAvatar{
        profile{
            avatarUrl
        }
    }
`;