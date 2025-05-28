import VoiceRecorderButton from "./VoiceRecorderButton";

export default function ChatHeader({ showEmojiPicker, handleEmojiClick,setShowEmojiPicker,message,setMessage ,handleSend,sendMessage}) {
  return (
    <footer className="p-4 rounded-t-xl shadow-md">
      <div className="flex gap-2 items-center relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-white rounded-full transition-colors"
        >
          😊
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 bg-gray-800 rounded-xl shadow-xl p-2 z-50 grid grid-cols-8 gap-1 text-xl max-w-xs">
            {["😀","😂","😍","😎","😭","🥺","👍","🙏","🎉","❤️","🔥","😡","😅","😇","😉","😢","🤔","😴","🤯","🤗","😤","💀","🤩","😈","💩","😷","🥳","💔","🙌","🌟","👀","🤝","👋","💪","🧠",].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="hover:bg-gray-600 rounded p-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 flex items-center bg-white/10 rounded-xl mb-3 backdrop-blur-sm pr-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Type a message"
          />
          <VoiceRecorderButton
            onSend={(audioData) => sendMessage(audioData)}
            className="text-white hover:bg-gray-700 p-2 rounded-full transition-colors"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-3 rounded-xl text-white font-semibold mb-3 shadow-xl transition-all ${
            !message.trim()
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
