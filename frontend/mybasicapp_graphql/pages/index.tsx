import Link from "next/link";

export default function Home(){
  return (
    <div>
      <h1>Welcome to the Task Management App</h1>
      <p>Use the navigation to view and manage your tasks.</p>
      <a href="/todo/tasks">
        <button>View All Tasks</button>
      </a>
    </div>
  );
}