"use client";
import React from "react";
import ContactList from "@/components/contacts/ContactList";
import Sidebar from "@/components/sidebar/Sidebar";

function MainComponent() {
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const [contacts, setContacts] = React.useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      avatar: "/avatar1.jpg",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "987-654-3210",
      avatar: "/avatar2.jpg",
    },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol@example.com",
      phone: "554-332-1122",
      avatar: "/avatar3.jpg",
    },
    {
      id: 4,
      name: "Dave Brown",
      email: "dave@example.com",
      phone: "667-778-8999",
      avatar: "/avatar4.jpg",
    },
  ]);
  const [newContact, setNewContact] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editContact, setEditContact] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  const handleCreateContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      return;
    }
    const contact = {
      id: "1",
      ...newContact,
      avatar: "/default-avatar.jpg",
    };
    setContacts([...contacts, contact]);
    setShowCreateModal(false);
    setNewContact({ name: "", email: "", phone: "" });
  };
  const handleUpdateContact = () => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact?.id
        ? { ...contact, ...editContact }
        : contact
    );
    setContacts(updatedContacts);
    setShowUpdateModal(false);
    setEditContact({ name: "", email: "", phone: "" });
    setSelectedContact(
      updatedContacts.find((c) => c.id === selectedContact?.id)
    );
  };
  const handleDeleteContacts = () => {
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = () => {
    setContacts(
      contacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setShowDeleteModal(false);
    setShowDeleteConfirmation(false);
    setSelectedContacts([]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeItem="contacts" />
      <div className="flex flex-col flex-1 bg-[#f5f5f5]">
        <div className="p-6 flex justify-between items-center bg-white shadow">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
          >
            <i className="fas fa-plus mr-2"></i>Create Contact
          </button>
          {selectedContacts.length > 0 && (
            <div className="space-x-2">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Update Selected
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          {selectedContact ? (
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Contact Details
                </h2>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditContact(selectedContact);
                      setShowUpdateModal(true);
                    }}
                    className="text-green-500 hover:text-green-600"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-[#4a9eff] hover:text-[#2180e8]"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-user text-gray-400 w-6"></i>
                  <span className="ml-2 text-gray-700">
                    {selectedContact.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-gray-400 w-6"></i>
                  <span className="ml-2 text-gray-700">
                    {selectedContact.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-gray-400 w-6"></i>
                  <span className="ml-2 text-gray-700">
                    {selectedContact.phone}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <ContactList />
          )}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Create Contact</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateContact}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Update Contact</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editContact.name}
                  onChange={(e) =>
                    setEditContact({ ...editContact, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editContact.email}
                  onChange={(e) =>
                    setEditContact({ ...editContact, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={editContact.phone}
                  onChange={(e) =>
                    setEditContact({ ...editContact, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateContact}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Delete Contacts</h2>
              <p>
                Are you sure you want to delete {selectedContacts.length}{" "}
                contact(s)?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setShowDeleteConfirmation(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        /* Your global styles here */
      `}</style>
    </div>
  );
}

export default MainComponent;
