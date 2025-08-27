'use client'

import { CHECK_LOGIN_STATUS } from './asyncfuncs';
import { useState } from 'react';

export default function SYNC(){

    console.log("start of sync func before asyn call");

    const [value, setValue] = useState("Loading...");

    let result;

    (async () => {
        try{
            result = await myAsyncFunc()
            setValue(result);
            console.log("result of awaiting async func in sync func: ", result)
        }catch(error){
            console.error("Error from async func: ", error)
        }finally{
            return <p>result: {result}</p>
        }
    })();

    return (
        <div>
            <h1>Async in Sync Example</h1>
            <p>Value: {value}</p>
        </div>
    );

    console.log("after executing async in sync")
    console.log("result after async call: ", result)

}

async function myAsyncFunc(){
    return new Promise(
        resolve => {
            setTimeout(() => {
                const message = "Hello from async function";
                resolve(message);
            }, 1000);
        }
    )
}