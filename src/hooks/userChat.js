import { useEffect, useState } from 'react'
import { ref, push, onValue, off } from 'firebase/database'
import { db } from '../firebase/config'

export default function useChat(roomId) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const messagesRef = ref(db, `chats/${roomId}/messages`)
    onValue(messagesRef, (snapshot) => {
      setMessages(Object.values(snapshot.val() || {}))
    })
    return () => off(messagesRef)
  }, [roomId])

  const sendMessage = (text) => {
    push(ref(db, `chats/${roomId}/messages`), {
      text,
      timestamp: Date.now()
    })
  }

  return { messages, sendMessage }
}