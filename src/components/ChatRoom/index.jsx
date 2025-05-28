// import { useState, useRef, useEffect } from 'react';
// import useChat from '../hooks/useChat';
// import useRoom from '../hooks/useRoom';

// export default function ChatRoom({ roomId }) {
//   const [message, setMessage] = useState('');
//   const { messages, sendMessage, isTyping } = useChat(roomId);
//   const { deleteRoom } = useRoom();
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSend = async () => {
//     if (!message.trim()) return;
//     await sendMessage(message);
//     setMessage('');
//   };

//   const handleLeave = () => {
//     deleteRoom(roomId);
//     window.location.href = '/';
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
//         <h1 className="text-xl font-bold">Room: {roomId}</h1>
//         <button
//           onClick={handleLeave}
//           className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
//         >
//           Leave Room
//         </button>
//       </header>

//       <main className="flex-1 p-4 overflow-y-auto space-y-3">
//         {messages.map((msg) => (
//           <div
//             key={`${msg.timestamp}-${msg.senderId}`}
//             className="p-3 bg-white rounded-lg shadow-sm border"
//           >
//             <div className="text-xs text-gray-500 font-medium">
//               {msg.senderId}
//             </div>
//             <div className="mt-1 text-gray-800">{msg.text}</div>
//           </div>
//         ))}
//         {isTyping && (
//           <div className="text-gray-400 italic">Someone is typing...</div>
//         )}
//         <div ref={messagesEndRef} />
//       </main>

//       <footer className="p-4 border-t bg-white">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSend}
//             disabled={!message.trim()}
//             className={`px-6 py-3 rounded-lg font-medium text-white ${
//               !message.trim() ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
//             } transition-colors`}
//           >
//             Send
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import useChat from "../../hooks/useChat";
import useRoom from "../../hooks/useRoom";
import bgImage from "../../assets/bg.jpg";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";

export default function ChatRoom({ roomId }) {
  const [message, setMessage] = useState("");
  const [localUserId] = useState(
    () =>
      localStorage.getItem("chatUserId") ||
      `user-${crypto.randomUUID().slice(0, 8)}`
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const { messages, sendMessage, isTyping } = useChat(roomId, localUserId);
  const { deleteRoom } = useRoom();

  // useEffect(() => {
  //   localStorage.setItem("chatUserId", localUserId);
  //   const bgInterval = setInterval(() => {
  //     setBgImage(`https://picsum.photos/1920/1080?random=${Date.now()}`);
  //   }, 15000);
  //   return () => clearInterval(bgInterval);
  // }, [localUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleLeave = () => {
    deleteRoom(roomId);
    window.location.href = "/";
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col h-full bg-black/20 backdrop-blur-sm">
        <ChatHeader roomId={roomId} handleLeave={handleLeave} />
        <ChatMessages
          messages={messages}
          localUserId={localUserId}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
        <ChatFooter showEmojiPicker={showEmojiPicker} handleEmojiClick={handleEmojiClick} setShowEmojiPicker={setShowEmojiPicker} message={message} setMessage={setMessage} handleSend={handleSend} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
