import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user'

export const UserNameModal = ({ onComplete }: { onComplete: () => void }) => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const onConfirmClick = () => {
    dispatch(userActions.updateName({ name: userName }))
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
