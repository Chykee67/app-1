"use client"

import { useContext } from 'react'

import { TestContext } from '../lib/TestContext'

function Test(){

    const {test, hello, hollara} = useContext(TestContext)

    console.log(hello(), test)
    hollara(test)

    return (
        <div>
            <p>tester is: {test}</p>
        </div>
    )
}

export default Test