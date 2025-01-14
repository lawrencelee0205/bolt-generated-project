"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import FlowBlock from "@/components/flow-builder/FlowBlock";

function MainComponent() {
  const [flows, setFlows] = React.useState([]);
  const [selectedFlow, setSelectedFlow] = React.useState(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [newFlow, setNewFlow] = React.useState({
    name: "",
    isDefault: false,
    timeout: 300,
  });

  const handleCreateFlow = () => {
    if (newFlow.isDefault && flows.some((f) => f.isDefault)) {
      alert("Only one default flow is allowed");
      return;
    }
    const flow = {
      id: Date.now(),
      ...newFlow,
      blocks: [
        {
          id: "default",
          message: "Welcome! How can I help you today?",
          actions: [],
        },
      ],
    };
    setFlows([...flows, flow]);
    setSelectedFlow(null);
    setShowCreateModal(false);
    setNewFlow({
      name: "",
      isDefault: false,
      timeout: 300,
    });
  };

  const handleDeleteFlow = (flowId) => {
    setFlows(flows.filter((f) => f.id !== flowId));
    setSelectedFlow(null);
    setShowDeleteModal(false);
  };

  const handleBlockAdd = (flowId) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          blocks: [
            ...flow.blocks,
            {
              id: Date.now(),
              message: "",
              actions: [],
            },
          ],
        };
      }
      return flow;
    });
    setFlows(updatedFlows);
    setSelectedFlow(updatedFlows.find((f) => f.id === flowId));
  };

  const handleBlockDelete = (flowId, blockId) => {
    if (blockId === "default") return;
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          blocks: flow.blocks.filter((b) => b.id !== blockId),
        };
      }
      return flow;
    });
    setFlows(updatedFlows);
    setSelectedFlow(updatedFlows.find((f) => f.id === flowId));
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar activeItem="flow" />
      <div className="flex-1 flex">
        {flows.length > 0 && (
          <div className="w-[320px] border-r border-gray-200 bg-white">
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-[#4a9eff] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <i className="fas fa-plus mr-2"></i>Create Flow
              </button>
            </div>
            <div className="overflow-y-auto">
              {flows.map((flow) => (
                <div
                  key={flow.id}
                  onClick={() => setSelectedFlow(flow)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedFlow?.id === flow.id ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{flow.name}</span>
                    {flow.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex-1 p-0 overflow-y-auto relative">
          {flows.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
              >
                Create Your First Flow
              </button>
            </div>
          ) : selectedFlow ? (
            <div className="space-y-6">
              <div className="sticky top-0 bg-[#f5f5f5] p-6 z-10 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-bold">{selectedFlow.name}</h2>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFlow.isDefault}
                          onChange={(e) => {
                            const updatedFlow = {
                              ...selectedFlow,
                              isDefault: e.target.checked,
                            };
                            if (e.target.checked) {
                              const updatedFlows = flows.map((f) => ({
                                ...f,
                                isDefault: false,
                              }));
                              setFlows(
                                updatedFlows.map((f) =>
                                  f.id === selectedFlow.id ? updatedFlow : f
                                )
                              );
                            } else {
                              setFlows(
                                flows.map((f) =>
                                  f.id === selectedFlow.id ? updatedFlow : f
                                )
                              );
                            }
                            setSelectedFlow(updatedFlow);
                          }}
                        />
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Default
                        </span>
                      </label>
                      <button
                        onClick={() => {
                          const updatedFlows = flows.map((f) =>
                            f.id === selectedFlow.id ? selectedFlow : f
                          );
                          setFlows(updatedFlows);
                        }}
                        className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                      >
                        Save Flow
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBlockAdd(selectedFlow.id)}
                      className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Block
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete Flow
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  {selectedFlow.blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className="bg-white rounded-lg shadow p-6 mb-4"
                    >
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="font-medium">Block {index + 1}</h3>
                        {block.id !== "default" && (
                          <button
                            onClick={() =>
                              handleBlockDelete(selectedFlow.id, block.id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                      <FlowBlock
                        messageTemplate={block.message}
                        conditions={block.actions}
                        isEnabled={true}
                        onChange={({ messageTemplate, conditions }) => {
                          const updatedFlows = flows.map((flow) => {
                            if (flow.id === selectedFlow.id) {
                              const updatedBlocks = flow.blocks.map((b) =>
                                b.id === block.id
                                  ? {
                                      ...b,
                                      message: messageTemplate,
                                      actions: conditions,
                                    }
                                  : b
                              );
                              return { ...flow, blocks: updatedBlocks };
                            }
                            return flow;
                          });
                          setFlows(updatedFlows);
                          setSelectedFlow(
                            updatedFlows.find((f) => f.id === selectedFlow.id)
                          );
                        }}
                        blockOptions={selectedFlow.blocks.map((b, i) => ({
                          id: b.id,
                          name: `Block ${i + 1}`,
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a flow to view details
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Create Flow</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Flow Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={newFlow.name}
                onChange={(e) =>
                  setNewFlow({ ...newFlow, name: e.target.value })
                }
              />
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Time to wait before marking conversation as inactive (seconds)
                </label>
                <input
                  type="number"
                  name="timeout"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newFlow.timeout}
                  onChange={(e) =>
                    setNewFlow({
                      ...newFlow,
                      timeout: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newFlow.isDefault}
                  onChange={(e) =>
                    setNewFlow({ ...newFlow, isDefault: e.target.checked })
                  }
                />
                <span>Set as default flow</span>
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFlow}
                  className="px-4 py-2 bg-[#4a9eff] text-white rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Delete Flow</h2>
            <p>Are you sure you want to delete this flow?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteFlow(selectedFlow.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;
