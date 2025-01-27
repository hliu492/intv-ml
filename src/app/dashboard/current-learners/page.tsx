'use client';

import { useEffect, useState } from 'react';

interface Learner {
    email: string;
    // Other properties of the learner if applicable
  }

export default function CurrentLearnersPage() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await fetch('/api/mlleaners'); // API route to fetch learners
        if (!response.ok) {
          throw new Error('Failed to fetch learners');
        }
        console.log("holiu debug:", response)
        const data = await response.json();
        setLearners(data.data);
      } catch (error) {
        console.error('Failed to fetch learners:', error);
        setError('Failed to fetch learners');
      }
    };

    fetchLearners();
  }, []);

  console.log(learners);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Current Learners</h1>

      {error && (
        <div className="p-4 mb-4 text-white bg-red-500 rounded">
          Error: {error}
        </div>
      )}

      <div className="w-full max-w-4xl p-4 bg-white shadow rounded-lg">
        <ul>
          {learners.map((learner) => (
            <li
              key={learner.email}
              className="flex items-center justify-between p-4 mb-2 bg-gray-50 border rounded-lg hover:shadow-lg"
            >
              <span className="text-lg font-medium text-gray-700">
                {learner.email}
              </span>
            </li>
          ))}
        </ul>

        {learners.length === 0 && !error && (
          <p className="text-center text-gray-500">No learners found.</p>
        )}
      </div>
    </div>
  );
}
