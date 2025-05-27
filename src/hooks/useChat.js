// import { useState, useEffect, useCallback } from 'react';
// import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';
// import { db } from '../firebase/config';

// export default function useChat(roomId) {
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     const messagesRef = ref(db, `rooms/${roomId}/messages`);
    
//     onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val() || {};
//       setMessages(Object.values(data).reverse().slice(0, 100));
//     });

//     return () => off(messagesRef);
//   }, [roomId]);

//   const sendMessage = useCallback(async (text) => {
//     if (!text.trim()) return;
    
//     setIsTyping(true);
//     await push(ref(db, `rooms/${roomId}/messages`), {
//       text,
//       timestamp: serverTimestamp(),
//       senderId: crypto.randomUUID().slice(0, 8)
//     });
//     setIsTyping(false);
//   }, [roomId]);

//   return { messages, sendMessage, isTyping };
// }

import { useState, useEffect, useCallback } from 'react';
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';
import { db } from '../firebase/config';

export default function useChat(roomId, localUserId) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMessages(Object.values(data).reverse().slice(0, 100));
    });

    return () => off(messagesRef);
  }, [roomId]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    
    setIsTyping(true);
    await push(ref(db, `rooms/${roomId}/messages`), {
      text,
      timestamp: serverTimestamp(),
      senderId: localUserId
    });
    setIsTyping(false);
  }, [roomId, localUserId]);

  return { messages, sendMessage, isTyping };
}