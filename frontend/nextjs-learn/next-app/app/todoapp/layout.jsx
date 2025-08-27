"use client"

import { SITE_BANNER, NAVIGATION_BAR } from './constants';
import { useAuth } from '../lib/AuthContext';
import { useEffect } from 'react';
export default function TODOAPPLAYOUT({children}){

    const { SET_USER, user } = useAuth();

    useEffect(() => {
        (async () => await SET_USER() )();
    }, [user])

    return (
        <>
            <div>
                <SITE_BANNER />
            </div>
            
            <div>
                <NAVIGATION_BAR User={user}/>
            </div>

            {children}
        </>
    )
}