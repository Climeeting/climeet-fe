export type MyProfile = {
  userId: number
  nickname: string
  profileImageUrl: string
}

export type Party = {
  createdAt: string
  updatedAt: string
  id: number
  constraints: "BOTH" | "MALE_ONLY" | "FEMALE_ONLY"
  minSkillLevel: number
  maxSkillLevel:	number
  locationId: number
  participationDeadline: string
  description: string
  userLimitCount:	number
  currentTotalMemberCount:	number
  approacheDescription:	string
  appointmentTime: string
  climbingType:	"BOULDERING" | "LEAD" | "ENDURANCE" | "ANY"
  masterId: number
  partyTitle:	string
  natural: boolean
}

export type PageableObject = {
  offset: number
  sort: SortObject
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

export type SortObject = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type PageData<Content> = {
  totalElements: number
  totalPages: number
  size: number
  content: Content[]
  number: number
  sort: SortObject
  numberOfElements: number
  pageable: PageableObject
  first: boolean
  last: boolean
  empty: boolean
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
