import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Portal from '../components/collab/portal'
import { getCollaborationLinkData } from '../data'
import { ChatRoom } from './chat-room'
import { UserInput } from './user-input'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { messageActions } from '../store/message'
export const Main = ({ portal }: { portal: Portal }) => {
  const userName = useSelector((state: RootState) => state.user.name)
  const dispatch = useDispatch()
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
      portal.onNewMessage(({ sender, text }) =>
        dispatch(
          messageActions.addMessage({
            message: { sender, text },
          })
        )
      )
      portal.emitJoinRoom(userName)
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
