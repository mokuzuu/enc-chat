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
        <ModalHeader>Chat roomでの名前を入力してください</ModalHeader>
        <ModalBody pb={6} width="100%" display="flex" flexDir="column">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </ModalBody>
        {userName && (
          <ModalFooter>
            <Button onClick={onConfirmClick}>確定</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
