import { useQuery, gql } from "@apollo/client";

import styles from '../todoapp.module.css';


interface Node {
    id: Number;
    title: string;
    description: string;
}

interface Edge {
    node: Node;
}

export const revalidate = 5;
const GET_ALL_TASKS = gql`query MyQuery {
        allTasks {
            edges{
                node{
                    id
                    title
                    description
                }
            }
        }
    }`;

export default async function Page() {
    const { data, loading, error } = useQuery(GET_ALL_TASKS)

    if (error) return <p>ErrorMessage: {error.message}</p>

    const tasks = data.allTasks.edges

    console.log(tasks)

    return (
    <div className={styles.listContainer}>
        <h1 className={styles.header}>Tasks</h1>
        <ol className={styles.list}>
            {tasks.map((task: Edge) => (
                <li key={task.node.id} className={styles.task}>
                    <span className="font-bold">{task.node.title}</span>: {task.node.description}
                </li>
            ))}
        </ol>
    </div>
)
}