import {useState} from 'react';
import styles from './Hooks.module.css';

export function Hooks(){
    const [count, setCount] = useState(0);

    return (
        <div className={styles.hooks}>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(0)}>
                Reset
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
        </div>
    );
}