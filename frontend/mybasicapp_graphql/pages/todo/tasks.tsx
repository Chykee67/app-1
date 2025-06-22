import { gql } from "@apollo/client";
import createApolloClient from "../api/apollo-client";

type Task = {
  id: string;
  title: string;
  description: string;
  due: string;
  status: string;
  priority: string;
  created: string;
};

type AllTasksProps = {
  tasks: Task[];
};

type Edge = {
  node: Task;
};

export default function AllTasks({ tasks }: AllTasksProps) {
  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <h2>Title: {task.title}</h2>
            <p>Description: {task.description}</p>
            <p>Due: {task.due}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query Tasks {
        allTasks{
          edges{
            node{
              id
              title
              description
              due
              status
              priority
              created
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      tasks: (data.allTasks.edges as Edge[]).map((edge) => edge.node),
    },
  };
}