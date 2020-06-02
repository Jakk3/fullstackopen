import anecdoteService from '../services/anecdotes'

export const addVote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: {
      anecdotes
    }
  }
}

const sortAnecdotes = (anecdotes) => {
  const compare = (a, b) => {
    if (a.votes > b.votes)
      return -1
    if (a.votes < b.votes)
      return 1

    return 0
  }
  anecdotes = anecdotes.sort(compare)
  return anecdotes
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      let anecdotesToSort = state.map(a => a.id !== action.data.id ? a : action.data)
      return sortAnecdotes(anecdotesToSort)
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data.anecdotes)
    default:
      return state
  }
}

export default reducer