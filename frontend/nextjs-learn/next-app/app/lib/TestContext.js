"use client"

import { createContext, useState } from 'react'

import Test from '../test/page.jsx'

export const TestContext = createContext(null)

export function TestContextProvider({ children }){

    const [test, setTest] = useState("testcontext")

    const hello = () => "Hello"

    function hollara(name){
        console.log(name)
    }

    return (
        <TestContext value={{test, hello, hollara}}>
            {children}
        </TestContext>
    )
}