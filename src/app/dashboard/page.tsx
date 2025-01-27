'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
          ML Dashboard
        </div>
        <nav className="mt-4">
          <Link
            href="/dashboard/ml-basics"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            ML Basics
          </Link>
          <Link
            href="/dashboard/ml-codings"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            ML Codings
          </Link>
          <Link
            href="/dashboard/current-learners"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Current Learners
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold text-black">Welcome to the ML Dashboard</h1>
        <p className="mb-4 text-3xl font-bold text-black">Select a topic from the sidebar to get started!</p>
      </main>
    </div>
  );
}
