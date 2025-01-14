"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar"
import { useUpload } from "@/utilities/runtime-helpers";

function MainComponent() {
  const [schedules, setSchedules] = React.useState([
    {
      id: 1,
      name: "Welcome Campaign",
      contacts: ["1", "2", "3", "4", "5"],
      message: "Welcome to our platform!",
      datetime: "2024-01-15T10:00",
      groups: [1],
      status: "Completed",
      messageType: "template",
      template: {
        id: 1,
        name: "welcome",
        components: [
          { type: "HEADER", text: "Welcome to our service!" },
          {
            type: "BODY",
            text: "Hello {{1}}, thank you for choosing our platform. We're excited to help you get started.",
          },
          { type: "FOOTER", text: "Reply STOP to unsubscribe" },
        ],
      },
      templateInputs: { 1: "valued customer" },
      messageStats: {
        sent: 5,
        received: 5,
        read: 4,
        failed: 0,
        error: 0,
      },
      contactStatuses: [
        {
          contact: "John Doe",
          status: "read",
          sentAt: "2024-01-15 10:00:00",
          deliveredAt: "2024-01-15 10:00:05",
          readAt: "2024-01-15 10:01:00",
        },
        {
          contact: "Jane Smith",
          status: "delivered",
          sentAt: "2024-01-15 10:00:00",
          deliveredAt: "2024-01-15 10:00:03",
        },
        {
          contact: "Bob Wilson",
          status: "read",
          sentAt: "2024-01-15 10:00:00",
          deliveredAt: "2024-01-15 10:00:04",
          readAt: "2024-01-15 10:02:00",
        },
        {
          contact: "Alice Brown",
          status: "read",
          sentAt: "2024-01-15 10:00:00",
          deliveredAt: "2024-01-15 10:00:02",
          readAt: "2024-01-15 10:01:30",
        },
        {
          contact: "Charlie Davis",
          status: "read",
          sentAt: "2024-01-15 10:00:00",
          deliveredAt: "2024-01-15 10:00:06",
          readAt: "2024-01-15 10:03:00",
        },
      ],
    },
    {
      id: 2,
      name: "Special Offer Blast",
      contacts: ["1", "2", "3", "4", "5", "6"],
      datetime: "2024-01-20T15:30",
      groups: [1, 2],
      status: "Completed",
      messageType: "template",
      template: {
        id: 5,
        name: "special_offer",
        components: [
          { type: "HEADER", text: "🎉 Special Offer Inside!" },
          {
            type: "BODY",
            text: "Hi {{1}}! Get {{2}}% off on all {{3}} when you shop before {{4}}. Use code: {{5}} at checkout.",
          },
          { type: "FOOTER", text: "Shop now: {{6}}" },
        ],
      },
      templateInputs: {
        1: "customer",
        2: "25",
        3: "products",
        4: "January 31st",
        5: "SPECIAL25",
        6: "https://shop.example.com",
      },
      messageStats: {
        sent: 6,
        received: 5,
        read: 4,
        failed: 1,
        error: 0,
      },
      contactStatuses: [
        {
          contact: "John Doe",
          status: "read",
          sentAt: "2024-01-20 15:30:00",
          deliveredAt: "2024-01-20 15:30:05",
          readAt: "2024-01-20 15:31:00",
        },
        {
          contact: "Jane Smith",
          status: "delivered",
          sentAt: "2024-01-20 15:30:00",
          deliveredAt: "2024-01-20 15:30:03",
        },
        {
          contact: "Bob Wilson",
          status: "failed",
          sentAt: "2024-01-20 15:30:00",
        },
        {
          contact: "Alice Brown",
          status: "read",
          sentAt: "2024-01-20 15:30:00",
          deliveredAt: "2024-01-20 15:30:02",
          readAt: "2024-01-20 15:31:30",
        },
        {
          contact: "Charlie Davis",
          status: "read",
          sentAt: "2024-01-20 15:30:00",
          deliveredAt: "2024-01-20 15:30:06",
          readAt: "2024-01-20 15:33:00",
        },
        {
          contact: "David Lee",
          status: "read",
          sentAt: "2024-01-20 15:30:00",
          deliveredAt: "2024-01-20 15:30:04",
          readAt: "2024-01-20 15:32:00",
        },
      ],
    },
  ]);

  const defaultGroups = [
    {
      id: 1,
      name: "All Customers",
      contacts: ["1", "2", "3", "4", "5"],
    },
    {
      id: 2,
      name: "VIP Customers",
      contacts: ["6", "7", "8"],
    },
  ];

  const templates = [
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
  ];

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedSchedules, setSelectedSchedules] = React.useState([]);
  const [scheduleToDelete, setScheduleToDelete] = React.useState(null);
  const [editSchedule, setEditSchedule] = React.useState(null);
  const [showSummaryModal, setShowSummaryModal] = React.useState(false);
  const [selectedScheduleSummary, setSelectedScheduleSummary] =
    React.useState(null);
  const [upload, { loading }] = useUpload();
  const [messageType, setMessageType] = React.useState("freeform");
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [templateInputs, setTemplateInputs] = React.useState({});
  const [newSchedule, setNewSchedule] = React.useState({
    name: "",
    contacts: [],
    message: "",
    media: null,
    datetime: "",
    groups: [],
    messageType: "freeform",
    template: null,
    templateInputs: {},
  });

  const handleViewSummary = (schedule) => {
    setSelectedScheduleSummary(schedule);
    setShowSummaryModal(true);
  };

  const handleCreate = () => {
    const schedule = {
      id: Date.now(),
      ...newSchedule,
      status: "Pending",
      contacts: newSchedule.groups.flatMap(
        (groupId) => defaultGroups.find((g) => g.id === groupId)?.contacts || []
      ),
      messageStats: {
        sent: 0,
        received: 0,
        read: 0,
        failed: 0,
        error: 0,
      },
    };
    setSchedules([...schedules, schedule]);
    setShowCreateModal(false);
    setNewSchedule({
      name: "",
      contacts: [],
      message: "",
      media: null,
      datetime: "",
      groups: [],
      messageType: "freeform",
      template: null,
      templateInputs: {},
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { url, mimeType } = await upload({ file });
    setNewSchedule({
      ...newSchedule,
      media: { url, type: mimeType },
    });
  };

  const handleTemplateSelect = (template) => {
    setNewSchedule({
      ...newSchedule,
      template,
      templateInputs: {},
    });
  };

  const getTemplateInputs = (template) => {
    const allText = template.components.map((c) => c.text).join(" ");
    const matches = allText.match(/{{(\d+)}}/g) || [];
    return matches.map((match) => `Input ${match.replace(/[{}]/g, "")}`);
  };

  const getPreviewText = (template, inputs) => {
    return template.components.map((component) => {
      let text = component.text;
      Object.entries(inputs).forEach(([key, value]) => {
        text = text.replace(`{{${key}}}`, value || `[Input ${key}]`);
      });
      return text;
    });
  };

  const handleEdit = () => {
    setSchedules(
      schedules.map((s) => (s.id === editSchedule.id ? editSchedule : s))
    );
    setShowEditModal(false);
    setEditSchedule(null);
  };

  const handleCancel = (id) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, status: "Cancelled" } : s))
    );
  };

  const handleBulkCancel = () => {
    setSchedules(
      schedules.map((s) =>
        selectedSchedules.includes(s.id) ? { ...s, status: "Cancelled" } : s
      )
    );
    setSelectedSchedules([]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeItem="blast" />
      <div className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <div className="space-x-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#4a9eff] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-plus mr-2"></i>Create Schedule
            </button>
            {selectedSchedules.length > 0 && (
              <button
                onClick={handleBulkCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <i className="fas fa-ban mr-2"></i>Cancel Selected
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    name="selectAll"
                    onChange={(e) =>
                      setSelectedSchedules(
                        e.target.checked ? schedules.map((s) => s.id) : []
                      )
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Recipients</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Send Time</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className={`border-t ${
                    schedule.status === "Completed"
                      ? "cursor-pointer hover:bg-gray-50"
                      : ""
                  }`}
                  onClick={() =>
                    schedule.status === "Completed" &&
                    handleViewSummary(schedule)
                  }
                >
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      name={`select-${schedule.id}`}
                      checked={selectedSchedules.includes(schedule.id)}
                      onChange={(e) =>
                        setSelectedSchedules(
                          e.target.checked
                            ? [...selectedSchedules, schedule.id]
                            : selectedSchedules.filter(
                                (id) => id !== schedule.id
                              )
                        )
                      }
                    />
                  </td>
                  <td className="px-6 py-4">{schedule.name}</td>
                  <td className="px-6 py-4">{schedule.contacts.length}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        schedule.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : schedule.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(schedule.datetime).toLocaleString()}
                  </td>
                  <td
                    className="px-6 py-4 space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {schedule.status === "Completed" ? (
                      <button
                        onClick={() => handleViewSummary(schedule)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fas fa-chart-bar"></i>
                      </button>
                    ) : (
                      schedule.status === "Pending" && (
                        <>
                          <button
                            onClick={() => {
                              setEditSchedule(schedule);
                              setShowEditModal(true);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleCancel(schedule.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-ban"></i>
                          </button>
                        </>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showSummaryModal && selectedScheduleSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Message Schedule Summary</h2>
                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedScheduleSummary.messageStats.sent}
                    </div>
                    <div className="text-sm text-gray-600">Sent</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedScheduleSummary.messageStats.received}
                    </div>
                    <div className="text-sm text-gray-600">Received</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedScheduleSummary.messageStats.read}
                    </div>
                    <div className="text-sm text-gray-600">Read</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedScheduleSummary.messageStats.failed}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedScheduleSummary.messageStats.error}
                    </div>
                    <div className="text-sm text-gray-600">Error</div>
                  </div>
                </div>
                {selectedScheduleSummary.template && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Template Used</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-800">
                        {selectedScheduleSummary.template.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {selectedScheduleSummary.template.components.map(
                          (component, index) => (
                            <div key={index}>{component.text}</div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-medium mb-2">Contact Status</h3>
                  <div className="bg-white rounded-lg shadow">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Contact</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Sent At</th>
                          <th className="px-4 py-2 text-left">Delivered At</th>
                          <th className="px-4 py-2 text-left">Read At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedScheduleSummary.contactStatuses.map(
                          (status, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2">{status.contact}</td>
                              <td className="px-4 py-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    status.status === "delivered"
                                      ? "bg-green-100 text-green-800"
                                      : status.status === "read"
                                      ? "bg-blue-100 text-blue-800"
                                      : status.status === "failed"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {status.status}
                                </span>
                              </td>
                              <td className="px-4 py-2">{status.sentAt}</td>
                              <td className="px-4 py-2">
                                {status.deliveredAt || "-"}
                              </td>
                              <td className="px-4 py-2">
                                {status.readAt || "-"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <h2 className="text-xl font-bold mb-4">
                Create Message Schedule
              </h2>
              <div className="space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                <input
                  type="text"
                  name="name"
                  placeholder="Schedule Name"
                  className="w-full px-4 py-2 border rounded"
                  value={newSchedule.name}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, name: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">
                    Message Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="messageType"
                        value="freeform"
                        checked={newSchedule.messageType === "freeform"}
                        onChange={(e) =>
                          setNewSchedule({
                            ...newSchedule,
                            messageType: e.target.value,
                          })
                        }
                        className="mr-2"
                      />
                      Free-form Message
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="messageType"
                        value="template"
                        checked={newSchedule.messageType === "template"}
                        onChange={(e) =>
                          setNewSchedule({
                            ...newSchedule,
                            messageType: e.target.value,
                          })
                        }
                        className="mr-2"
                      />
                      WhatsApp Template
                    </label>
                  </div>
                </div>
                {newSchedule.messageType === "freeform" ? (
                  <>
                    <textarea
                      name="message"
                      placeholder="Message"
                      className="w-full px-4 py-2 border rounded h-32"
                      value={newSchedule.message}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          message: e.target.value,
                        })
                      }
                    />
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Media (optional)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <i className="fas fa-paperclip mr-2"></i>
                          Attach Media
                        </label>
                        {newSchedule.media && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {newSchedule.media.type.startsWith("image/") ? (
                                <img
                                  src={newSchedule.media.url}
                                  alt="Preview"
                                  className="w-8 h-8 object-cover rounded"
                                />
                              ) : (
                                <i className="fas fa-video"></i>
                              )}
                            </span>
                            <button
                              onClick={() =>
                                setNewSchedule({ ...newSchedule, media: null })
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <select
                      name="template"
                      className="w-full px-4 py-2 border rounded"
                      value={newSchedule.template?.id || ""}
                      onChange={(e) => {
                        const template = templates.find(
                          (t) => t.id === parseInt(e.target.value)
                        );
                        handleTemplateSelect(template);
                      }}
                    >
                      <option value="">Select a template</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                    {newSchedule.template && (
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <h3 className="font-medium mb-2">Message Preview</h3>
                          <div className="space-y-2">
                            {getPreviewText(
                              newSchedule.template,
                              newSchedule.templateInputs
                            ).map((text, index) => (
                              <div key={index} className="text-sm">
                                {text}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {getTemplateInputs(newSchedule.template).map(
                            (input, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <label className="w-24 text-sm text-gray-600">
                                  {input}:
                                </label>
                                <input
                                  type="text"
                                  className="flex-1 px-4 py-2 border rounded"
                                  value={
                                    newSchedule.templateInputs[index + 1] || ""
                                  }
                                  onChange={(e) =>
                                    setNewSchedule({
                                      ...newSchedule,
                                      templateInputs: {
                                        ...newSchedule.templateInputs,
                                        [index + 1]: e.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <input
                  type="datetime-local"
                  name="datetime"
                  className="w-full px-4 py-2 border rounded"
                  value={newSchedule.datetime}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, datetime: e.target.value })
                  }
                />
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                  {defaultGroups.map((group) => (
                    <label
                      key={group.id}
                      className="flex items-center space-x-2 p-1"
                    >
                      <input
                        type="checkbox"
                        checked={newSchedule.groups.includes(group.id)}
                        onChange={(e) => {
                          const updatedGroups = e.target.checked
                            ? [...newSchedule.groups, group.id]
                            : newSchedule.groups.filter(
                                (id) => id !== group.id
                              );
                          setNewSchedule({
                            ...newSchedule,
                            groups: updatedGroups,
                          });
                        }}
                      />
                      <span>{group.name}</span>
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
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <h2 className="text-xl font-bold mb-4">Edit Message Schedule</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Schedule Name"
                  className="w-full px-4 py-2 border rounded"
                  value={editSchedule.name}
                  onChange={(e) =>
                    setEditSchedule({
                      ...editSchedule,
                      name: e.target.value,
                    })
                  }
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  className="w-full px-4 py-2 border rounded h-32"
                  value={editSchedule.message}
                  onChange={(e) =>
                    setEditSchedule({
                      ...editSchedule,
                      message: e.target.value,
                    })
                  }
                />
                <input
                  type="datetime-local"
                  name="datetime"
                  className="w-full px-4 py-2 border rounded"
                  value={editSchedule.datetime}
                  onChange={(e) =>
                    setEditSchedule({
                      ...editSchedule,
                      datetime: e.target.value,
                    })
                  }
                />
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                  {defaultGroups.map((group) => (
                    <label
                      key={group.id}
                      className="flex items-center space-x-2 p-1"
                    >
                      <input
                        type="checkbox"
                        checked={editSchedule.groups.includes(group.id)}
                        onChange={(e) => {
                          const updatedGroups = e.target.checked
                            ? [...editSchedule.groups, group.id]
                            : editSchedule.groups.filter(
                                (id) => id !== group.id
                              );
                          setEditSchedule({
                            ...editSchedule,
                            groups: updatedGroups,
                          });
                        }}
                      />
                      <span>{group.name}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-[#4a9eff] text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this schedule?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSchedules(
                      schedules.filter((s) => s.id !== scheduleToDelete.id)
                    );
                    setShowDeleteModal(false);
                    setScheduleToDelete(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
