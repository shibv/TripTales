import React from 'react';
import { Link } from 'react-router-dom';
import ItineraryList from '../components/dashboard/ItineraryList';


function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-3">
        <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-bold text-white">Your Itineraries</h2>
          <Link to="/create-itinerary" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition duration-300 shadow-lg transform hover:scale-105">
            Create New Itinerary
          </Link>
        </div>
        <div className=" p-4 rounded-lg shadow-md">
          <ItineraryList />
        </div>
      </div>
      {/* <div>
        <ProfileSummary />
      </div> */}
    </div>
  );
}

export default Dashboard;