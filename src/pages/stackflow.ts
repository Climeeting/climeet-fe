import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import LoginPage from './Login/LoginPage'
import HomePage from './Home/HomePage'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'
import OauthPage from './Oauth/OauthPage'
import NotFoundPage from './NotFoundPage/NotFoundPage.tsx'
import { PartyDetailPage } from './PartyDetailPage/PartyDetailPage'
import { PartySurveyFormPage } from './PartySurveyForm/PartySurveyFormPage.tsx'

const activities = {
  HomePage,
  LoginPage,
  OauthPage,
  NotFoundPage,
  PartyDetailPage,
  PartySurveyFormPage,
}
export type ActivityKey = keyof typeof activities

export const { Stack, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
        /**
         * You can link the registered activity with the URL template.
         */
        HomePage: '/',
        LoginPage: '/login',
        NotFoundPage: '/404',
        OauthPage: '/oauth',
        MyPage: '/mypage',
        PartyDetailPage: '/party/:id',
        PartySurveyFormPage: '/party-survey',
      },
      /**
       * If a URL that does not correspond to the URL template is given, it moves to the `fallbackActivity`.
       */
      fallbackActivity: () => 'NotFoundPage',
      /**
       * Uses the hash portion of the URL (i.e. window.location.hash)
       */
      useHash: false,
    }),
  ],
  activities,
  initialActivity: () => 'HomePage',
})
