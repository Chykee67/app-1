'use client';

import Link from 'next/link';
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
            <h1>
                Welcome {user && user !== "Anonymous" ? user : "Guest"}!
            </h1>
        </>
    )
}

export default TodoApp;