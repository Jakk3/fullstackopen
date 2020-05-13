import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleEvent, text }) => <button onClick={handleEvent}>{text}</button>

const Best = ({ top, anecdotes }) => (
  <>
    <h1>anecdote with the most points</h1>
    <p>{anecdotes[top]}</p>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const copy = { ...points }

  const [max, setMax] = useState(0)
  const [top, setTop] = useState(0)

  const selectAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  const vote = () => {
    // instead of modifying the points array, which is not allowed, modify a copy of the array, and update the state of the points array
    copy[selected]++
    setPoints(copy)
    // if the voted item gets more points than last top scorer, make it a new top scorer
    if (copy[selected] > max) {
      setMax(copy[selected])
      setTop(selected)
    }
  }
  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handleEvent={vote} text="vote" />
      <Button handleEvent={selectAnecdote} text="New Anecdote" />

      <Best top={top} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)