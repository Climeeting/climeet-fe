import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import HomePage from './Home/HomePage'
import LoginPage from './Login/LoginPage'
import OauthPage from './Oauth/Oauth'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      //   errorElement={<ErrorPage />}
    >
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="oauth" element={<OauthPage />} />
    </Route>
  )
)

export default router
