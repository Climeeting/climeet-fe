export type Message = {
  messageType: 'SERVER' | 'CLIENT' // 메시지 타입
  room: number // 방 ID
  senderId: number // 발신자 ID
  message: string // 메시지 내용
  createdAt: string // 생성 시간 (서버에서 자동 설정)
}

export type SendMessage = {
  messageType: 'CLIENT' // 메시지 타입
  room: number // 방 ID
  senderId: number // 발신자 ID
  message: string // 메시지 내용
}

export type ReceiveMessage = {
  messageType: 'SERVER' | 'CLIENT'
  message: string
  messageId: number
  createdAt: string
  senderId: number
  name: string
  thumbnailImageUrl: string
}
