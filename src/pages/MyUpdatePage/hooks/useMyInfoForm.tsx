import { MyProfile } from '@/pages/types/api'
import { MyProfileBe2FeAdpter, MyProfileInfo } from '@/services/user'
import useFormValue from '@/utils/useFormValue'
import { PropsWithChildren, createContext, useContext } from 'react'

function useMyInfoForm(data?: MyProfile) {
  const myData = data ? new MyProfileBe2FeAdpter(data).adapt() : null

  const [nickname, setNickName] = useFormValue<string>(myData?.nickname ?? '')
  const [sex, setSex] = useFormValue<MyProfileInfo['sex']>(myData?.sex ?? '남자')
  const [skillLevel, setSkillLevel] = useFormValue<MyProfileInfo['skillLevel']>(
    myData?.skillLevel ?? 'BLACK'
  )
  const [description, setDescription] = useFormValue<MyProfileInfo['description'] | ''>(
    myData?.description ?? ''
  )
  const [profileImageUrl, setProfileImageUrl] = useFormValue<string>(myData?.profileImageUrl ?? '')

  const states = {
    nickname,
    sex,
    skillLevel,
    description,
    profileImageUrl,
  }

  const actions = {
    setNickName,
    setSex,
    setSkillLevel,
    setDescription,
    setProfileImageUrl,
  }

  return { states, actions }
}

const MyInfoFormContext = createContext<MyProfileInfo>({
  description: '',
  nickname: '',
  profileImageUrl: '',
  sex: '남자',
  skillLevel: 'BLACK',
})

const ActionsContext = createContext<{
  setNickName: (name: string) => void
  setSex: (sex: MyProfileInfo['sex']) => void
  setSkillLevel: (skill: MyProfileInfo['skillLevel']) => void
  setDescription: (description: MyProfileInfo['description']) => void
  setProfileImageUrl: (url: string) => void
}>({
  setNickName: () => {},
  setSex: () => {},
  setSkillLevel: () => {},
  setDescription: () => {},
  setProfileImageUrl: () => {},
})

export function MyInfoFormProvider({ data, children }: { data?: MyProfile } & PropsWithChildren) {
  const { states, actions } = useMyInfoForm(data)

  return (
    <MyInfoFormContext.Provider value={states}>
      <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
    </MyInfoFormContext.Provider>
  )
}

export const useMyInfoFormContext = () => {
  return useContext(MyInfoFormContext)
}

export const useMyInfoFormActions = () => {
  return useContext(ActionsContext)
}
