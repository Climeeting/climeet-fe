import { useAsync, useSearchParam } from 'react-use'
import { stringify } from '../../utils/query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function OauthPage() {
  const code = useSearchParam('code')
  const navigate = useNavigate()

  const getKakaoAccessToken = async (code: string) => {
    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        stringify({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT,
          code,
          client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
        })
      )
      console.log(res.data)

      return res.data.access_token
    } catch (err) {
      console.error(err)
    }
  }

  useAsync(async () => {
    if (!code) return
    const accessToken = await getKakaoAccessToken(code)
    console.log({ accessToken })
    navigate('/')
  }, [code])

  return (
    <>
      <h2>토큰 발급 중...</h2>
    </>
  )
}
