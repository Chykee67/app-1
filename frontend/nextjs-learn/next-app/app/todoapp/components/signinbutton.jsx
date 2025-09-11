'use client'

export default function SignInButton(){

    const handleSignIn = () => {
        window.location.href = '/todoapp/signin';
    }

    return (
        <button onClick={handleSignIn}>Sign In</button>
    )
}