// pages/login.js
"use client";
import { auth, provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirect to the dashboard after login
    } catch (err) {
      setError('Failed to log in. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with Google</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
}
