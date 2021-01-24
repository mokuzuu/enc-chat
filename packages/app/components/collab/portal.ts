import socketIoClient from 'socket.io-client'
import { decryptAESGEM, encryptAESGEM } from '../../data'
import { Message } from '../../types'

class Portal {
  socket: SocketIOClient.Socket | null = null
  socketInitialized: boolean = false
  roomId: string | null = null
  roomKey: string | null = null
  constructor() {}
  open(id: string, key: string) {
    this.socket = socketIoClient('http://localhost:8000')
    this.roomId = id
    this.roomKey = key
  }
  onNewUser(setSender: (sender: string) => void) {
    if (!this.socket) return
    this.socket.on('new-user', (sender: string) => {
      setSender(sender)
    })
  }

  onJoinRoom() {
    this.socket.on('join-room', (user) => {
      console.log(user)
    })
  }
  onNewMessage(setMessage: ({ sender, text }: Message) => void) {
    this.socket.on(
      'new-message',
      async (encryptedData: ArrayBuffer, iv: Uint8Array) => {
        if (!this.roomKey) {
          return
        }
        const decryptedData = await decryptAESGEM(
          encryptedData,
          this.roomKey,
          iv
        )
        setMessage({
          sender: decryptedData.sender,
          text: decryptedData.message,
        })
      }
    )
  }
  emitJoinRoom(user: string) {
    this.socket.emit('join-room', this.roomId, user)
  }
  close() {
    if (!this.socket) {
      return
    }
    this.socket.close()
    this.socket = null
  }
  isOpen() {
    return !!(this.socketInitialized && this.socket)
  }
  async emitSendMessage(sender: string, message: string) {
    const json = JSON.stringify({ sender, message })
    const encoded = new TextEncoder().encode(json)
    const encrypted = await encryptAESGEM(encoded, this.roomKey)
    this.socket.emit('send-message', this.roomId, encrypted.data, encrypted.iv)
  }
}

export default Portal
