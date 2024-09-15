import React, { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      travelStyle: 'Adventure',
      budget: 'Mid-range',
      interests: ['Hiking', 'Culture', 'Food']
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', user);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700">Travel Style</label>
            <select
              id="travelStyle"
              value={user.preferences.travelStyle}
              onChange={(e) => setUser({...user, preferences: {...user.preferences, travelStyle: e.target.value}})}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Adventure</option>
              <option>Relaxation</option>
              <option>Cultural</option>
              <option>Luxury</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;