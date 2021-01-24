import { useEffect, useRef, useState } from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Portal from '../components/collab/portal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { messageActions } from '../store/message'
export const UserInput = ({ portal }: { portal: Portal }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, changeText] = useState('')
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.user.name)
  const clearnUpInput = () => {
    changeText('')
  }
  const updateMessgages = (text) => {
    dispatch(messageActions.addMessage({ message: { text, sender: name } }))
  }
  useEffect(() => {
    if (!inputRef.current) return
    const onEnterPressed = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        portal.emitSendMessage({ sender: name, text: e.target.value })
        updateMessgages(e.target.defaultValue)
        clearnUpInput()
      }
    }
    inputRef.current.addEventListener('keyup', onEnterPressed)
    return () => {
      if (!inputRef.current) return
      inputRef.current.removeEventListener('keyup', onEnterPressed)
    }
  }, [text])
  return (
    <InputGroup>
      <Input
        placeholder="your message..."
        value={text}
        onChange={(e) => changeText(e.target.value)}
        style={{ flex: 3 }}
        ref={inputRef}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={() => {
            updateMessgages(text)
            portal.emitSendMessage({ sender: name, text })
            clearnUpInput()
          }}
        >
          send
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
