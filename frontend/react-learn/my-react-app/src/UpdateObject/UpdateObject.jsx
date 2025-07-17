import { useState } from 'react';

function UpdateObject(){
    const [obj, setObj] = useState({ name: "John", age: 30 });

    return (
        <div>
            <label>
                Update Name:
                <input
                    type="text"
                    value={obj.name}
                    onChange={(e) => setObj({ ...obj, name: e.target.value })}
                />
            </label>
            <h1>Name: {obj.name}</h1>

            <label>
                Update Age:
                <input
                    type="number"
                    value={obj.age}
                    onChange={(e) => setObj({ ...obj, age: e.target.value })}
                />
            </label>
            <h2>Age: {obj.age} years</h2>
        </div>
    );
}

export default UpdateObject;