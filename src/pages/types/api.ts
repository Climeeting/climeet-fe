export type MyProfile = {
  userId: number
  nickname: string
  profileImageUrl: string
}

export type ClimbSearchItem = {
  id: number
  name: string
  address1: string
  address2: string
  address3: string
}

export type ClimbSearch = {
  content: ClimbSearchItem[]
}
