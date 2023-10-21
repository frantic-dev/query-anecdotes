import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addAnecdote, getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const addVote = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })
      dispatch({
        type: 'SHOW',
        payload: `anecdote '${anecdote.content}' voted`,
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const handleVote = anecdote => {
    addVote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
