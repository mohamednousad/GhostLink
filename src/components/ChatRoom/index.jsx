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
