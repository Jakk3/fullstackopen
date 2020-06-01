const notificationAtStart = 'I am a notification, boi'

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const reducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'REMOVE_NOTIFICATION':
      return notificationAtStart
    default:
      return state
  }
}

export default reducer