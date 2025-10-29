'use client';

import { useState, useRef } from 'react'
import { makeClient } from '@/lib/apollo/ApolloWrapper';
import { CREATE_CARD } from '../mutations/cardMutations';
import { CREATE_ITEM } from '../mutations/itemMutation';

export default function Card(){

    const [cardTitle, setCardTitle] = useState('New card');
    
    const [cardItems, setCardItems] = useState([]);

    const client = makeClient();

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

    const handleSaveCard = (e) => {
        (async () => {
            await client.mutate({
                mutation: CREATE_CARD,
                variables: { title: cardTitle}
            })

            for(let i=0; i<cardItems.length; i++){
                await client.mutate({
                    mutation: CREATE_ITEM,
                    variables: { title: cardItems[i], card: cardTitle}
                })
            }

            setCardTitle('New Card')
            setCardItems([])

            window.location.reload();
        })();
    }

    const handleRemoveItem = (e) => {
        itemRef.current = itemRef.current.filter((item) => item !== e.target.innerText);
        setCardItems(itemRef.current);
    }
    return (
        <div className="border-2 border-fuchsia-900 rounded-lg p-4 m-4 w-60">
            <div id="card-content" className="">
                <p className='text-bold text-lg'>{cardTitle}</p>
                <ul className='list-disc pl-5 rounded-lg'>
                    {cardItems.map((item, index) => (
                        <li key={index} className='hover:text-red-700' onClick={handleRemoveItem}>{item}
                        </li>
                    ))}
                </ul><br />
                <input type='text' placeholder='Edit title' id='cardTitle' name='cardTitle'
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTitle(e)}
                    className="border border-gray-300 rounded-md p-2 m-0.5"
                />
                <br />
                <input type='text' id='cardItem' name='cardItem'
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem(e)} placeholder="Add Item"
                    className="border border-gray-300 rounded-md p-2 m-0.5"
                />
                <button className='hover:text-rose-700 text-bold m-0.5'
                    onClick={handleSaveCard}
                >Save</button>
            </div>
        </div>
    )
}