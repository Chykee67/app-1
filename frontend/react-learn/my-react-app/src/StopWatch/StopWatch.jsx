import styles from './StopWatch.module.css';
import { useState, useEffect, useRef } from 'react';

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);

    const [elapsedTime, setElapsedTime] = useState(0);

    const startTimeRef = useRef(0);
    const intervalIdRef = useRef(null);

    function handleStart(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function handlePause(){
        setIsRunning(false);
    }

    function handleReset(){
        setIsRunning(false);
        setElapsedTime(0);
    }

    function padZero(number){
        return number < 10 ? `0${number}`: number;
    }

    useEffect(() => {

        if (isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 100);

            return () => {
                clearInterval(intervalIdRef.current);
            }
        }
    }, [isRunning])

    function formatTime(){

        let milliseconds = Math.floor(elapsedTime % 100)
        let seconds = (Math.floor(elapsedTime/1000) % 60);
        let minutes = Math.floor(elapsedTime/60000);

        return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`
    }

    return (
        <div>
            <h1>Stop Watch</h1>
            <p className={styles.watch}>
                {formatTime()}
            </p><br />
            <button onClick={handleReset}>Reset</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStart}>Start</button>
        </div>
    );
}

export default StopWatch;