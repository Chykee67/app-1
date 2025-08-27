'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/AuthContext'

function signin(){

    const { signIn, errorMessage } = useAuth()

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        signIn(username, password)
    }


    return (
        <div>
            {errorMessage && <p className="text-red-500 font-bold p-2 m-4">{errorMessage}</p>}
            <h1 className="font-black font-serif p-2 m-4 text-2xl">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username"
                    className="border-gray-600 rounded-full border-2
                        p-2 m-4"
                    autoFocus
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <br />
                <input type="password" placeholder="Password"
                    className="border-black rounded-full border-2
                        p-2 m-4"
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />
                <br />
                <button type="submit"
                    className="p-2 m-4 bg-blue-300
                        border-2 rounded-full
                        font-sans font-bold"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default signin