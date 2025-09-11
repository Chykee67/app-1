import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation CreateUser(
        $username: String!,
        $password: String!,
        $email: String!,
        $firstName: String,
        $lastName: String,
        $bio: String
    ){
        createUser(input: {
            username: $username,
            password: $password,
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            bio: $bio
        }){
            profile{
                user{
                    username
                    email
                }
                bio
            }    
        }    
    }
    `;

    export const UploadFileMutation = gql`
    mutation UploadFile($file: Upload!){
        uploadFile(file: $file){
            success
        }
    }
    `;