'use client'

import { useRouter } from 'next/navigation'

export default function SignInButton(){

    const router = useRouter()

    const handleSignIn = () => {
        router.push('/todoapp/signin')
    }

    return (
        <button onClick={handleSignIn}>Sign In</button>
    )
}