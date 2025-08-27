'use server'

import { cookies } from 'next/headers'


export async function GETJWTREFRESHTOKEN(){

  const cookieJar = await cookies()

  if (cookieJar.get("JWT-refresh-token")?.value){

    return cookieJar.get("JWT-refresh-token")?.value

  } else{

    return null

  }

}

export async function GETJWTTOKEN(){
  
  const cookieJar = await cookies()

  if (cookieJar.get("JWT")?.value){

    return cookieJar.get("JWT")?.value

  } else{

    return null

  }
}