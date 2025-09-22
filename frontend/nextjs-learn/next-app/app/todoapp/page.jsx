'use client';

import { useProfile } from './layout';

function TodoApp () {

    const { username } = useProfile();

    return (
        <div>
            <h1 className="font-bold text-black text-2xl">Welcome {username}!</h1>
        </div>
        
    );
}

export default TodoApp;