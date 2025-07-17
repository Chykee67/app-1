import Link from "next/link";
import Form from "next/form";

export default function Home(){
  return (
    <div>
      <h1>Welcome to the Task Management App</h1>
      <p>Use the navigation to view and manage your tasks.</p>
      <Form action="/todo/tasks">
        <input name="query" />
        <p><button type="submit">Submit</button></p>
      </Form>

      <a href="/todo/tasks">
        <button>View All Tasks</button>
      </a>
    </div>
  );
}