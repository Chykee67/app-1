"use client"

import { makeClient } from "../../../app/lib/ApolloWrapper"
import { CREATE_TASK } from '../mutations';
import { useState } from "react";

export default function (){

    const client = makeClient()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due: "",
        priority: "normal"
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "due" ? new Date(value).toISOString() : value
        }));
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        (async () => {
            const { data, error } = await client.mutate({
                mutation: CREATE_TASK,
                variables: {
                    title: formData.title,
                    description: formData.description,
                    due: formData.due,
                    priority: formData.priority,
                }
            });

            if (error) {
                setError(error.message);
            }

            if (data) {
                setSuccess("Task added successfully!");
                setError(null);
            }
        })();
    }

    return(
        <div>
            <h1 className="text-2xl mb-5">Add Task</h1>
            <div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form onChange={handleChange} onSubmit={handleAddTask} className="mb-3 in-line-block">
                    <input type="text" id="title" name="title" placeholder="Title"
                        className="border-2 border-gray-400 rounded-lg mb-2"
                    /><br />
                    <textarea id="description" name="description" placeholder="Description"
                        className="border-2 border-gray-400 rounded-lg mb-2"
                    /><br />
                    <label htmlFor="due" className="mr-1">Due:</label><br />
                    <input type="datetime-local" id="due" name="due" placeholder="due"
                        className="border-2 border-gray-400 rounded-lg mb-2"
                    /><br />
                    <label htmlFor="priority" className="mr-1">Priority</label>
                    <select id="priority" name="priority" defaultValue="normal"
                        className="border-2 border-gray-400 rounded-lg mb-2"
                    >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select><br />
                    <button type="submit" className="mt-1 hover:text-rose-500">Add Task</button>
                </form>
            </div>
        </div>
    )
}