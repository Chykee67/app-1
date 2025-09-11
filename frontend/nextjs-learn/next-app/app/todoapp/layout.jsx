"use client"

import { SITE_BANNER, NAVIGATION_BAR } from './constants';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { GET_PROFILE_DETAILS } from './queries';
import { useAuth } from '../lib/AuthContext';
import { createContext, useContext } from 'react';

export const ProfileContext = createContext();

export default function TODOAPPLAYOUT({children}){
    const pathname = usePathname();

    if(pathname === '/todoapp/signin' || pathname === '/todoapp/signup'){
        return (
            <>
                <div>
                    <SITE_BANNER />
                </div>
                {children}
            </>
        )
    }

    const { resetCookies } = useAuth();

    const { data, loading, error } = useQuery(GET_PROFILE_DETAILS);

    if (error){
        if (error.message.includes("Authentication")) {
            (async () => { await resetCookies(); })();
        } else {
            window.location.href = '/todoapp/signin';
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (pathname !== '/todoapp/signin' && pathname !== '/todoapp/signup' && data?.profile?.user?.username){
        const username = data.profile.user.username;
        const bio = data.profile.bio;
        const avatarUrl = data.profile.avatarUrl;
        return (
            <>
                <div>
                    <SITE_BANNER />
                </div>
                
                <div>
                    <NAVIGATION_BAR />
                </div>

                <ProfileContext value={{ username, bio, avatarUrl }}>
                    {children}
                </ProfileContext>
            </>
        )}
    }

export const useProfile = () => useContext(ProfileContext);