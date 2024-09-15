import React from 'react';
import { Link } from 'react-router-dom';

function ProfileSummary() {
  // Mock data - replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    tripsPlanned: 5
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h3>
      <div className="space-y-4">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Trips Planned:</span> {user.tripsPlanned}</p>
      </div>
      <Link to="/profile" className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
        Edit Profile
      </Link>
    </div>
  );
}

export default ProfileSummary;