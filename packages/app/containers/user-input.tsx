import {useEffect, useState} from "react" 
import { useSetRecoilState, useRecoilState } from "recoil"
import { loggedInUserState, messagesState } from "../recoil/atoms"

export const UserInput = () => {
    const [inputRef, setInputRef] =  useState(null)
    const [text, changeText] = useState("")
    const setMessages = useSetRecoilState(messagesState)
    const [loggedInUser] = useRecoilState(loggedInUserState) 
    const clearnUpInput = () => {
        changeText("")
    }
    const updateMessgages = (text) => {
        setMessages((curVal) => {
            console.log(`text is ${text}`)
            return [...curVal, {sender: loggedInUser, text}] 
        })
    }
    useEffect(()=>{
        if(!inputRef) return;
        const onEnterPressed = (e) => {
            console.log(e)
            if (e.keyCode === 13) {
                e.preventDefault();
                updateMessgages(e.target.defaultValue) 
                clearnUpInput()
            }
        }
        inputRef.addEventListener("keyup", onEnterPressed)
    },[inputRef])
    console.log(text)
    return(
        <div style={{height: "50px", width: "100%", display: "flex", position: "absolute", bottom: 0, right: 0}}>
            <input value={text} 
                onChange={(e)=>changeText(e.target.value)} style={{flex: 3}} ref={setInputRef}/> 
            <button style={{flex: 1}} onClick={()=> {
                updateMessgages(text)
                clearnUpInput()
            }}>send</button>
        </div>
    )
}
