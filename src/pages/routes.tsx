import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import HomePage from './Home/HomePage'
import LoginPage from './Login/LoginPage'
import OauthPage from './Oauth/OauthPage'
import NotFoundPage from './NotFoundPage'
import MyPage from './MyPage/MyPage'
import { PartySurveyFormPage } from './PartySurveyForm/PartySurveyFormPage'
import { PartyDetailPage } from './PartyDetailPage/PartyDetailPage'
import MyInfoFormPage from './MyInfoFormPage/MyInfoFormPage'
import CheckIsLogin from '@/components/CheckIsLogin'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="oauth" element={<OauthPage />} />
      <Route path="404" element={<NotFoundPage />} />
      <Route
        path="mypage"
        element={
          <CheckIsLogin>
            <MyPage />
          </CheckIsLogin>
        }
      />
      <Route path="mypage/new" element={<MyInfoFormPage />} />
      <Route path="/party/:id" element={<PartyDetailPage />} />
      <Route path="party-suervey" element={<PartySurveyFormPage />} />
      <Route path="party-suervey/:id" element={<PartySurveyFormPage />} />
    </Route>
  )
)

export default router
