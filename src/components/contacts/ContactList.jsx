"use client";
import React from "react";
import ContactSearchBar from "./ContactSearchBar";
import ContactItem from "./ContactItem";

function ContactList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+1 234 567 8901",
      status: "inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 234 567 8902",
      status: "active",
    },
  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedContacts(contacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleDelete = () => {
    setContacts(
      contacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div className="w-64">
              <ContactSearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search contacts by name or phone..."
              />
            </div>
            <div className="space-x-2">
              {selectedContacts.length > 0 && (
                <>
                  <button
                    onClick={() => setShowUpdateModal(true)}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                  >
                    Update Selected
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete Selected
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      name="selectAll"
                      checked={selectedContacts.length === contacts.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    name={contact.name}
                    email={contact.email}
                    phone={contact.phone}
                    status={contact.status}
                    checked={selectedContacts.includes(contact.id)}
                    onCheckboxChange={() => handleSelectContact(contact.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactListStory() {
  return <ContactList />;
}

export default ContactList;
