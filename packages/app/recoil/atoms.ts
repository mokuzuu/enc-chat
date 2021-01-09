import { atom } from "recoil";
import {Message} from "../types"
export const messagesState = atom<Message[]>({
    key: "messagesState",
    default: []
})

export const loggedInUserState = atom<string>({
    key: "loggedInUserState",
    default: ""
})
