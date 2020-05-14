import React from 'react'

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
      {/* <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} /> */}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((s, p) => { return s + p })

  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course