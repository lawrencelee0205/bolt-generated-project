"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "@/components/inbox/ConversationList";
import ChatInterface from "@/components/inbox/ChatInterface";

function MainComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedConversation, setSelectedConversation] = React.useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [messages, setMessages] = React.useState({});
  const [conversations, setConversations] = React.useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 234-567-8901",
      status: "active",
      lastMessage: "Hi, I need help with my order #12345",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Alice Smith",
      phone: "+1 345-678-9012",
      status: "active",
      lastMessage: "Hello, I received a damaged item in my last order",
      time: "11:30 AM",
    },
    {
      id: 3,
      name: "Bob Johnson",
      phone: "+1 456-789-0123",
      status: "resolved",
      lastMessage: "Perfect! I'll help you with the checkout process",
      time: "2:19 PM",
    },
    {
      id: 4,
      name: "Carol Williams",
      phone: "+1 567-890-1234",
      status: "active",
      lastMessage:
        "It says 'invalid credentials' but I'm sure my password is correct",
      time: "3:32 PM",
    },
    {
      id: 5,
      name: "David Brown",
      phone: "+1 678-901-2345",
      status: "active",
      lastMessage: "Perfect! We offer standard and express shipping to Canada",
      time: "4:48 PM",
    },
  ]);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(false);

  const handleSendMessage = async (message) => {
    if (selectedConversation && selectedConversation.status !== "resolved") {
      const conversationMessages = messages[selectedConversation.id] || [];
      const newMessage = {
        ...message,
        time: new Date(),
      };

      setMessages({
        ...messages,
        [selectedConversation.id]: [...conversationMessages, newMessage],
      });

      const updatedConversations = conversations.map((conv) => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            lastMessage: message.text || `Sent ${message.type}`,
            time: "Just now",
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
    }
  };

  const handleResolve = () => {
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          status: "resolved",
        };
      }
      return conv;
    });
    setConversations(updatedConversations);
    setSelectedConversation({ ...selectedConversation, status: "resolved" });
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      (statusFilter === "all" || conv.status === statusFilter) &&
      (conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.phone?.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  React.useEffect(() => {
    const initialMessages = {
      1: [
        {
          text: "Hi, I need help with my order #12345",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T10:00:00"),
        },
        {
          text: "Of course! I'd be happy to help. I can see your order here. The package is currently in transit.",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T10:01:00"),
        },
        {
          text: "When will it arrive?",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T10:02:00"),
        },
        {
          text: "According to the tracking, it should arrive by tomorrow afternoon.",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T10:03:00"),
        },
      ],
      2: [
        {
          text: "Hello, I received a damaged item in my last order",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T11:30:00"),
        },
        {
          text: "I'm sorry to hear that. Can you send a photo of the damage?",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T11:31:00"),
        },
        {
          text: "We'll process a replacement right away once we review the photos",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T11:32:00"),
        },
      ],
      3: [
        {
          text: "Is the blue shirt available in medium?",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T14:15:00"),
        },
        {
          text: "Let me check our inventory",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T14:16:00"),
        },
        {
          text: "Yes, we have 5 pieces in stock! Would you like to place an order?",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T14:17:00"),
        },
        {
          text: "Great! Yes please",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T14:18:00"),
        },
        {
          text: "Perfect! I'll help you with the checkout process",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T14:19:00"),
        },
      ],
      4: [
        {
          text: "Hi, I'm having trouble logging into my account",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T15:30:00"),
        },
        {
          text: "I can help you with that. Can you tell me what error message you're seeing?",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T15:31:00"),
        },
        {
          text: "It says 'invalid credentials' but I'm sure my password is correct",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T15:32:00"),
        },
      ],
      5: [
        {
          text: "Hello! Do you offer international shipping?",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T16:45:00"),
        },
        {
          text: "Yes, we ship to most countries! Which country are you located in?",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T16:46:00"),
        },
        {
          text: "I'm in Canada",
          type: "text",
          sender: "user",
          time: new Date("2025-01-20T16:47:00"),
        },
        {
          text: "Perfect! We offer standard and express shipping to Canada",
          type: "text",
          sender: "agent",
          time: new Date("2025-01-20T16:48:00"),
        },
      ],
    };

    setMessages(initialMessages);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div
        className={`flex transition-all duration-300 ${sidebarCollapsed ? "w-[80px]" : "w-[560px]"}`}
      >
        <Sidebar activeItem="inbox" collapsed={sidebarCollapsed} />
        <ConversationList
          conversations={filteredConversations}
          onSelectConversation={setSelectedConversation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4a9eff]"></div>
            </div>
          ) : selectedConversation ? (
            <div className="flex flex-col h-full">
              <div
                className={`bg-white shadow px-3 py-2 rounded-t-lg flex justify-between items-center transition-all duration-300 ${sidebarCollapsed ? "mx-0" : "mx-0 md:mx-8"}`}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-[#4a9eff] flex items-center justify-center text-white font-semibold mr-2">
                    {selectedConversation.name?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">
                      {selectedConversation.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {selectedConversation.status === "active" && (
                    <button
                      onClick={handleResolve}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Resolve
                    </button>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-500">
                      {messages[selectedConversation.id]?.length || 0} messages
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${selectedConversation.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                      title={
                        selectedConversation.status === "active"
                          ? "Active"
                          : "Resolved"
                      }
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden px-4 md:px-8">
                <ChatInterface
                  className={`h-full transition-all duration-300 ${sidebarCollapsed ? "mx-0" : "mx-0 md:mx-8"}`}
                  messages={messages[selectedConversation.id] || []}
                  onSendMessage={handleSendMessage}
                  disabled={selectedConversation.status === "resolved"}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <i className="fas fa-comments text-4xl mb-3 text-gray-400"></i>
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
