import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (!notification) style.display = 'none'

  return <div style={style}>{notification}</div>
}

export default Notification
