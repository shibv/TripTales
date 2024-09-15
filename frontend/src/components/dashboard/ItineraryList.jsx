import React from 'react';
import { Link } from 'react-router-dom';

function ItineraryList() {
  // Mock data - replace with actual data from your state or API
  const itineraries = [
    { id: 1, name: 'Summer in Paris', date: '2023-07-15' },
    { id: 2, name: 'Tokyo Adventure', date: '2023-09-01' },
    { id: 3, name: 'New York City Trip', date: '2023-11-20' },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {itineraries.map((itinerary) => (
        <Link key={itinerary.id} to={`/itinerary/${itinerary.id}`} className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">{itinerary.name}</p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {itinerary.date}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ItineraryList;