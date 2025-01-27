"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    // Redirect to login page
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Logo */}
        <h1 className="text-5xl font-bold text-blue-600 mb-8">
          INTVML
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to the platform for Machine Learning coding challenges.
        </p>
        {/* Login Button */}
        <button
          onClick={handleLoginRedirect}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </main>
  );
}
