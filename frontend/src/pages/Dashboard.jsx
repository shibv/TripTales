import React from 'react';
import { Link } from 'react-router-dom';
import ItineraryList from '../components/dashboard/ItineraryList';
import ProfileSummary from '../components/dashboard/ProfileSummary';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold text-white mb-6">Your Itineraries</h2>
        <ItineraryList />
        <Link to="/create-itinerary" className="mt-4 inline-block bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition duration-300">
          Create New Itinerary
        </Link>
      </div>
      <div>
        <ProfileSummary />
      </div>
    </div>
  );
}

export default Dashboard;