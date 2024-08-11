import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import HomePage from './Home/HomePage'
import LoginPage from './Login/LoginPage'
import OauthPage from './Oauth/OauthPage'
import NotFoundPage from './NotFoundPage'
import { PartySurveyFormPage } from './PartySurveyForm/PartySurveyFormPage'
import { PartyDetailPage } from './PartyDetailPage/PartyDetailPage'
import MyNewPage from './MyNewPage/MyNewPage'
import CheckIsLogin from '@/components/CheckIsLogin'
import UserPage from './UserPage/UserPage'
import MyUpdatePage from './MyUpdatePage/MyUpdatePage'
import CheckIsLogout from '@/components/CheckIsLogout'
import CheckAdditionalInfo from '@/components/CheckAdditionalInfo'
import ChatPage from '@/pages/ChatPage/ChatPage.tsx'
import ChatRoomPage from '@/pages/ChatRoomPage/ChatRoomPage.tsx'
import { PartyEditFormPage } from '@/pages/PartyEditFormPage/PartyEditFormPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="oauth" element={<OauthPage />} />
      <Route path="404" element={<NotFoundPage />} />
      <Route element={<CheckIsLogout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<CheckIsLogin />}>
        <Route path="/user/my" element={<UserPage />} />
        <Route path="/user/my/new" element={<MyNewPage />} />
        <Route path="/user/my/update" element={<MyUpdatePage />} />
        <Route element={<CheckAdditionalInfo />}>
          <Route path="party-suervey" element={<PartySurveyFormPage />} />
        </Route>
        <Route path="party-suervey/:id" element={<PartyEditFormPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatRoomPage />} />
      </Route>
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/party/:id" element={<PartyDetailPage />} />
    </Route>
  )
)

export default router
