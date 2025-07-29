'use client'

import { useEffect } from 'react'

interface SignInButtonProps{
    formId: string
}

const SignInButton = ({formId}: SignInButtonProps) => {

    useEffect(() => {
        document.getElementById(formId)?.addEventListener("submit", (event) => {
            event.preventDefault()

            const formData = new FormData(event.target)
            console.log(formData)
        })
    }, [])
    return (
        <button type="submit"
            className="p-2 m-4 bg-blue-300
                border-2 rounded-full
                font-sans font-bold"
        >
            Sign In
        </button>
    )
}

export default SignInButton