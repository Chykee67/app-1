import { useRef, useEffect } from 'react';

function Reffing(){

    const buttonRef = useRef();

    useEffect(() => {
        console.log('Component Rendered!');
    })

    function handleClick(){
        console.log(buttonRef);
        buttonRef.current.previousElementSibling.focus();
    }
    return (
        <div>
            <input type="text" />
            <button onClick={handleClick} ref={buttonRef}>
                Click me
            </button>
        </div>
    );
}

export default Reffing;