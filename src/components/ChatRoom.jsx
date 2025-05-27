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

import { useState, useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import useRoom from '../hooks/useRoom';

export default function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  const [localUserId] = useState(() => localStorage.getItem('chatUserId') || `user-${crypto.randomUUID().slice(0,8)}`);
  const [bgImage, setBgImage] = useState(`https://picsum.photos/1920/1080?random=${Date.now()}`);
  const { messages, sendMessage, isTyping } = useChat(roomId, localUserId);
  const { deleteRoom } = useRoom();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatUserId', localUserId);
    const bgInterval = setInterval(() => {
      setBgImage(`https://picsum.photos/1920/1080?random=${Date.now()}`);
    }, 15000);
    return () => clearInterval(bgInterval);
  }, [localUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  const handleLeave = () => {
    deleteRoom(roomId);
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="flex flex-col h-full bg-opacity-30 backdrop-blur-sm">
        <header className="p-4 bg-opacity-70 text-white flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold">Room: {roomId}</h1>
          <button 
            onClick={handleLeave}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-lg"
          >
            Leave Room
          </button>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div 
              key={`${msg.timestamp}-${msg.senderId}`} 
              className={`flex ${msg.senderId === localUserId ? 'justify-end' : 'justify-start'} transition-all duration-200`}
            >
              <div className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-lg ${msg.senderId === localUserId 
                ? 'bg-blue-600 text-white rounded-br-none animate-pop' 
                : 'bg-gray-800 text-white rounded-bl-none animate-pop'
              }`}>
                <div className={`text-xs font-medium ${msg.senderId === localUserId ? 'text-blue-200' : 'text-gray-300'}`}>
                  {msg.senderId === localUserId ? 'You' : 'Anonymous'}
                </div>
                <div className="mt-1 break-words">{msg.text}</div>
                <div className="text-right mt-1 text-xs opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-xl animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 bg-opacity-70 sticky bottom-0">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`p-3 rounded-lg font-bold text-white shadow-lg transition-all ${
                !message.trim() ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}