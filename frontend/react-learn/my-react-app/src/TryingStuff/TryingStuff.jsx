import { useState, useEffect } from 'react';

function TryingStuff(){
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        console.log('Event listener added');
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log('Event listener removed');
        };
    }, [width]);

    

    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    return (
        <div>
            <h2>Window Width: {width}px</h2>
            <h2>Window Height: {height}px</h2>
        </div>
    )
}

export default TryingStuff;
