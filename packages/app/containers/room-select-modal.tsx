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
import { useEffect, useRef, useState } from 'react'
import { generateCollaborationLink, getCollaborationLinkData } from '../data'
type ButtonType = 'CREATE_ROOM' | 'JOIN_ROOM'
export const RoomSelectModal = ({ onClose }: { onClose: () => void }) => {
  const [buttonSelection, setButtonSelection] = useState<ButtonType | null>(
    null
  )
  const inputRef = useRef<HTMLInputElement>(null)
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
    setActiveLink(link[0])
  }
  const onInputClick = () => {
    if (!inputRef.current) return
    inputRef.current.select()
    inputRef.current.setSelectionRange(0, 99999) /* For mobile devices */
    document.execCommand('copy')

    /* Alert the copied text */
    alert('Copied the url! Close this dialog and start chat! ')
  }
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a chat room</ModalHeader>
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
              Create a new room
            </Button>
            <Button
              colorScheme={buttonSelection === 'JOIN_ROOM' ? 'blue' : undefined}
              onClick={() => setButtonSelection('JOIN_ROOM')}
            >
              Join a room
            </Button>
          </Container>
          {buttonSelection === 'JOIN_ROOM' && (
            <Container>
              <Text>
                Get a sharable url from others, then load a tab to join a room
              </Text>
            </Container>
          )}
        </ModalBody>
        {buttonSelection === 'CREATE_ROOM' && !activeLink && (
          <ModalFooter>
            <Button onClick={onConfirmClick}>Confirm</Button>
          </ModalFooter>
        )}
        {activeLink && (
          <Input
            value={activeLink}
            isReadOnly
            onClick={onInputClick}
            ref={inputRef}
          />
        )}
      </ModalContent>
    </Modal>
  )
}
