import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation TokenAuth($username: String!, $password: String!){
    tokenAuth(input: {username: $username, password: $password}){
      token
      payload
      refreshToken
    }
  }
`


export const GET_REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!){
    refreshToken(input: {refreshToken: $refreshToken}){
      token
      payload
      refreshToken
    }
  }
`


export const REVOKE_REFRESH_TOKEN = gql`
  mutation RevokeToken($refreshToken: String!){
    revokeToken(input: {refreshToken: $refreshToken}){
      revoked
    }
  }
`

export const DELETE_TOKEN_COOKIE = gql`
  mutation DeleteTokenCookie{
    deleteTokenCookie(input: {}){
      deleted
    }
  }
`

export const DELETE_REFRESH_TOKEN_COOKIE = gql`
  mutation DeleteRefreshTokenCookie{
    deleteRefreshTokenCookie(input: {}){
      deleted
    }
  }
`

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!){
    verifyToken(input: {token: $token}){
      payload
    }
  }
`