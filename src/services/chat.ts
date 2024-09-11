import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { PageData } from '@/pages/types/api'
import { stringify } from '@/utils/query'
import { queryClient } from '@/utils/tanstack'

export type ChatMessage = {
  messageType: 'CLIENT' | 'SERVER'
  id: number
  room: number
  senderId: number
  message: string
  createdAt: string
}

type GetChatRoomParams = {
  room: number
  page?: number
  size?: number
}

/**
 * GET /v1/chat/${room}
 */
export const get_chat_$room = async ({ room, page = 0, size = 30 }: GetChatRoomParams) => {
  return await api.get<PageData<ChatMessage>>(`/v1/chat/${room}?${stringify({ page, size })}`)
}

export const CHAT_ROOM_KEY = ['chat', 'room']

export const useChatRoomSuspense = (params: GetChatRoomParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: [...CHAT_ROOM_KEY, params.room],
    queryFn: ({ pageParam }) => get_chat_$room({ ...params, page: pageParam ?? params.page }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.totalPages <= lastPage.pageable.pageNumber ? null : lastPage.pageable.pageNumber + 1,
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
  })
}

export const ChatRoomQuery = {
  invalidate: async (params: GetChatRoomParams) =>
    await queryClient.invalidateQueries({
      queryKey: [...CHAT_ROOM_KEY, stringify(params)],
      refetchType: 'all',
    }),

  refetch: async (params: GetChatRoomParams) =>
    await queryClient.refetchQueries({
      queryKey: [...CHAT_ROOM_KEY, stringify(params)],
    }),
}
