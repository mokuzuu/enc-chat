import { Message } from '../components/message'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
export const ChatRoom = () => {
  const messages = useSelector((state: RootState) => state.message.messages)
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {messages.map((message, i) => (
        <Message sender={message.sender} text={message.text} key={i} />
      ))}
    </div>
  )
}
