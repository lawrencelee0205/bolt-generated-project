"use client";
import React from "react";

function ContactItem({
  name = "",
  email = "",
  phone = "",
  status = "active",
  checked = false,
  onCheckboxChange = () => {},
}) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          name={`select-${name}`}
          checked={checked}
          onChange={onCheckboxChange}
          className="cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 font-roboto">{name}</td>
      <td className="px-6 py-4 font-roboto">{email}</td>
      <td className="px-6 py-4 font-roboto">{phone}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

function ContactItemStory() {
  const [checked1, setChecked1] = useState(false);

  return (
    <div className="p-4">
      <table className="w-full">
        <tbody>
          <ContactItem
            name="John Doe"
            email="john@example.com"
            phone="+1 234 567 8900"
            status="active"
            checked={checked1}
            onCheckboxChange={() => setChecked1(!checked1)}
          />
        </tbody>
      </table>
    </div>
  );
}

export default ContactItem;
