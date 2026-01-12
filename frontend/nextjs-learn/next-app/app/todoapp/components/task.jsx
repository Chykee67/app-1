"use client";

import { DELETE_TASK, UPDATE_TASK_STATUS } from "../mutations";
import { makeClient } from "@/app/lib/ApolloWrapper";

export default function TaskBrief({title, due, status}) {

    const dueDate = new Date(due);
    
    const client = makeClient()

    const handleDelete = () => {
        (async () => {
            await client.mutate({
                mutation: DELETE_TASK,
                variables: { title: title }
            })
            window.location.reload();
        })();
    }

    const handleDetails = () => {
        window.open(
            `/todoapp/task-details/${title}`,
            "mypopup",
            "width=500,height=400,resizable=yes,scrollbars=yes",
        );
    }

    const updateStatus = () => {
        (async () => {
            await client.mutate({
                mutation: UPDATE_TASK_STATUS,
                variables: { title: title, status: status === "pending" ? "completed" : "pending" }
            })
            window.location.reload();
        })();
    }

    return (
        <div className="inline-block">
            <p className="text-black font-bold font-sans">
                <span>{title.toUpperCase()}</span>
                <button className="ml-7 hover:text-rose-700" onClick={handleDetails}>details</button>
                <button className="ml-7 hover:text-rose-700" onClick={handleDelete}>delete</button>
            </p>
            <p className="text-gray-700 font-bold font-serif">Due: {dueDate.toString()}</p>
            <p className="font-bold font-serif text-gray-700">Time Left:
                {dueDate - new Date() <= 0 ? " Past due" : ` ${Math.floor((dueDate - new Date()) / 1000 / 60 / 60 / 24)} days
                ${Math.floor((dueDate - new Date()) / 1000 / 60 / 60 % 24)} hours till due`
                }
            </p>
            <div>
                {status === "pending" &&
                    <button
                        className="font-sans font-bold hover:text-rose-700"
                        onClick={updateStatus}
                    >
                        Mark as Completed
                    </button>
                }
            </div>
        </div>
    );
}