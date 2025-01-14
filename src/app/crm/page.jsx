"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ContactSearchBar from "@/components/contacts/ContactSearchBar";

function MainComponent() {
  const [selectedGroup, setSelectedGroup] = React.useState("All");
  const [groups, setGroups] = React.useState([
    { id: 1, name: "Sales Team", contacts: [1, 2] },
    { id: 2, name: "Marketing", contacts: [2, 3] },
    { id: 3, name: "Support", contacts: [3, 4] },
  ]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState({ name: "", contacts: [] });
  const mockContacts = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol@example.com",
      phone: "554-332-1122",
    },
    {
      id: 4,
      name: "Dave Brown",
      email: "dave@example.com",
      phone: "667-778-8999",
    },
  ];
  const handleCreateGroup = () => {
    setGroups([...groups, { ...newGroup, id: Date.now() }]);
    setShowCreateModal(false);
    setNewGroup({ name: "", contacts: [] });
  };
  const handleDeleteGroup = () => {
    setGroups(groups.filter((g) => g.name !== selectedGroup));
    setSelectedGroup("All");
    setShowDeleteModal(false);
  };
  const handleUpdateGroup = () => {
    const updatedGroups = groups.map((g) =>
      g.name === selectedGroup ? { ...g, contacts: newGroup.contacts } : g
    );
    setGroups(updatedGroups);
    setShowUpdateModal(false);
    setNewGroup({ name: "", contacts: [] });
    setSelectedGroup(selectedGroup);
  };
  const filteredContacts = React.useMemo(() => {
    const groupContacts =
      selectedGroup === "All"
        ? mockContacts
        : mockContacts.filter((c) =>
            groups
              .find((g) => g.name === selectedGroup)
              ?.contacts.includes(c.id)
          );

    return groupContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedGroup, searchTerm]);

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar activeItem="crm" />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  name="group"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a9eff]"
                >
                  <option value="All">All</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.name}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                  >
                    Create Group
                  </button>
                  {selectedGroup !== "All" && (
                    <>
                      <button
                        onClick={() => setShowUpdateModal(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Update Group
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete Group
                      </button>
                    </>
                  )}
                </div>
              </div>
              <ContactSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                className="max-w-md"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-t">
                    <td className="px-6 py-4">{contact.name}</td>
                    <td className="px-6 py-4">{contact.email}</td>
                    <td className="px-6 py-4">{contact.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-bold mb-4">Create Group</h2>
              <input
                type="text"
                name="name"
                placeholder="Group Name"
                className="w-full px-4 py-2 border rounded mb-4"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
              />
              <div className="mb-4">
                <h3 className="font-medium mb-2">Select Contacts</h3>
                {mockContacts.map((contact) => (
                  <label
                    key={contact.id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="checkbox"
                      name="contacts"
                      checked={newGroup.contacts.includes(contact.id)}
                      onChange={(e) => {
                        const contacts = e.target.checked
                          ? [...newGroup.contacts, contact.id]
                          : newGroup.contacts.filter((id) => id !== contact.id);
                        setNewGroup({ ...newGroup, contacts });
                      }}
                    />
                    <span>{contact.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="px-4 py-2 bg-[#4a9eff] text-white rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-bold mb-4">Update Group</h2>
              <input
                type="text"
                name="name"
                placeholder="Group Name"
                className="w-full px-4 py-2 border rounded mb-4"
                value={selectedGroup}
                disabled
              />
              <div className="mb-4">
                <h3 className="font-medium mb-2">Select Contacts</h3>
                {mockContacts.map((contact) => {
                  const currentGroup = groups.find(
                    (g) => g.name === selectedGroup
                  );
                  const isChecked =
                    newGroup.contacts.length > 0
                      ? newGroup.contacts.includes(contact.id)
                      : currentGroup?.contacts.includes(contact.id);
                  return (
                    <label
                      key={contact.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        name="contacts"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentContacts =
                            newGroup.contacts.length > 0
                              ? newGroup.contacts
                              : currentGroup?.contacts || [];
                          const contacts = e.target.checked
                            ? [...currentContacts, contact.id]
                            : currentContacts.filter((id) => id !== contact.id);
                          setNewGroup({ ...newGroup, contacts });
                        }}
                      />
                      <span>{contact.name}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowUpdateModal(false);
                    setNewGroup({ name: "", contacts: [] });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateGroup}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>
                Are you sure you want to delete the group "{selectedGroup}"?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteGroup}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
