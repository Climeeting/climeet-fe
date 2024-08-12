import { MyProfileInfo } from '@/services/user'
import { Entries } from '@/types/utils'
import { Hangul } from '@/utils/hangul'

type Validator<T> = (key: T) => boolean | string

const nickname: Validator<MyProfileInfo['nickname']> = (nickname) => {
  if (!nickname) {
    return '이름을 작성해주세요.'
  }
  if (!Hangul.isCompleteAll(nickname)) {
    return '이름 완성해 주세요.'
  }
  return false
}

const sex: Validator<MyProfileInfo['sex']> = (sex) => {
  if (!sex) {
    return '성별을 선택해주세요.'
  }
  return false
}

const skillLevel: Validator<MyProfileInfo['skillLevel']> = (skillLevel) => {
  if (!skillLevel) {
    return '스킬 레벨을 선택해주세요.'
  }
  return false
}

const description: Validator<MyProfileInfo['description']> = (description) => {
  if (!description) {
    return '자기소개를 작성해주세요.'
  }
  return false
}

export const validations = {
  nickname,
  sex,
  skillLevel,
  description,
}

export const validationList = Object.entries(validations) as Entries<typeof validations>
