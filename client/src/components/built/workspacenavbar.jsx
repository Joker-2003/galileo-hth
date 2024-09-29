"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // Icons for mobile toggle and dropdown
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import ThemeToggle from "./themetoggle";
import { useRouter } from "next/navigation"; // Import useRouter hook

// Sample data for workspaces
const workspaces = [
  {
    workspaceId: 1234,
    workspaceName: "Frontend Development",
  },
  {
    workspaceId: 5678,
    workspaceName: "Machine Learning Basics",
  },
  // Add more workspaces if needed
];

const WorkspaceNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false); // For workspace dropdown
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // For profile dropdown
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]); // Default workspace
  const router = useRouter(); // Initialize useRouter

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleWorkspaceDropdown = () => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleWorkspaceSwitch = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsWorkspaceDropdownOpen(false); // Close dropdown after selecting
    router.push(`/dashboard/${workspace.workspaceId}`); // Navigate to the selected workspace
  };

  return (
    <nav className="bg-white dark:bg-black border-b dark:border-neutral-800 w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-xl font-bold text-black dark:text-white">
            Galileo
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Workspace dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleWorkspaceDropdown}
              >
                <span>{selectedWorkspace.workspaceName}</span>
                <ChevronDown className="w-4 h-4 text-black dark:text-white" />
              </button>

              {/* Dropdown for workspaces */}
              {isWorkspaceDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-black border dark:border-neutral-800 rounded-md shadow-lg">
                  <ul className="py-1">
                    {workspaces.map((workspace) => (
                      <li key={workspace.workspaceId}>
                        <button
                          className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 w-full text-left"
                          onClick={() => handleWorkspaceSwitch(workspace)}
                        >
                          {workspace.workspaceName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ThemeToggle />

            {/* Profile picture with dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleProfileDropdown}
              >
                <img
                  src="/profile-pic.jpg" // Add your profile picture URL or replace with a default avatar
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-black dark:text-white" />
              </button>

              {/* Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border dark:border-neutral-800 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/logout" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-black dark:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t dark:border-neutral-800">
          <div className="flex flex-col items-center space-y-4 py-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>New Workspace</span>
            </HoverBorderGradient>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default WorkspaceNavbar;
