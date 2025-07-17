import { useState } from 'react';

function UpdateArray(){
    const [cars, setCars] = useState([]);

    function handleAddCar(newCar){
        setCars(prevCars => [...prevCars, newCar]);
        document.getElementById("carInput").value = "";

    }

    function handleRemoveCar(index){
        setCars(prevCars => prevCars.filter((car, i) => i !== index));
    }

    return (
        <div>
            <h1>Car List</h1>
            <ul>
                {cars.map(
                    (car, index) => (
                        <li key={index}>
                            {car}
                            <button onClick={() => handleRemoveCar(index)}>Remove</button>
                        </li>
                    )
                )}
            </ul>
            <input id="carInput" type="text" placeholder="Add a car" autofocus="true"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddCar(e.target.value);
                    }
                }}
            />

        </div>
    );
}

export default UpdateArray;