import { MyProfileQuery } from '@/services/user'
import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // 인증 만료 시 (403 에러) 재시도하지 않음
        if (isAxiosError(error) && error.response?.status === 403) {
          MyProfileQuery.logout()
          return false
        }
        // 그 외의 경우, 실패 횟수가 3번 미만일 때만 재시도
        return failureCount < 3
      },
    },
  },
})
