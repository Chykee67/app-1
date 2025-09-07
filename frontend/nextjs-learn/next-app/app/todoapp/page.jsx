'use client';

import { useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';

const TodoApp = () => {

    const { user, SET_USER } = useAuth();

    useEffect(
        () => {
            (async () => await SET_USER() )();
        }
    )

    return(
        <>
            <h1 className='font-bold text-black-700 text-2xl m-2 p-2'>
                Welcome {user && user !== "Anonymous" ? user : "Guest"}!
            </h1>
        </>
    )
}

export default TodoApp;