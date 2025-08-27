'use server'

import { cookies } from 'next/headers'

export default async function COOKIECHECK(name: string){
    const cookiestore = await cookies()

    if (cookiestore.has(name)){
        return cookiestore.get(name)
    } else{
        return "cookie not found"
    }

}