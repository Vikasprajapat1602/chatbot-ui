import React, { useState } from "react";
import ChatWidget from "./components/ChatWidget";
import StylePanel from "./components/StylePanel";

export default function App() {
  const [config, setConfig] = useState({
    width: 350,
    height: 500,
    cornerRadius: 12,
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    headerBg: "#2563eb",
    areaBg: "#ffffff",
    userBubbleColor: "#e0e7ff",
    botBubbleColor: "#f3f4f6",
    userTextColor: "#000000",
    botTextColor: "#000000",
    bubbleRadius: 12,
    darkMode: false,
    syncUserColor: false,
    showPoweredBy: true,
    profilePic: "", 
    chatIcon: "",
    title: "Chatcells.com",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-6xl flex flex-col custom:flex-row gap-6">
        
        {/* Chat Widget */}
        <div className="flex-1 flex justify-center">
          <ChatWidget config={config} />
        </div>

        {/* Style Panel */}
        <div className="flex-1">
          <StylePanel config={config} setConfig={setConfig} />
        </div>
      </div>
    </div>
  );
}
