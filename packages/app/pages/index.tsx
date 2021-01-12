import { RoomSelectModal } from '../containers/room-select-modal'
import { useRef, useState } from 'react'
import { UserNameModal } from '../containers/user-name-modal'
import Portal from '../components/collab/portal'
import { Main } from '../containers/main'

export default function Index() {
  const [isRoomSelected, setIsRoomSelected] = useState(false)
  const [isUserNameSelected, setIsUserNameSelected] = useState(false)
  const portal = useRef(new Portal())

  if (!isUserNameSelected) {
    return (
      <UserNameModal
        onComplete={() => {
          setIsUserNameSelected(true)
        }}
      />
    )
  }
  if (!isRoomSelected) {
    return (
      <RoomSelectModal
        onClose={() => {
          setIsRoomSelected(true)
        }}
      />
    )
  }
  return <Main portal={portal.current} />
}
