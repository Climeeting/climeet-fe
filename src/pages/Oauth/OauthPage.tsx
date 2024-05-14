import { useAsync, useSearchParam } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { get_user_myProfile, post_kakao_oauth_token, post_oauth_login } from './hooks/api'

export default function OauthPage() {
  const code = useSearchParam('code')
  const navigate = useNavigate()

  useAsync(async () => {
    if (!code) return

    // 1. 카카오톡 토큰 받기
    const accessToken = await post_kakao_oauth_token(code)
    // 2. 로그인 요청
    await post_oauth_login(accessToken)
    // 3. 유저 정보 요청
    const data = await get_user_myProfile()
    console.log({ data })

    navigate('/')
  }, [code])

  return (
    <>
      <h2>토큰 발급 중...</h2>
    </>
  )
}
