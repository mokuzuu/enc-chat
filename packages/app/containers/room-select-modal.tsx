import {
  Button,
  Container,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { generateCollaborationLink, getCollaborationLinkData } from '../data'
type ButtonType = 'CREATE_ROOM' | 'JOIN_ROOM'
export const RoomSelectModal = ({ onClose }: { onClose: () => void }) => {
  const [buttonSelection, setButtonSelection] = useState<ButtonType | null>(
    null
  )
  const [activeLink, setActiveLink] = useState(null)
  useEffect(() => {
    const roomLinkData = getCollaborationLinkData(window.location.href)
    if (roomLinkData) {
      const [, roomId, roomKey] = roomLinkData
      if (roomId && roomKey) {
        onClose()
      }
    }
  }, [])
  const onConfirmClick = async () => {
    if (buttonSelection === 'JOIN_ROOM') return
    const link = await generateCollaborationLink()
    window.history.pushState({}, '', link[0])
    setActiveLink(link)
  }

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chat roomの選択</ModalHeader>
        {activeLink && <ModalCloseButton onClick={onClose} />}
        <ModalBody pb={6} width="100%" display="flex" flexDir="column">
          <Container
            width="100%"
            display="flex"
            justifyContent="space-around"
            pb={6}
          >
            <Button
              colorScheme={
                buttonSelection === 'CREATE_ROOM' ? 'blue' : undefined
              }
              onClick={() => setButtonSelection('CREATE_ROOM')}
            >
              Roomを作る
            </Button>
            <Button
              colorScheme={buttonSelection === 'JOIN_ROOM' ? 'blue' : undefined}
              onClick={() => setButtonSelection('JOIN_ROOM')}
            >
              Roomに参加する
            </Button>
          </Container>
          {buttonSelection === 'JOIN_ROOM' && (
            <Container>
              <Text>アドレスバーにシェアリンクを貼りロードしてください。</Text>
            </Container>
          )}
        </ModalBody>
        {buttonSelection === 'CREATE_ROOM' && !activeLink && (
          <ModalFooter>
            <Button onClick={onConfirmClick}>確定</Button>
          </ModalFooter>
        )}
        {activeLink && <Input value={activeLink} isReadOnly />}
      </ModalContent>
    </Modal>
  )
}
