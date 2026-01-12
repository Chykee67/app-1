"use client";

import { use } from 'react';

import TaskDetailed from "@/app/todoapp/components/taskDetails";
import { GET_TASK_DETAILS } from "@/app/todoapp/queries";
import { useQuery } from "@apollo/client/react"

export default function TaskDetails({ params }){
    const { taskTitle } = use(params);
    const titleEd = taskTitle.replace(/%20/g, " ")

    const { data, loading, error } = useQuery(GET_TASK_DETAILS, {
        variables: { title: titleEd }
    })

    console.log(data)

    if(error) <p>Error loading task details.</p>;
    if(loading) <p>Loading...</p>;

    if(data){
        const task = data.allTasks.edges[0]

        return (
            <div>
                <TaskDetailed
                    title={titleEd}
                    description={task.node.description}
                    due={task.node.due}
                    status={task.node.status}
                />
            </div>
        )
    }
    
}