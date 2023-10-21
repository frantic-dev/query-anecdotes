import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdote = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      })
    },
  })

  const onCreate = event => {
    event.preventDefault()
    let content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content === '') content = 'a default note'
    newAnecdote.mutate({ content, votes: 0 })
    dispatch({ type: 'SHOW', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, 5000)
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
