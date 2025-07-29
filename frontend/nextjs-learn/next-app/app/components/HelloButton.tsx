'use client';

const Hello = () => {
    return (
        <button onClick={() => {alert("Hello there!")}}
            className="bg-gray-700 rounded-full hover:cursor-pointer
                font-bold font-sans
                border-2 border-green-500
                text-white"
        >
            Say Hello
        </button>
    )
}

export default Hello;