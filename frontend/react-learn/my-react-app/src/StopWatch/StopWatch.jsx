import styles from './StopWatch.module.css';
import { useState, useEffect, useRef } from 'react';

function StopWatch(){

    const [milliseconds, setMilliseconds] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);


    const pauseButtonRef = useRef();
    const resetButtonRef = useRef();

    let intervalId;

    function handleStart(){
        intervalId = setInterval(() => {
            setMilliseconds(m => m + 1);
        }, 10)
    }

    function handlePause(){
        clearInterval(intervalId);
    }

    function handleReset(){
        clearInterval(intervalId);
        setMilliseconds(0);
        setSeconds(0);
        setMinutes(0);
    }

    useEffect(() => {

        console.log("Component rendered")

        if (milliseconds === 99 && seconds === 59){
            setMinutes(minutes => minutes + 1);
            setMilliseconds(0);
            setSeconds(0);
        }

        if (milliseconds === 99 && seconds !== 59){
            setSeconds(seconds => seconds + 1);
            setMilliseconds(0);
        }

        pauseButtonRef.current.addEventListener("click", handlePause);

        resetButtonRef.current.addEventListener("click", handleReset);

        return () => {
            removeEventListener("click", handlePause);
            removeEventListener("click", handleReset);
        }
    })

    function padZero(number){
        return number < 10 ? `0${number}`: number;
    }

    return (
        <div>
            <h1>Stop Watch</h1>
            <p className={styles.watch}>{padZero(minutes)}:{padZero(seconds)}:{padZero(milliseconds)}</p><br />
            <button ref={resetButtonRef}>Reset</button>
            <button ref={pauseButtonRef}>Pause</button>
            <button onClick={handleStart}>Start</button>
        </div>
    );
}

export default StopWatch;