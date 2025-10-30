"use client";
import { useState } from "react";
import { makeClient } from "@/lib/apollo/ApolloWrapper";
import { DELETE_CARD } from "../mutations/cardMutations";
import { DELETE_ITEM, CREATE_ITEM } from "../mutations/itemMutation";

export default function SavedCard({title, items}){

    const [addItemError, setAddItemError] = useState(null);

    const client = makeClient()

    const handleRemoveItem = (e) =>{
        (async () => {
            await client.mutate({
                mutation: DELETE_ITEM,
                variables: { title: e.target.textContent, card: title },
            })
            window.location.reload();
        })();
    }

    const handleAddItem = (e) =>{
        (async () =>{
            try{
                await client.mutate({
                    mutation: CREATE_ITEM,
                    variables: { title: e.target.value.toLowerCase(), card: title },
                })
                window.location.reload();
            } catch (error) {
                setAddItemError(error.message);
                e.target.value = '';
            }
        })();
    }
    
    const handleDeleteCard = (e) =>{
        (async () => {
            await client.mutate({
                mutation: DELETE_CARD,
                variables: { title: title },
            })
            window.location.reload();
        })();
    }

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
                {addItemError && <p className="text-red-500">{addItemError}</p>}
                <button onClick={handleDeleteCard}
                    className="ml-1.5 mt-1.5 hover:text-red-500"
                >
                    Delete Card
                </button>
            </div>
        </div>
    )
}