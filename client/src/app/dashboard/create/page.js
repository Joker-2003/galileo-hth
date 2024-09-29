// pages/create-workspace.js
"use client";
import SexyNavbar from '@/components/built/navbar';
import { useState } from 'react';
import { ThemeProvider } from '@/components/context/themecontext';
import { useRouter } from 'next/navigation';
import { createWorkspace, sendSyllabus } from '@/api/api';

export default function CreateWorkspace() {
  const [workspaceName, setWorkspaceName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const router = useRouter(); // Initialize useRouter for navigation

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    if (selectedFile) {
      setFile(selectedFile);
      setError(''); // Clear error when file is selected
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]); // Only take the first file
      setError(''); // Clear error when files are dropped
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    let response = await createWorkspace(user.user_id, workspaceName); // Call the createWorkspace API
    if (!response) {
      setError('Failed to create workspace.');
      return;
    }
    let workspaceid = response.workspace_id;

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file); // Append the selected file to FormData
    formData.append('workspaceId', workspaceid); // Append the workspace ID

    // Send the PDF file using the sendSyllabus API
    let res = await sendSyllabus(formData);
    
    // Check if sending the syllabus was successful
    if (!res) {
      setError('Failed to send syllabus.');
      return;
    }

    // Optionally clear the form
    setWorkspaceName('');
    


    // const formData = new FormData();
    // formData.append('workspaceName', workspaceName);
    // formData.append('file', file); // Append the single file

    // // For debugging purposes, printing all form data
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ':', pair[1]);
    // }

    // Optionally clear the form
    setWorkspaceName('');
    setFile(null);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <>
      <ThemeProvider>
        <SexyNavbar />
        <div className="flex flex-col items-center p-6">
          <h1 className="text-2xl font-bold mb-6">Create Workspace</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex justify-center items-center mb-4 text-gray-500 hover:border-blue-500 transition duration-300"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="application/pdf"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-center"
              >
                Drag and drop a PDF file here or click to upload
              </label>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

            <div className="mb-4">
              <input
                type="text"
                placeholder="Workspace Name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                required
                className="border border-gray-300 dark:bg-neutral-800 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Create Workspace
            </button>
          </form>

          {/* Display Selected File */}
          {file && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Selected File:</h2>
              <p className="text-gray-700">{file.name}</p>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}
