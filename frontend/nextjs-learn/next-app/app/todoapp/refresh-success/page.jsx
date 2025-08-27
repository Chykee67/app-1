'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function RefreshSuccess(){
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    }, [])

    return "Refresh successful!"
}