import { GET_ALL_TASKS } from '../queries';
import { getClient } from '../../lib/ApolloClient';

import styles from '../todoapp.module.css';


export default async function Page() {
    const { data } = await getClient().query({
        query: GET_ALL_TASKS,
    });

    const tasks = data.allTasks.edges

    return (
    <div className={styles.listContainer}>
        <h1 className={styles.header}>Tasks</h1>
        <ol className={styles.list}>
            {tasks.map((task) => (
                <li key={task.node.id} className={styles.task}>
                    <span className="font-bold">{task.node.title}</span>: {task.node.description}
                </li>
            ))}
        </ol>
    </div>
)
}