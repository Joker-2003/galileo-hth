"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload"; // Assuming FileUpload is a custom component or imported

export function FileUploadDemo() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    // Filter the files to ensure only PDFs are handled
    const pdfFiles = uploadedFiles.filter((file) => file.type === "application/pdf");
    setFiles(pdfFiles);
    console.log(pdfFiles);
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg"
    >
      {/* Set the accept attribute to allow only PDF files */}
      <FileUpload onChange={handleFileUpload} accept=".pdf" />
    </div>
  );
}
