export default function ChatMessages({
  messages,
  localUserId,
  isTyping,
  messagesEndRef,
}) {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {messages
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((msg) => (
          <div
            key={`${msg.timestamp}-${msg.senderId}`}
            className={`flex ${
              msg.senderId === localUserId ? "justify-end" : "justify-start"
            }`}
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
  );
}
