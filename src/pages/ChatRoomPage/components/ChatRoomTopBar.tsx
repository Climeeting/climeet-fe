import TopBar from '@/components/NavBar/TopBar'
import { PartyDetailType, usePartyDetailSuspense } from '@/services/party'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useChatRoomMembers } from '@/services/chat'
import SideSheet from '@/components/SideSheet.tsx'
import Icon from '@/components/Icon/Icon.tsx'
import ChatSidebar from '@/pages/ChatRoomPage/components/ChatSidebar.tsx'

export default function ChatRoomTopBar ({ id }: { id: number }) {
  const { data: party } = usePartyDetailSuspense(id)

  return (
    <TopBar>
      <TopBar.Left back />
      <TopBar.Center>{party?.partyName}</TopBar.Center>
      <TopBar.Right close={false}>
        <ErrorBoundary fallback={<>오류 발생</>}>
          <Suspense fallback={<>로딩중</>}>
            <ChatRoomInfo party={party} id={id} />
          </Suspense>
        </ErrorBoundary>
      </TopBar.Right>
    </TopBar>
  )
}

function ChatRoomInfo ({ party, id }: { party?: PartyDetailType, id: number }) {
  const [open, setOpen] = useState(false)
  const { data } = useChatRoomMembers(id)

  return (
    <SideSheet open={open} onOpenChange={setOpen}>
      <SideSheet.Trigger style={{ display: 'flex' }}>
        <Icon icon='Hamburger' size={32} />
      </SideSheet.Trigger>
      {party && open && <ChatSidebar partyId={id} party={party} members={data} />}
    </SideSheet>
  )
}
