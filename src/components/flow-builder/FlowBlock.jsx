"use client";
import React from "react";

function FlowBlock({
  messageTemplate = "",
  conditions = [],
  isEnabled = false,
  onChange,
  blockId,
  blockOptions = [],
}) {
  const [localTemplate, setLocalTemplate] = React.useState(messageTemplate);
  const [localConditions, setLocalConditions] = React.useState(conditions);
  const [draggedItem, setDraggedItem] = React.useState(null);

  const handleAddCondition = () => {
    setLocalConditions([
      ...localConditions,
      { keyword: "", nextBlock: "", id: Date.now() },
    ]);
  };

  const handleRemoveCondition = (id) => {
    setLocalConditions(localConditions.filter((c) => c.id !== id));
  };

  const handleChange = () => {
    if (onChange) {
      onChange({
        messageTemplate: localTemplate,
        conditions: localConditions,
      });
    }
  };

  const updateCondition = (id, field, value) => {
    const updatedConditions = localConditions.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setLocalConditions(updatedConditions);
    onChange?.({
      messageTemplate: localTemplate,
      conditions: updatedConditions,
    });
  };

  const handleDragStart = (e, condition) => {
    setDraggedItem(condition);
    e.dataTransfer.setData("text/plain", JSON.stringify(condition));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("bg-blue-50");
  };

  const handleDrop = (e, targetCondition) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50");

    if (draggedItem && draggedItem.id !== targetCondition.id) {
      const reorderedConditions = localConditions.map((c) => {
        if (c.id === draggedItem.id) return targetCondition;
        if (c.id === targetCondition.id) return draggedItem;
        return c;
      });

      setLocalConditions(reorderedConditions);
      onChange?.({
        messageTemplate: localTemplate,
        conditions: reorderedConditions,
      });
    }
    setDraggedItem(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6 space-y-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2 font-roboto">
            Message Template
          </label>
          <textarea
            name="messageTemplate"
            value={localTemplate}
            onChange={(e) => {
              setLocalTemplate(e.target.value);
              handleChange();
            }}
            className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-roboto"
            placeholder="Enter message template that will be shown to the contact"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="font-medium text-gray-700 font-roboto">
              Input Evaluation Rules
            </label>
            <button
              onClick={handleAddCondition}
              className="px-3 py-1 text-sm bg-[#4a9eff] text-white rounded hover:bg-blue-600"
            >
              <i className="fas fa-plus mr-1"></i>Add Rule
            </button>
          </div>
          <div className="space-y-4">
            {localConditions.map((condition) => (
              <div
                key={condition.id}
                draggable
                onDragStart={(e) => handleDragStart(e, condition)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, condition)}
                className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border-2 border-transparent hover:border-[#4a9eff] transition-colors duration-200 cursor-move"
              >
                <div className="flex-none text-gray-400">
                  <i className="fas fa-grip-vertical"></i>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="keyword"
                    value={condition.keyword}
                    onChange={(e) =>
                      updateCondition(condition.id, "keyword", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-roboto"
                    placeholder="If contact input contains..."
                  />
                </div>
                <div className="flex-1">
                  <select
                    name="nextBlock"
                    value={condition.nextBlock}
                    onChange={(e) =>
                      updateCondition(condition.id, "nextBlock", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-roboto"
                  >
                    <option value="">Select next block...</option>
                    {blockOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleRemoveCondition(condition.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowBlockStory() {
  const handleChange = (values) => {
    console.log("Values changed:", values);
  };

  const sampleConditions = [
    {
      id: 1,
      keyword: "help",
      nextBlock: "support_block",
    },
    {
      id: 2,
      keyword: "pricing",
      nextBlock: "pricing_flow",
    },
  ];

  const blockOptions = [
    { id: "support_block", name: "Support Block" },
    { id: "pricing_flow", name: "Pricing Flow" },
    { id: "faq_block", name: "FAQ Block" },
  ];

  return (
    <div className="p-4 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Default Flow Block</h2>
        <FlowBlock
          messageTemplate="Hello, how can I assist you today?"
          conditions={sampleConditions}
          onChange={handleChange}
          blockOptions={blockOptions}
        />
      </div>
    </div>
  );
}

export default FlowBlock;
