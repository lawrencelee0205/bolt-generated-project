"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

function MainComponent() {
  const [templates, setTemplates] = React.useState([
    {
      id: 1,
      name: "Welcome Message",
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
  ]);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [newTemplate, setNewTemplate] = React.useState({
    name: "",
    language: "en",
    category: "MARKETING",
    components: [
      { type: "HEADER", text: "" },
      { type: "BODY", text: "" },
      { type: "FOOTER", text: "" },
    ],
  });

  const handleCreateTemplate = () => {
    const template = {
      id: Date.now(),
      status: "PENDING",
      ...newTemplate,
    };
    setTemplates([...templates, template]);
    setShowCreateModal(false);
    setNewTemplate({
      name: "",
      language: "en",
      category: "MARKETING",
      components: [
        { type: "HEADER", text: "" },
        { type: "BODY", text: "" },
        { type: "FOOTER", text: "" },
      ],
    });
  };

  const handleEditTemplate = () => {
    setTemplates(
      templates.map((t) =>
        t.id === selectedTemplate.id ? selectedTemplate : t
      )
    );
    setShowEditModal(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = () => {
    setTemplates(templates.filter((t) => t.id !== selectedTemplate.id));
    setShowDeleteModal(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar activeItem="hsm" />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              WhatsApp Message Templates
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-plus mr-2"></i>Create Template
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Language</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id} className="border-t">
                    <td className="px-6 py-4">{template.name}</td>
                    <td className="px-6 py-4">{template.language}</td>
                    <td className="px-6 py-4">{template.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          template.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {template.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowEditModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-bold mb-4">Create Template</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Template Name"
                  className="w-full px-4 py-2 border rounded"
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                />
                <select
                  name="language"
                  value={newTemplate.language}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, language: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="pt">Portuguese</option>
                </select>
                <select
                  name="category"
                  value={newTemplate.category}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="MARKETING">Marketing</option>
                  <option value="UTILITY">Utility</option>
                  <option value="AUTHENTICATION">Authentication</option>
                </select>
                {newTemplate.components.map((component, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      {component.type}
                    </label>
                    <textarea
                      placeholder={`Enter ${component.type.toLowerCase()} text`}
                      value={component.text}
                      onChange={(e) => {
                        const updatedComponents = [...newTemplate.components];
                        updatedComponents[index].text = e.target.value;
                        setNewTemplate({
                          ...newTemplate,
                          components: updatedComponents,
                        });
                      }}
                      className="w-full px-4 py-2 border rounded h-24"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-bold mb-4">Edit Template</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Template Name"
                  className="w-full px-4 py-2 border rounded"
                  value={selectedTemplate.name}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      name: e.target.value,
                    })
                  }
                />
                <select
                  value={selectedTemplate.language}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      language: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="pt">Portuguese</option>
                </select>
                <select
                  value={selectedTemplate.category}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="MARKETING">Marketing</option>
                  <option value="UTILITY">Utility</option>
                  <option value="AUTHENTICATION">Authentication</option>
                </select>
                {selectedTemplate.components.map((component, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      {component.type}
                    </label>
                    <textarea
                      placeholder={`Enter ${component.type.toLowerCase()} text`}
                      value={component.text}
                      onChange={(e) => {
                        const updatedComponents = [
                          ...selectedTemplate.components,
                        ];
                        updatedComponents[index].text = e.target.value;
                        setSelectedTemplate({
                          ...selectedTemplate,
                          components: updatedComponents,
                        });
                      }}
                      className="w-full px-4 py-2 border rounded h-24"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditTemplate}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Delete Template</h2>
              <p>Are you sure you want to delete this template?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTemplate}
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
