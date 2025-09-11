'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/AuthContext'

function signin(){

    const { signIn, errorMessage } = useAuth()

    const [credentials, setCredentials] = useState({ username: "", password: ""})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(e){
        e.preventDefault()
        signIn(credentials.username, credentials.password)
    }


    return (
        <div>
            {errorMessage && <p className="text-red-500 font-bold p-2 m-4">{errorMessage}</p>}

            <h1 className="font-black font-serif p-2 m-4 text-2xl">Sign In</h1>

            <form onSubmit={handleSubmit} onChange={handleChange}>
                <input type="text" id="username" name="username" placeholder="Username" autoFocus required
                    className="border-gray-700 rounded-full border-2
                        p-2 m-4"
                />
                <br />
                <input type="password" id="password" name="password" placeholder="Password" required
                    className="border-gray-700 rounded-full border-2
                        p-2 m-4"
                />
                <br />
                <button type="submit"
                    className="p-2 m-4 bg-amber-400
                        border-1 border-gray-400 rounded-full
                        font-sans font-bold"
                >
                    Sign In
                </button>
            </form>

            <div>
                <p>Don't have an account? Please sign up <a href='/todoapp/signup' className='text-amber-400 hover:underline'>here!</a></p>
            </div>

        </div>
    )
}

export default signin