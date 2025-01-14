"use client";
import React from "react";

function ContactSearchBar({ value, onChange, className, placeholder }) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        name="search"
        placeholder={placeholder || "Search contacts by name or phone..."}
        className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:border-[#4a9eff]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
    </div>
  );
}

function ContactSearchBarStory() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchQueryCustom, setSearchQueryCustom] = React.useState("");

  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">With Custom Width</h3>
        <ContactSearchBar
          value={searchQueryCustom}
          onChange={setSearchQueryCustom}
          className="max-w-md"
        />
      </div>
    </div>
  );
}

export default ContactSearchBar;
