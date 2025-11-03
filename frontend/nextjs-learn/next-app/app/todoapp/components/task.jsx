"use client";

import { useState, useEffect, useRef } from "react";

export default function TaskBrief({title, due}) {
    const dueDate = new Date(due);
    const now = new Date();
    const [timeRemaining, setTimeRemaining] = useState(null);

    const timeRef = useRef(dueDate - now);

    const formatTimeRemaining = (milliseconds) => {
        if (milliseconds <= 0) {
            return "Past due";
        }
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Force re-render to update time remaining
            setTimeRemaining(timeRef.current = dueDate - new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [timeRef.current]);

    return (
        <div className="task-brief">
            <p>{title}</p>
            <p>Due: {dueDate.toString()}</p>
            <p>Time Remaining: {formatTimeRemaining(timeRemaining)}</p>
        </div>
    );
}