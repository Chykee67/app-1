"use client"

import { makeClient } from "../../../app/lib/ApolloWrapper"
import { CREATE_TASK } from '../mutations';
import { useState } from "react";

export default function (){

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due: "",
        priority: "Normal"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        (async () => {
            const client = makeClient()
            await client.mutate({
                mutation: CREATE_TASK,
                variables: {
                    title: formData.title,
                    description: formData.description,
                    due: formData.due,
                    priority: formData.priority,
                }
            });
        })();
    }

    return(
        <div>
            <h1>Add Task</h1>
            <div>
                <form onChange={handleChange} onSubmit={handleAddTask}>
                    <input type="text" id="title" name="title" placeholder="Title"
                        className=""
                    /><br />
                    <textarea id="description" name="description" placeholder="Description"
                        className=""
                    /><br />
                    <input type="datetime" id="due" name="due" placeholder="due"
                        className=""
                    /><br />
                    <label htmlFor="priority" className="mr-1">Priority</label>
                    <select id="priority" name="priority" defaultValue="Normal">
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                    </select><br />
                    <button type="submit" className="mt-1">Add Task</button>
                </form>
            </div>
        </div>
    )
}