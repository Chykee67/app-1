'use client'

import { useAuth } from '../../lib/AuthContext'

export default function SignOutButton(){

    const { signOut } = useAuth()


    return (
        <button onClick={signOut}>Sign Out</button>
    )
}