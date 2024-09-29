"use client"; // Ensure this is a client component
import { auth, provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for App Router
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      let res = await signInWithPopup(auth, provider);
      console.log(res);
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
      localStorage.setItem('userid', res.user.uid); // Store user ID in local storage
      localStorage.setItem('username', res.user.displayName); // Store username in local storage
      localStorage.setItem('email', res.user.email); // Store email in local storage
      localStorage.setItem('photoURL', res.user.photoURL); // Store photo URL in local storage

      //make req query to get user data
      router.push('/dashboard'); // Redirect to the dashboard after login
      return;
    } catch (err) {
      setError('Failed to log in. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login with Google</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Sign in with Google
          </button>
        </div>
        <footer className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} Galileo</p>
        </footer>
      </div>
    </div>
  );
}
