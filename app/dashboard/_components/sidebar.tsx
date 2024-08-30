"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  HiOutlineHome,
  HiOutlineChatAlt2,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentReport,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiMenuAlt2,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiDocumentAdd,
} from "react-icons/hi";

const menuItems = [
  { icon: HiOutlineHome, name: "Dashboard", href: "/dashboard" },
  { icon: HiOutlineChatAlt2, name: "Chatbot", href: "/dashboard/chatbot" },
  { icon: HiDocumentAdd, name: "Document", href: "/dashboard/docs" },
  { icon: HiOutlineUserGroup, name: "Leads", href: "/dashboard/leads" },
  {
    icon: HiOutlineDocumentReport,
    name: "Reports",
    href: "/dashboard/reports",
  },
  { icon: HiOutlineChartBar, name: "Analytics", href: "/dashboard/analytics" },
  {
    icon: HiOutlineGlobeAlt,
    name: "Integrations",
    href: "/dashboard/integrations",
  },
  { icon: HiOutlineCog, name: "Settings", href: "/dashboard/settings" },
  { icon: HiOutlineQuestionMarkCircle, name: "Help", href: "/dashboard/help" },
];

export default function Sidebar({ isOpen, setIsOpen }: any) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        >
          {isOpen ? <HiChevronLeft size={24} /> : <HiChevronRight size={24} />}
        </button>
      )}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 ease-in-out z-10
          ${isOpen ? "w-64" : "w-16"} 
          ${isSmallScreen && !isOpen ? "-translate-x-full" : "translate-x-0"}`}
        onMouseEnter={() => !isSmallScreen && setIsHovered(true)}
        onMouseLeave={() => !isSmallScreen && setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-gray-100">
            <Image
              className={`h-8 ${isOpen ? "w-auto" : "w-8"}`}
              src="/logo.svg"
              alt="BotDrop AI"
              width={isOpen ? undefined : 32} 
              height={32} 
              layout={isOpen ? "intrinsic" : "fixed"}
            />
          </div>
          <nav className="flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  `}
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  <span
                    className={`${
                      isOpen || isHovered ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-200`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div
            className={`p-4 border-t text-xs text-center text-gray-600 ${
              !isOpen && isSmallScreen ? "hidden" : ""
            }`}
          >
            <p>© 2024 BotDrop AI</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}
