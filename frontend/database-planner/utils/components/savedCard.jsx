"use client";

import { useState, useRef } from "react";

export default function SavedCard({title, items}){

    const handleRemoveItem = (e) =>{}
    const handleAddItem = (e) =>{}
    const handleUpdateCard = (e) =>{}
    const handleDeleteCard = (e) =>{}
    return (
        <div className="border-fuchsia-500 border-2 p-2 inline-block rounded-lg">
            <div>
                <p className='text-bold text-lg'>{title}</p><br />
                <ul className='list-disc pl-5 rounded-lg'>
                    {items.map((item, index) => (
                        <li key={index} onClick={handleRemoveItem}
                            className="hover:text-red-500"
                        >
                            {item.node.title}
                        </li>
                    ))}
                </ul><br />
                <input type="text" placeholder="Add Item" name="cardItem" id="cardItem"
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem(e)}
                    className="border border-gray-300 rounded-md p-2"
                /><br />
                <button onClick={handleUpdateCard}
                    className="mr-1.5 hover:text-red-500"
                >
                    Update
                </button>
                <button onClick={handleDeleteCard}
                    className="ml-1.5 hover:text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}