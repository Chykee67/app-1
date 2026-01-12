"use client";

import { useEffect, useRef, useState } from "react";

export default function TaskDetailed({title, description, due, status}){

    const dueDate = new Date(due)
    const [countDownTime, setCountDownTime] = useState(null);
    const countDownTimeRef = useRef(dueDate - new Date());

    const formattedTime = (milliseconds) => {
        if(milliseconds <= 0){
            return "Past due";
        }
        const days = Math.floor(milliseconds/(1000 * 60 * 60 * 24));
        const hours = Math.floor(milliseconds/(1000 * 60 * 60) % 24); 
        const minutes = Math.floor(milliseconds/(1000 * 60) % 60);
        const seconds = Math.floor(milliseconds/1000 % 60);

        return `${days}d ${hours}hrs ${minutes}mins ${seconds}s till due`
    }

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCountDownTime(countDownTimeRef.current = dueDate - new Date())
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countDownTimeRef.current])

    return(
        <div>
            <h1>{title.toUpperCase()}</h1>
            <div>
                <p>Description:</p>
                <p>{description.toLowerCase()}</p><br />
                <p>Due:</p>
                <p>{dueDate.toString()}</p><br />
                <p>Status: {status.toLowerCase()}</p><br />
            </div>
            <div>Countdown: {formattedTime(countDownTime)}</div>
        </div>
    )
}