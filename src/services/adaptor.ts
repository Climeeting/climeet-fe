export type ConstraintsFe = '남녀 모두' | '남자' | '여자'
export type ConstraintsBe = 'BOTH' | 'MALE_ONLY' | 'FEMALE_ONLY'
export const constraintsFe2Be = (constraints: ConstraintsFe | ''): ConstraintsBe => {
  switch (constraints) {
    case '남녀 모두':
      return 'BOTH'
    case '남자':
      return 'MALE_ONLY'
    case '여자':
      return 'FEMALE_ONLY'
    default:
      return 'BOTH'
  }
}
export const constraintsBe2Fe = (constraints: ConstraintsBe | ''): ConstraintsFe => {
  switch (constraints) {
    case 'BOTH':
      return '남녀 모두'
    case 'FEMALE_ONLY':
      return '여자'
    case 'MALE_ONLY':
      return '남자'
    default:
      return '남녀 모두'
  }
}

export type ClibingFe = '볼더링' | '리드' | '지구력' | '상관없음'
export type ClibingBe = 'BOULDERING' | 'LEAD' | 'ENDURANCE' | 'ANY'
export const clibingFe2Be = (clibing: ClibingFe | ''): ClibingBe => {
  switch (clibing) {
    case '볼더링':
      return 'BOULDERING'
    case '리드':
      return 'LEAD'
    case '지구력':
      return 'ENDURANCE'
    case '상관없음':
      return 'ANY'
    default:
      return 'ANY'
  }
}
export const clibingBe2Fe = (clibing: ClibingBe | ''): ClibingFe => {
  switch (clibing) {
    case 'BOULDERING':
      return '볼더링'
    case 'LEAD':
      return '리드'
    case 'ENDURANCE':
      return '지구력'
    case 'ANY':
      return '상관없음'
    default:
      return '상관없음'
  }
}

export type JoinStatusFe = '전체' | '신청하기' | '마감임박' | '마감'
export type JoinStatusBe = 'AVAILABLE' | 'IMMINENT_FULL' | 'FULL' | null
export const JoinStatusFe2Be = (status: JoinStatusFe | ''): JoinStatusBe => {
  switch (status) {
    case '전체':
      return null
    case '신청하기':
      return 'AVAILABLE'
    case '마감임박':
      return 'IMMINENT_FULL'
    case '마감':
      return 'FULL'
    default:
      return null
  }
}
export const JoinStatusBe2Fe = (status: JoinStatusBe | ''): JoinStatusFe => {
  switch (status) {
    case null:
      return '전체'
    case 'AVAILABLE':
      return '신청하기'
    case 'IMMINENT_FULL':
      return '마감임박'
    case 'FULL':
      return '마감'
    default:
      return '전체'
  }
}

export type SexFe = '남자' | '여자'
export type SexBe = 'MALE' | 'FEMALE'
export const sexFe2Be = (sex: SexFe | ''): SexBe => {
  switch (sex) {
    case '남자':
      return 'MALE'
    case '여자':
      return 'FEMALE'
    default:
      return 'MALE'
  }
}
