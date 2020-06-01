const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0
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

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action.type)

  switch (action.type) {
    case 'ADD_VOTE':
      const anecdoteToVote = state.find(a => a.id === action.data.id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      let anecdotesToSort = state.map(a => a.id !== action.data.id ? a : votedAnecdote)
      return sortAnecdotes(anecdotesToSort)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    default:
      return state
  }
}

export default reducer