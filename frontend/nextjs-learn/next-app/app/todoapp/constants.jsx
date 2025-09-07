'use client'

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { usePathname } from 'next/navigation';

export function LOGIN_AREA({ User }) {

    const path = usePathname();

    const { signOut } = useAuth();

    if (path === '/todoapp/signin'){
        return null;
    }else{
        if (User && User !== "Anonymous") {
            return <button onClick={signOut}>Sign Out</button>
        } else {
            return null
        }
    }
}

export function SITE_BANNER() {
    return (
        <div className="bg-gray-700 text-white p-4">
            <h1 className="text-2xl font-bold">My Todo App</h1>
        </div>
    );
}

export function NAVIGATION_BAR({ User }) {

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
                    {User && User !== "Anonymous" ? (
                        <ACCOUNT_AREA User={ User }/>
                    ) : (
                        <a href="/todoapp/signin" className="text-gray-700 hover:underline">Sign In</a>
                    )}
                </li>
                <li>
                    {User && User === "Anonymous"?(
                        <a href="/todoapp/signup" className="text-gray-700 hover:underline">Sign Up</a>
                    ): (
                        <></>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export function ACCOUNT_AREA({ User }){

    const path = usePathname()

    const [isOpen, setIsOpen] = useState(false);

    const toggledown = () => {
        setIsOpen(true);
    }

    const toggleup = () => {
        setIsOpen(false);
    }

    if (path === '/todoapp/signin'){
        return null;
    }else{
        return (
            <div onMouseOver={toggledown} onMouseLeave={toggleup}>
                <button className="text-gray-700 hover:underline">Account</button>
                {isOpen && (
                    <ul>
                        <li><a href="/todoapp/profile" className="text-gray-700 hover:underline">Profile</a></li>
                        <li>
                            <span className="text-gray-700"><LOGIN_AREA User={User}/></span>
                        </li>
                    </ul>
                )}
            </div>
        )
    }
}
