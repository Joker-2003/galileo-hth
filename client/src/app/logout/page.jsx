"use client";
import React, { Component } from 'react';
import { useRouter } from 'next/navigation'; // Use this for App Router
import { googleLogout } from '@/firebase';

export default function Logout() {
  const router = useRouter();
  googleLogout();

  const handleRedirectToLogin = () => {
    router.push('/loginGoogle'); // Redirect to your login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">You Have Logged Out</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for using our service. We hope to see you again soon!
        </p>
        <button
          onClick={handleRedirectToLogin}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
