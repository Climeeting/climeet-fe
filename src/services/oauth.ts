import axios from 'axios'
import api from '../utils/api'
import { stringify } from '../utils/query'
import { MyProfileQuery } from './user'
import { useQuery } from '@tanstack/react-query'

export const post_oauth_login = async (accessToken: string) => {
  try {
    const result = await api.post('/v1/oauth/login', { accessToken })
    return result
  } catch (e) {
    console.error(e)
    throw new Error('로그인이 실패하였습니다. post v1/oauth/login')
  }
}

export const get_oauth_logout = async () => {
  try {
    const result = await api.get('/v1/oauth/logout')
    await MyProfileQuery.invalidate()
    return result
  } catch (e) {
    console.error(e)
    throw new Error('로그아웃이 실패하였습니다. post v1/oauth/logout')
  }
}

export const post_kakao_oauth_token = async (code: string) => {
  try {
    const res = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      stringify({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT,
        code,
        client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
      }),
    )

    return res.data.access_token
  } catch (err) {
    console.error(err)
  }
}

/**
 * GET /v1/user/token
 */
export const get_user_token = async () => {
  const result = await api.get<string>('/v1/user/token')
  return result
}

export const useGetUserToken = () => {
  return useQuery({
    queryKey: ['user_token'],
    queryFn: get_user_token,
  })
}

/**
 * DELETE /v1/user/withdraw
 */
export const delete_user_withdraw = async (reason: string) => {
  try {
    const result = await api.delete('/v1/user/withdraw', {
      data: {
        reason,
      },
    })
    await MyProfileQuery.invalidate()
    return result
  } catch (e) {
    console.error(e)
    throw new Error('회원탈퇴가 실패하였습니다. delete v1/user/withdraw')
  }
}
