import { Socket } from 'socket.io'

const app = require('express')()
const http = require('http').Server(app)

const io = require('socket.io')(http, {
  origin: 'http://localhost:3000',
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
const cors = require('cors')

app.use(cors())

const PORT = 8000
io.on('connection', (socket: Socket) => {
  console.log('CONNECTED')
  socket.on('join-room', (roomId, user) => {
    socket.join(roomId)
    socket.to(roomId).emit('join-room', user)
  })
  socket.on('send-message', (roomId, sender, message) => {
    console.log(`encrypted sender: ${sender}`)
    console.log(`encrypted message: ${message}`)
    socket.to(roomId).emit('new-message', sender, message)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
