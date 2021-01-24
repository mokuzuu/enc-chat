import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { loggedInUserState } from '../recoil/atoms'

export const UserNameModal = ({ onComplete }: { onComplete: () => void }) => {
  const setLoggedInUser = useSetRecoilState(loggedInUserState)
  const [userName, setUserName] = useState('')
  const onConfirmClick = () => {
    setLoggedInUser(userName)
    onComplete()
  }
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>What is your name in chat ?</ModalHeader>
        <ModalBody pb={6} width="100%" display="flex" flexDir="column">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </ModalBody>
        {userName && (
          <ModalFooter>
            <Button onClick={onConfirmClick}>Confirm</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
