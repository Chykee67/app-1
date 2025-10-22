'use client';
import { useState, useRef } from 'react'
export default function Card(){

    const [cardTitle, setCardTitle] = useState('New card');
    
    const [cardItems, setCardItems] = useState([]);

    const titleRef = useRef(null);
    const itemRef = useRef([]);

    const handleAddTitle = (e) => {
        setCardTitle(e.target.value);
        e.target.value = '';
    }

    const handleAddItem = (e) => {
        itemRef.current = [...itemRef.current, e.target.value];
        setCardItems(itemRef.current);
        e.target.value = '';
    }

    const handleRemoveItem = (e) => {
        itemRef.current = itemRef.current.filter((item) => item !== e.target.innerText);
        setCardItems(itemRef.current);
    }
    return (
        <div className="border-2 border-fuchsia-900 rounded-lg p-4 m-4 w-60">
            <div id="card-content" className="border-orange-700 border-2 p-2 inline-block">
                <p className='text-bold text-lg'>Table: {cardTitle}</p>
                <ul className='list-disc pl-5 rounded-lg'>
                    {cardItems.map((item, index) => (
                        <li key={index} className='hover:text-red-700' onClick={handleRemoveItem}>{item}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input type='text' placeholder='Edit title' id='cardTitle' name='cardTitle' onKeyDown={(e) => e.key === 'Enter' && handleAddTitle(e)} />
                <br />
                <input type='text' id='cardItem' name='cardItem' onKeyDown={(e) => e.key === 'Enter' && handleAddItem(e)} placeholder="Add Item" />
            </div>
        </div>
    )
}