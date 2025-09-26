import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget({ config }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hi! What can I help you with?" },
    { id: 2, sender: "user", text: "Hello" },
  ]);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), sender: "user", text };
    setMessages((m) => [...m, newMsg]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, sender: "bot", text: "Auto-reply: got your message." },
      ]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendFromButton();
    }
  };

  const sendFromButton = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      sendMessage(text);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="shadow-md border flex flex-col overflow-hidden"
      style={{
        width: config.width,
        height: config.height || 500,
        borderRadius: config.cornerRadius,
        fontSize: `${config.fontSize}px`,
        fontFamily: config.fontFamily,
        backgroundColor: config.darkMode ? "#1f2937" : config.areaBg,
        color: config.darkMode ? "#f9fafb" : "#111827",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b shadow-sm"
        style={{
          backgroundColor: config.darkMode ? "#1f2937" : "#f9fafb",
          borderBottomColor: config.darkMode ? "#374151" : "#e5e7eb",

        }}
      >

        {config.profilePic && (
          <img
            src={config.profilePic}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover shadow"
          />
        )}
        {config.chatIcon ? (
          <img
            src={config.chatIcon}
            alt="icon"
            className="w-8 h-8 rounded-full object-cover shadow"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
            {`C`}
          </div>
        )}


        <span className="text-sm font-semibold truncate">Chatcells.com</span>
      </div>


      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3 bg-white"
        style={{
          backgroundColor: config.darkMode ? "#111827" : "#ffffff", // Dark vs Light
        }}
      >
        {messages.map((m) => {
          const isUser = m.sender === "user";
          const bubbleBg = isUser
            ? config.syncUserColor
              ? config.headerBg
              : config.userBubbleColor
            : config.botBubbleColor;
          const textColor = isUser ? config.userTextColor : config.botTextColor;

          return (
            <div
              key={m.id}
              className={`max-w-[80%] px-4 py-2 text-sm shadow-sm ${isUser ? "self-end rounded-l-lg rounded-tr-lg" : "self-start rounded-r-lg rounded-tl-lg"
                }`}
              style={{
                backgroundColor: bubbleBg,
                color: textColor,
                borderRadius: config.bubbleRadius,
              }}
            >
              {m.text}
            </div>
          );
        })}
      </div>


      {/* Input Area */}
      <div className="flex items-center gap-2 px-3 py-3 border-t bg-gray-50"
        style={{
          backgroundColor: config.darkMode ? "#1f2937" : "#f9fafb",
          borderColor: config.darkMode ? "#374151" : "#e5e7eb",

        }}>
        {/* Textbox */}
        <textarea
          ref={inputRef}
          rows={1}
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-full px-4 py-2 text-sm resize-none 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          style={{
            backgroundColor: config.darkMode ? "#374151" : "#ffffff",
            color: config.darkMode ? "#f9fafb" : "#111827",
            borderColor: config.darkMode ? "#374151" : "#e5e7eb",
          }}
        />

        {/* Send Button */}
        <button
          onClick={sendFromButton}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white 
               hover:bg-indigo-700 transition-colors shadow-sm"
          aria-label="Send message"
        >
          {/* Send Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l14-7-7 14-2-5-5-2z" />
          </svg>
        </button>
      </div>


      {/* Footer */}
      {config.showPoweredBy && (
        <div
          className="text-[11px] text-center py-2 border-t tracking-wide"
          style={{
            backgroundColor: config.darkMode ? "#1f2937" : "#f9fafb",
            borderColor: config.darkMode ? "#374151" : "#e5e7eb",

            
            color: config.darkMode ? "#9ca3af" : "#6b7280",
          }}
        >
          Powered by <span className="font-medium text-indigo-500">Chatbot UI</span>
        </div>
      )}


    </div>
  );
}
