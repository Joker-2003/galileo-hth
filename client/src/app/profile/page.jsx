"use client"; // Ensure this is a client component
import SexyNavbar from "@/components/built/navbar";
import { ThemeProvider } from "@/components/context/themecontext";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // For the pencil icon

export default function Profile() {
  const [userData, setUserData] = useState({
    userId: "123456",
    email: "user@example.com",
    displayName: "John Doe",
    occupation: "Software Engineer",
    job: "Frontend Developer",
  });

  const [editableField, setEditableField] = useState(null);

  const handleEdit = (field) => {
    setEditableField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    console.log(userData);
    // Send userData as JSON to the backend
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile.");
      }
      alert("Profile updated successfully!");
      setEditableField(null); // Exit edit mode after saving
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the profile.");
    }
  };

  return (
    <>
      <ThemeProvider>
        <SexyNavbar />
        <div className="flex flex-col items-center justify-center min-h-screen b">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md transition-transform transform hover:scale-105">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              User Profile
            </h1>

			   {/* Display Image */}
			   <div className="mb-6 flex justify-center">
              <div className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden">
                <img src="/path/to/profile-image.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>


            {/* Display User ID */}
            <div className="mb-4">
              <span className="font-semibold">User ID:</span> {userData.userId}
            </div>

            {/* Display Email */}
            <div className="mb-4">
              <span className="font-semibold">Email:</span> {userData.email}
            </div>

         
            {/* Editable Fields */}
            {["displayName", "occupation", "job"].map((field) => (
              <div className="flex items-center mb-4" key={field}>
                <span className="font-semibold capitalize text-lg">{field}:</span>
                {editableField === field ? (
                  <input
                    type="text"
                    name={field}
                    value={userData[field]}
                    onChange={handleChange}
                    className="ml-2 borderdark:text-white dark:bg-neutral-800   border-gray-300 dark:border-gray-600 rounded-md p-2 flex-grow transition duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="ml-2 text-lg">{userData[field]}</span>
                )}
                <button onClick={() => handleEdit(field)} className="ml-2 text-blue-500 hover:text-blue-700 transition duration-300">
                  <FaEdit />
                </button>
              </div>
            ))}

            {/* Save Button */}
            {editableField && (
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
