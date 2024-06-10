import { useAsync, useSearchParam } from 'react-use'
import { post_kakao_oauth_token, post_oauth_login } from '@/services/oauth'
import { useFlow } from '../stackflow'
import Spinner from '@/components/Spinner'
import styles from './OauthPage.module.scss'

export default function OauthPage() {
  const code = useSearchParam('code')
  const { replace } = useFlow()

  useAsync(async () => {
    if (!code) return

    // 1. 카카오톡 토큰 받기
    const accessToken = await post_kakao_oauth_token(code)
    // 2. 로그인 요청
    await post_oauth_login(accessToken)

    replace('HomePage', {})
  }, [code])

  return (
    <div className={styles.Container}>
      <Spinner />
    </div>
  )
}
