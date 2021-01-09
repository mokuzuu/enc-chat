import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {ChatRoom} from "../containers/chat-room"
import {UserInput} from "../containers/user-input"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export default function Index() {
  return (
    <RecoilRoot>
      <div style={{
        height: 'calc(100vh - 50px)',
        width: '100%'
      }}>
      <ChatRoom />
      </div>
      <UserInput />
    </RecoilRoot>
  )
}
