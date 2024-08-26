import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import api from '@/utils/api.ts'
import { PageData } from '@/pages/types/api.ts'

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
}

/**
 * GET /v1/notification
 */
export const get_notification = async ({ page }: { page: number }) => {
  try {
    const result = await api.get<PageData<GetNotificationResDTO>>(`/v1/notification?page=${page}&size=10`)
    return result
  } catch (e) {
    console.error(e)
    throw new Error('알림 조회에 실패하였습니다. get v1/notification')
  }
}

export const NOTIFICATION_KEY = ['notification']

export const useNotification = () => {
  return useSuspenseInfiniteQuery({
    queryKey: NOTIFICATION_KEY,
    queryFn: ({ pageParam }) => get_notification({ page: pageParam ?? 0 }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.totalPages <= lastPage.pageable.pageNumber ? null : lastPage.pageable.pageNumber + 1,
    retryOnMount: false,
    refetchOnWindowFocus: false,
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
