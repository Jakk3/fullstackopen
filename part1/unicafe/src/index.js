import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ value, text }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  // calculate total, average and positive statistics
  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = good / total + " %"

  if (total > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Display value={good} text="Good" />
            <Display value={neutral} text="Neutral" />
            <Display value={bad} text="Bad" />

            <Display value={total} text="all" />
            <Display value={average} text="average" />
            <Display value={positive} text="positive" />
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <p>no feedback given</p>
    )
  }

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // button events
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback, thanks</h1>
      <Button handleClick={addGood} text="Good" />
      <Button handleClick={addNeutral} text="Neutral" />
      <Button handleClick={addBad} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)