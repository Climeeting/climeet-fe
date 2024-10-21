import { Link } from 'react-router-dom'
import Icon from '@/components/Icon/Icon.tsx'
import { useNotification } from '@/services/notification.ts'

function NotificationButton () {
  const { data } = useNotification()
  const isAlarmsExist = data.pages.some(notificationList => (
    notificationList.content.some((notification) => {
      return !notification.isRead
    })
  ))

  return (
    <Link to='/notification'>
      <Icon icon={isAlarmsExist ? 'AlarmNew' : 'Alarm'} />
    </Link>
  )
}

export default NotificationButton
