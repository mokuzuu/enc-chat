import { useRecoilState } from 'recoil'
import { Message } from '../components/message'
import { messagesState } from '../recoil/atoms'
export const ChatRoom = () => {
  const [messages] = useRecoilState(messagesState)
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {messages.map((message) => (
        <Message sender={message.sender} text={message.text} />
      ))}
    </div>
  )
}
