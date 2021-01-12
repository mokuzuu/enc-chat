import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Portal from '../components/collab/portal'
import { getCollaborationLinkData } from '../data'
import { loggedInUserState, messagesState, senderState } from '../recoil/atoms'
import { ChatRoom } from './chat-room'
import { UserInput } from './user-input'

export const Main = ({ portal }: { portal: Portal }) => {
  const loggedInUser = useRecoilValue(loggedInUserState)
  const setNewMessage = useSetRecoilState(messagesState)
  const setSender = useSetRecoilState(senderState)
  const initializeSocketClient = async () => {
    if (portal.socket) {
      return
    }
    const roomMatch = getCollaborationLinkData(window.location.href)
    if (roomMatch) {
      const roomId = roomMatch[1]
      const roomKey = roomMatch[2]
      portal.open(roomId, roomKey)
      portal.onJoinRoom()
      portal.onNewMessage(({ sender, message }) =>
        setNewMessage((curVal) => {
          return [...curVal, { sender, text: message }]
        })
      )
      portal.onNewUser((sender) => {
        setSender((curVal) => {
          return [...curVal, sender]
        })
      })
      portal.emitJoinRoom(loggedInUser)
    }
  }

  useEffect(() => {
    initializeSocketClient()
  }, [])
  return (
    <>
      <div
        style={{
          height: 'calc(100vh - 50px)',
          width: '100%',
        }}
      >
        <ChatRoom />
      </div>
      <UserInput portal={portal} />
    </>
  )
}
