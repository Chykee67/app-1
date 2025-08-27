'use client'

import { getUser } from '../lib/UserContext'

function Test(){



    const { user } = getUser();

    return (
        <div>
            <p>tester is: {user}</p>
        </div>
    )
}

export default Test