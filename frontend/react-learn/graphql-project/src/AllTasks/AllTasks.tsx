import { useQuery, gql } from '@apollo/client'


const GET_ALL_TASKS = gql`
  query MyQuery{
      allTasks{
        edges{
          node{
            id
            title
            description
          }
        }
      }
    }
`

function DisplayTasks(){
  const {loading, error, data} = useQuery(GET_ALL_TASKS)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  return data.allTasks.edges.map(task => (
    <div key={task.node.id}>
      <p>Title: {task.node.title}</p>
      <p>Description: {task.node.description}</p>
    </div>
  ))
}

export default DisplayTasks