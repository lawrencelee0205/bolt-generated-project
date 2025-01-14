"use client";
import React from "react";

function ChatBubble({
  message,
  sender = "user",
  timestamp = new Date(),
  status = "sent",
  className = "",
}) {
  const isUser = sender === "user";
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timestamp));

  const renderContent = () => {
    if (!message) return null;

    switch (message.type) {
      case "text":
        return (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
        );
      case "image":
        return (
          <div className="max-w-[240px]">
            <img
              src={message.url}
              alt="Shared image"
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      case "video":
        return (
          <div className="max-w-[240px]">
            <video controls className="rounded-lg w-full h-auto">
              <source src={message.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "file":
        return (
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <i className="fas fa-file text-gray-400"></i>
            <span className="text-sm text-gray-600 truncate">
              {message.filename || "Attachment"}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } ${className}`}
    >
      <div
        className={`max-w-[70%] flex flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser ? "bg-[#4a9eff] text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          {renderContent()}
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <span className="text-xs text-gray-500">{formattedTime}</span>
          {isUser && (
            <i
              className={`fas fa-check-double text-xs ${
                status === "read" ? "text-[#4a9eff]" : "text-gray-400"
              }`}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatBubbleStory() {
  const messages = [
    {
      type: "text",
      text: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
      status: "sent",
    },
    {
      type: "text",
      text: "I have a question about my order",
      sender: "user",
      timestamp: new Date(),
      status: "read",
    },
    {
      type: "image",
      url: "/sample-image.jpg",
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    },
    {
      type: "video",
      url: "/sample-video.mp4",
      sender: "agent",
      timestamp: new Date(),
      status: "sent",
    },
    {
      type: "file",
      filename: "document.pdf",
      url: "/sample-file.pdf",
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Chat Bubble Examples</h2>
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          message={msg}
          sender={msg.sender}
          timestamp={msg.timestamp}
          status={msg.status}
        />
      ))}
    </div>
  );
}

export default ChatBubble;
