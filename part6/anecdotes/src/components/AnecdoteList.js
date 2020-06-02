import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.addVote(id)
    const anecdote = props.anecdotes.find(anecdote => id === anecdote.id)
    props.setNotification(`you voted ${anecdote.content}`, 3)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter
  }
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdotes