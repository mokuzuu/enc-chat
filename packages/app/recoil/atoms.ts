import { atom } from 'recoil'
import Portal from '../components/collab/portal'
import { Message } from '../types'
export const messagesState = atom<Message[]>({
  key: 'messagesState',
  default: [],
})

export const loggedInUserState = atom<string>({
  key: 'loggedInUserState',
  default: '',
})

export const roomDataState = atom<{
  id: string
  key: string
} | null>({
  key: 'roomDataState',
  default: null,
})

export const portalState = atom<Portal | null>({
  key: 'portalState',
  default: null,
})
export const senderState = atom<string[]>({ key: 'senderState', default: [] })
