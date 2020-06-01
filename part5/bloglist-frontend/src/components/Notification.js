import React from 'react'
import './Notification.css'

const Notification = ({ message, success }) => {
  if (message === null) {
    return (null)
  }
  return (
    <div id='notification' className={success ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification