"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useUpload } from "../../utilities/runtime-helpers";
import ChatBubble from "./ChatBubble";
  
function ChatInterface({
  className,
  messages: initialMessages = [],
  onSendMessage,
  disabled = false,
  templates = [
    {
      id: 1,
      name: "welcome",
      language: "en",
      category: "MARKETING",
      status: "APPROVED",
      components: [
        {
          type: "HEADER",
          text: "Welcome to our service!",
        },
        {
          type: "BODY",
          text: "Hello {{1}}, thank you for choosing our platform. We're excited to help you get started.",
        },
        {
          type: "FOOTER",
          text: "Reply STOP to unsubscribe",
        },
      ],
    },
    {
      id: 2,
      name: "support",
      language: "en",
      category: "UTILITY",
      status: "APPROVED",
      components: [
        {
          type: "HEADER",
          text: "Support Request #{{1}}",
        },
        {
          type: "BODY",
          text: "Dear {{2}}, we've received your support request regarding {{3}}. Our team will contact you within {{4}} hours.",
        },
        {
          type: "FOOTER",
          text: "Need urgent help? Call us at {{5}}",
        },
      ],
    },
    {
      id: 3,
      name: "appointment",
      language: "en",
      category: "UTILITY",
      status: "APPROVED",
      components: [
        {
          type: "HEADER",
          text: "Appointment Confirmation",
        },
        {
          type: "BODY",
          text: "Hi {{1}}, your appointment is confirmed for {{2}} at {{3}}. Your consultant will be {{4}}.",
        },
        {
          type: "FOOTER",
          text: "Location: {{5}}",
        },
      ],
    },
    {
      id: 4,
      name: "order",
      language: "en",
      category: "UTILITY",
      status: "APPROVED",
      components: [
        {
          type: "HEADER",
          text: "Order #{{1}} Update",
        },
        {
          type: "BODY",
          text: "Your order for {{2}} has been {{3}}. Expected delivery: {{4}}",
        },
        {
          type: "FOOTER",
          text: "Track your order: {{5}}",
        },
      ],
    },
    {
      id: 5,
      name: "promotion",
      language: "en",
      category: "MARKETING",
      status: "APPROVED",
      components: [
        {
          type: "HEADER",
          text: "Special Offer!",
        },
        {
          type: "BODY",
          text: "Hi {{1}}! Get {{2}}% off on {{3}} using code: {{4}}. Valid until {{5}}.",
        },
        {
          type: "FOOTER",
          text: "Terms and conditions apply",
        },
      ],
    },
  ],
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [upload, { loading }] = useUpload();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (newMessage.startsWith("/h")) {
      const parts = newMessage.slice(2).trim().split(" ");
      const searchTerm = parts[0].toLowerCase();
      const filtered = templates.filter(
        (t) =>
          t.status === "APPROVED" && t.name.toLowerCase().includes(searchTerm)
      );
      setFilteredTemplates(filtered);
      setShowTemplates(parts.length === 1);
    } else {
      setShowTemplates(false);
    }
  }, [newMessage, templates]);

  const getTemplateInputs = (template) => {
    const allText = template.components.map((c) => c.text).join(" ");
    const matches = allText.match(/{{(\d+)}}/g) || [];
    const placeholders = {
      appointment: ["name", "case", "time", "doctor name", "location"],
      welcome: ["name"],
      support: ["ticket", "name", "issue", "hours", "phone"],
      order: ["number", "items", "status", "date", "link"],
      promotion: ["name", "discount", "product", "code", "date"],
    };

    return (
      placeholders[template.name] ||
      matches.map((match) => match.replace(/[{}]/g, ""))
    );
  };

  const handleTemplateSelect = (template) => {
    const paramCount =
      template.components
        .map((c) => c.text)
        .join("")
        .match(/{{(\d+)}}/g)?.length || 0;

    if (paramCount === 0) {
      const message = {
        text: template.components.map((c) => c.text).join("\n"),
        type: "text",
        sender: "user",
        time: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
      if (onSendMessage) onSendMessage(message);
    } else {
      setNewMessage(`/h ${template.name} `);
    }
    setShowTemplates(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && !disabled) {
      if (newMessage.startsWith("/h")) {
        const parts = newMessage.slice(2).trim().split(" ");
        const templateName = parts[0];
        const params = parts.slice(1);

        const template = templates.find(
          (t) => t.name.toLowerCase() === templateName.toLowerCase()
        );

        if (template) {
          let messageText = template.components.map((c) => c.text).join("\n");
          params.forEach((param, index) => {
            messageText = messageText.replace(`{{${index + 1}}}`, param);
          });

          const message = {
            text: messageText,
            type: "text",
            sender: "user",
            time: new Date(),
          };
          setMessages([...messages, message]);
          setNewMessage("");
          if (onSendMessage) onSendMessage(message);
        }
      } else {
        const message = {
          text: newMessage,
          type: "text",
          sender: "user",
          time: new Date(),
        };
        setMessages([...messages, message]);
        setNewMessage("");
        if (onSendMessage) onSendMessage(message);
      }
    }
  };

  const handleFileUpload = async (e) => {
    if (disabled) return;

    const file = e.target.files[0];
    if (!file) return;

    const { url, mimeType } = await upload({ file });

    if (mimeType.startsWith("image/") || mimeType.startsWith("video/")) {
      const message = {
        url,
        type: mimeType.startsWith("image/") ? "image" : "video",
        sender: "user",
        time: new Date(),
      };
      setMessages([...messages, message]);
      if (onSendMessage) onSendMessage(message);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          let messageObj;
          if (message.type === "text") {
            messageObj = { type: "text", text: message.text };
          } else if (message.type === "image") {
            messageObj = { type: "image", url: message.url };
          } else if (message.type === "video") {
            messageObj = { type: "video", url: message.url };
          } else if (message.type === "file") {
            messageObj = {
              type: "file",
              filename: message.filename,
              url: message.url,
            };
          }

          return (
            <ChatBubble
              key={index}
              message={messageObj}
              sender={message.sender}
              timestamp={message.time}
              status={message.status || "sent"}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="border-t p-4 bg-gray-50">
        <div className="flex gap-2 relative">
          <input
            type="text"
            name="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:border-[#4a9eff]"
            placeholder={
              disabled
                ? "This conversation is resolved"
                : "Type /h to use templates..."
            }
            disabled={disabled}
          />
          {showTemplates && filteredTemplates.length > 0 && (
            <div className="absolute bottom-full left-0 w-full bg-white border rounded-lg shadow-lg mb-2 max-h-60 overflow-y-auto">
              {filteredTemplates.map((template) => {
                const inputs = getTemplateInputs(template);
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none"
                  >
                    <div className="font-medium">
                      {template.name}{" "}
                      {inputs.length > 0
                        ? `[${inputs.map((input) => `${input}`).join("] [")}]`
                        : ""}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {template.components.map((c) => c.text).join(" ")}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          <label
            className={`bg-[#4a9eff] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#3a8eff] cursor-pointer relative group ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={disabled}
            />
            <i className="fas fa-paperclip"></i>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Attach
            </span>
          </label>
          <button
            type="submit"
            disabled={disabled}
            className={`bg-[#4a9eff] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#3a8eff] relative group ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <i className="fas fa-paper-plane"></i>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Send
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function ChatInterfaceStory() {
  const sampleMessages = [
    {
      text: "Hey there!",
      type: "text",
      sender: "other",
      time: new Date(Date.now() - 50000),
    },
    {
      text: "Hi! How are you?",
      type: "text",
      sender: "user",
      time: new Date(Date.now() - 40000),
    },
    {
      text: "I'm doing great, thanks!",
      type: "text",
      sender: "other",
      time: new Date(Date.now() - 30000),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen p-4">
      <div className="h-full">
        <h2 className="text-lg font-bold mb-2">Active Chat with Templates</h2>
        <ChatInterface
          className="h-full border rounded-lg"
          messages={sampleMessages}
          disabled={false}
        />
      </div>
      <div className="h-full">
        <h2 className="text-lg font-bold mb-2">Resolved Chat</h2>
        <ChatInterface
          className="h-full border rounded-lg"
          messages={sampleMessages}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
