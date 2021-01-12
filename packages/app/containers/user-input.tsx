import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { loggedInUserState, messagesState, portalState } from '../recoil/atoms'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Portal from '../components/collab/portal'
export const UserInput = ({ portal }: { portal: Portal }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, changeText] = useState('')
  const setMessages = useSetRecoilState(messagesState)
  const loggedInUser = useRecoilValue(loggedInUserState)
  const clearnUpInput = () => {
    changeText('')
  }
  const updateMessgages = (text) => {
    setMessages((curVal) => {
      console.log(`text is ${text}`)
      return [...curVal, { sender: loggedInUser, text }]
    })
  }
  useEffect(() => {
    if (!inputRef.current) return
    const onEnterPressed = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        portal.emitSendMessage(loggedInUser, e.target.value)
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
            portal.emitSendMessage(loggedInUser, text)
            clearnUpInput()
          }}
        >
          send
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
