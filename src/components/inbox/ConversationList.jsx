"use client";
import React from "react";
import ContactSearchBar from "../contacts/ContactSearchBar";

function ConversationList({
  conversations = [],
  onSelectConversation = () => {},
  searchTerm = "",
  onSearchChange = () => {},
  statusFilter = "all",
  onStatusFilterChange = () => {},
}) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <div className="p-4 border-b space-y-3">
        <ContactSearchBar
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full"
          placeholder="Search contacts by name or phone..."
        />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:border-[#4a9eff]"
          name="status"
        >
          <option value="all">All Conversations</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className="p-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="fas fa-user text-gray-500"></i>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-[#4a9eff] uppercase">
                      {conversation.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConversationListStory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const mockConversations = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1 234 567 8900",
      lastMessage: "See you tomorrow!",
      time: "10:30 AM",
      status: "active",
    },
    {
      id: 2,
      name: "Alice Smith",
      phone: "+1 234 567 8901",
      lastMessage: "Thanks for your help",
      time: "Yesterday",
      status: "resolved",
    },
    {
      id: 3,
      name: "Bob Johnson",
      phone: "+1 234 567 8902",
      lastMessage: "Meeting at 2 PM",
      time: "2 days ago",
      status: "active",
    },
  ];

  const filteredConversations = mockConversations.filter(
    (conv) =>
      (conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.phone.includes(searchTerm)) &&
      (statusFilter === "all" || conv.status === statusFilter)
  );

  return (
    <div className="h-[600px] w-[400px] p-4 bg-gray-100">
      <ConversationList
        conversations={filteredConversations}
        onSelectConversation={setSelectedConversation}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </div>
  );
}

export default ConversationList;
