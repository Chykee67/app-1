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

    export const CREATE_TASK = gql`
        mutation CreateTask($title: String!, $description: String!, $due: DateTime!, $priority: String){
            createTask(input: {
                title: $title,
                description: $description,
                due: $due
                priority: $priority
            }){
                task{
                    title
                    description
                    due
                    priority
                }
            }
        }
    `