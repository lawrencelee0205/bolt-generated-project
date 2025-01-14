"use client";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faInbox,
  faChartLine,
  faDiagramProject,
  faBullhorn,
  faMessage,
  faGear,
  faArrowRightFromBracket,
  faQuestionCircle, // Fallback icon
} from '@fortawesome/free-solid-svg-icons';

function Sidebar({ collapsed = false, activeItem = "" }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const mainMenuItems = [
    { id: "inbox", icon: faInbox, text: "Inbox", link: "/inbox" },
    { id: "contacts", icon: faUser, text: "Contacts", link: "/contacts" },
    { id: "crm", icon: faChartLine, text: "CRM", link: "/crm" },
    { id: "flow", icon: faDiagramProject, text: "Flow Builder", link: "/flow-builder" },
    { id: "blast", icon: faBullhorn, text: "Broadcast", link: "/broadcast" },
    { id: "hsm", icon: faMessage, text: "HSM", link: "/hsm" },
  ];

  const bottomMenuItems = [
    { id: "settings", icon: faGear, text: "Settings", link: "/settings" },
    { id: "logout", icon: faArrowRightFromBracket, text: "Logout", link: "/logout" },
  ];

  return (
    <div
      className={`h-screen bg-[#1a1a1a] text-[#9B9B9B] transition-all duration-300 relative ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faMessage} className="text-white text-xl" />
          {!isCollapsed && (
            <span className="ml-2 text-white font-medium">ChatHub</span>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-[#1a1a1a] w-6 h-6 rounded-full flex items-center justify-center hover:text-white"
      >
        <FontAwesomeIcon
          icon={isCollapsed ? "chevron-right" : "chevron-left"}
          className="text-xs"
        />
      </button>

      <div className="flex flex-col h-[calc(100%-80px)] justify-between">
        <nav className="px-2">
          {mainMenuItems.map((item) => {
            console.log(item.icon); // Debugging: Check the icon value
            return (
              <a
                target="_self"
                key={item.id}
                href={item.link}
                className={`
                  w-full flex items-center p-3 mb-1 rounded-lg cursor-pointer
                  transition-colors duration-200 font-medium
                  ${
                    activeItem === item.id
                      ? "bg-[#2D68FE] text-white"
                      : "hover:text-white"
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={item.icon || faQuestionCircle} // Fallback to a default icon
                  className={isCollapsed ? "text-lg" : ""}
                />
                {!isCollapsed && <span className="ml-3">{item.text}</span>}
              </a>
            );
          })}
        </nav>

        <div className="px-2">
          {bottomMenuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className={`
                w-full flex items-center p-3 mb-1 rounded-lg cursor-pointer
                transition-colors duration-200 font-medium
                ${
                  activeItem === item.id
                    ? "bg-[#2D68FE] text-white"
                    : "hover:text-white"
                }
              `}
            >
              <FontAwesomeIcon
                icon={item.icon || faQuestionCircle} // Fallback to a default icon
                className={isCollapsed ? "text-lg" : ""}
              />
              {!isCollapsed && <span className="ml-3">{item.text}</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarStory() {
  return (
    <div className="flex">
      <Sidebar collapsed={false} activeItem="inbox" />
    </div>
  );
}

export default Sidebar;
