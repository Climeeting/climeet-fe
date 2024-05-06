export default function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT}`

  return (
    <button onClick={() => window.location.replace(`${KAKAO_AUTH_URL}`)}>
      카카오로 로그인하기
    </button>
  )
}
