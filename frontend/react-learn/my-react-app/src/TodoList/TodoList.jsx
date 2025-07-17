import { useState } from 'react';
import styles from './TodoList.module.css';

function TodoList(){
    const [todos, setTodos] = useState([]);

    //create states for the various input fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [status, setStatus] = useState('Pending');

    return (
        <div className={styles.todoList}>
            <h1>Todo List</h1>
            <ul>
                {todos.map(
                    (todo, index) => (
                        <li key={index}>
                            <p className={styles.todoItem}>{todo.title} - {todo.due}</p>
                        </li>
                    )
                )}
            </ul>
            <h2>Add Todo</h2>
            <input
                className={styles.titleInput}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br/><br/>

            <textarea
                className={styles.descriptionInput}
                rows="4"
                cols="50"
                maxLength="200"
                wrap="soft"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br/><br/>

            <label>
                <input
                    className={styles.dueInput}
                    type="datetime-local"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                />
            </label><br/><br/>
            <label>
                Priority
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
            </label><br/><br/>
            <label>
                Status
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </label><br/><br/>
            <button
                onClick={() => {
                    setTodos([
                        ...todos,
                        {
                            "title": title,
                            "description": description,
                            "due": due,
                            "priority": priority,
                            "status": status
                        }
                    ]);
                    setTitle('');
                    setDescription('');
                    setDue('');
                    setPriority('Normal');
                    setStatus('Pending');
                }}
            >
                Add Todo
            </button>
        </div>
    )
}

export default TodoList;