"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // Icons for mobile toggle and dropdown
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import ThemeToggle from "./themetoggle";

const SexyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For profile dropdown

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white dark:bg-black border-b dark:border-neutral-800 w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black dark:text-white">
            Galileo
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href={"/dashboard/create"} ><HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>New Workspace</span>
            </HoverBorderGradient>
            </Link>
            
            <ThemeToggle />

            {/* Profile picture with dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={toggleDropdown}
              >
                <img
                  src="/profile-pic.jpg" // Add your profile picture URL or replace with a default avatar
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="w-4 h-4 text-black dark:text-white" />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border dark:border-neutral-800 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">
                        Profile
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/settings" className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">
                        Settings
                      </Link>
                    </li> */}
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
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
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

export default SexyNavbar;
