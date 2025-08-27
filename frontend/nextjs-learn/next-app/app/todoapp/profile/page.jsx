"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'

import { GET_USER_DETAILS } from '@/app/lib/graphql_queries'

import { useQuery } from '@apollo/client'

import { useAuth } from '@/app/lib/AuthContext'

export default function UserDetails(){

    const router = useRouter();

    const {data, loading, error} = useQuery(GET_USER_DETAILS);

    const { resetCookies } = useAuth();

    const pathname = usePathname()


    if (loading) return "Loading..."

    if (error){
        (async () => await resetCookies())();
    }
    
    if (data?.userDetails){
        return (
            <div>
                <h1 className="font-black font-serif p-2 m-4 text-2xl">
                    User Details
                </h1>
                <p className="p-2 m-4 text-lg">
                    Username: {data.userDetails.username}<br />
                    Email: {data.userDetails.email}<br />
                    current path: {pathname}
                </p>
            </div>
        )
    }else{
        router.push('/todoapp/signin');
    }
}