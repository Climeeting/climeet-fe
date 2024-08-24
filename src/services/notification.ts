import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import api from '@/utils/api.ts'

export type NotificationType = 'CHAT' | 'PARTY'

export type GetNotificationResDTO = {
  createdAt: string
  updatedAt: string
  id: number
  userId: number
  message: string
  notificationType: NotificationType
  thumbnail: string
  notificationTitle: string
  referenceId: number
  isRead: boolean
}[]

/**
 * GET /v1/notification
 */
export const get_notification = async () => {
  try {
    const result = await api.get<GetNotificationResDTO>(`/v1/notification`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('알림 조회에 실패하였습니다. get v1/notification')
  }
}

export const NOTIFICATION_KEY = ['notification']

export const useNotification = () => {
  return useQuery({
    queryKey: NOTIFICATION_KEY,
    queryFn: get_notification,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    // 30초마다 새로고침
    refetchInterval: 30 * 1000,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response && error.response.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}

/**
 * POST /v1/notification/mark-as-read/all
 */
export const post_notification_mark_as_read_all = async () => {
  try {
    await api.post(`/v1/notification/mark-as-read/all`)
  } catch (e) {
    console.error(e)
  }
}
