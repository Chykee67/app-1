'use client'

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';

export function SITE_BANNER() {
    return (
        <div className="bg-gray-700 text-white p-4">
            <h1 className="text-2xl font-bold">
                <a href="/todoapp">My Todo App</a>
            </h1>
        </div>
    );
}

export function NAVIGATION_BAR() {

    return (
        <nav className="bg-gray-200 p-4 font-bold">
            <ul className="flex space-x-4">
                <li>
                    <a href="/todoapp" className="text-gray-700 hover:underline">Home</a>
                </li>
                <li>
                    <a href="/todoapp/all-tasks" className="text-gray-700 hover:underline">All Tasks</a>
                </li>
                <li>
                    <a href="/todoapp/add-task" className="text-gray-700 hover:underline">Add Task</a>
                </li>
                <li>
                    <ACCOUNT_AREA />
                </li>
            </ul>
        </nav>
    );
}

export function ACCOUNT_AREA(){

    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useAuth();

    const handleClick = () => {
        signOut();
    }

    const toggledown = () => {
        setIsOpen(true);
    }

    const toggleup = () => {
        setIsOpen(false);
    }

    return (
        <div onMouseOver={toggledown} onMouseLeave={toggleup} className="text-gray-700 hover:underline">
            <button>Account</button>
            {isOpen && (
                <ul>
                    <li><a href="/todoapp/profile">Profile</a></li>
                    <li>
                        <button onClick={handleClick}>Sign Out</button>
                    </li>
                </ul>
            )}
        </div>
    )
}

//to be continued…
