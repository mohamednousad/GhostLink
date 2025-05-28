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
import useChat from "../hooks/useChat";
import useRoom from "../hooks/useRoom";

export default function ChatRoom({ roomId }) {
  const [message, setMessage] = useState("");
  const [localUserId] = useState(() =>
    localStorage.getItem("chatUserId") || `user-${crypto.randomUUID().slice(0, 8)}`
  );
  const [bgImage, setBgImage] = useState(
    `https://picsum.photos/1920/1080?random=${Date.now()}`
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const { messages, sendMessage, isTyping } = useChat(roomId, localUserId);
  const { deleteRoom } = useRoom();

  useEffect(() => {
    localStorage.setItem("chatUserId", localUserId);
    const bgInterval = setInterval(() => {
      setBgImage(`https://picsum.photos/1920/1080?random=${Date.now()}`);
    }, 15000);
    return () => clearInterval(bgInterval);
  }, [localUserId]);

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
      <div className="flex flex-col h-full bg-black/60 backdrop-blur-sm">
        <header className="p-4 text-white flex justify-between items-center rounded-b-xl">
          <h1 className="text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-md">
            ID: {roomId}
          </h1>
          <button
            onClick={handleLeave}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium shadow"
          >
            Leave
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {messages
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg) => (
              <div
                key={`${msg.timestamp}-${msg.senderId}`}
                className={`flex ${msg.senderId === localUserId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-lg text-sm backdrop-blur-md ${
                    msg.senderId === localUserId
                      ? "bg-gray-50 text-black rounded-br-none"
                      : "bg-white/10 text-white rounded-bl-none"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-70">
                    {msg.senderId === localUserId ? "You" : "Anonymous"}
                  </div>
                  {msg.text.startsWith("data:audio") ? (
                    <audio controls className="w-full mt-1">
                      <source src={msg.text} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div className="break-words">{msg.text}</div>
                  )}
                  <div className="text-right mt-1 text-xs opacity-60">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl animate-pulse text-sm">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 rounded-t-xl shadow-md">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-white text-xl"
            >
              😊
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-xl p-2 z-50 grid grid-cols-6 gap-2 text-xl">
                {["😀", "😂", "😍", "😎", "😭", "🥺", "👍", "🙏", "🎉", "❤️", "🔥", "😡"].map((emoji) => (
                  <button key={emoji} onClick={() => handleEmojiClick(emoji)}>
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
              placeholder="Type a message"
            />

      
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`p-3 rounded-xl text-white font-semibold shadow-xl transition-all duration-200 ${
                !message.trim()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-900 hover:to-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
