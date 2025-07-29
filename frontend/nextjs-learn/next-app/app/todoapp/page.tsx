import Link from 'next/link';
import Hello from '../components/HelloButton';

const TodoApp = () => {
    return(
        <>
            <h1>
                Welcome User!
            </h1>
            <Link className="hover:underline" href="/todoapp/all-tasks">
                See all tasks
            </Link><br />

            <Link href="/todoapp/signin" className="hover:underline">Sign in here</Link><br />

            <Hello />
        </>
    )
}

export default TodoApp;