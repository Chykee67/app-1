"use client";

import { useQuery } from "@apollo/client/react";

import { GET_ALL_TASKS } from "../queries";

import TaskBrief from "../components/task";

export default function AllTasks(){

    const { loading, error, data } = useQuery(GET_ALL_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if(data){
        const tasks = data.allTasks.edges
        
        return(
            <>
                <div>
                    <h1 className="font-bold text-gray-700 text-2xl m-2">All Tasks</h1>
                </div>
                <div>
                    <ol className="pl-2">
                        {tasks.map((task, index) => (
                            <li key={index} className="mt-3">
                                <TaskBrief
                                    title={task.node.title}
                                    due={task.node.due}
                                    status={task.node.status.toLowerCase()}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </>
        )
    }

}