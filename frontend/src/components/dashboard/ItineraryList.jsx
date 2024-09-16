import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getItineraries } from '../../services/Helper';
import { useSelector } from 'react-redux';

function ItineraryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await getItineraries(currentUser);
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
        setError('Failed to load itineraries');
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <Link key={itinerary._id} to={`/itinerary/${itinerary._id}`} className="block hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{itinerary.destination}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Travelers: {itinerary.travelers}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    Budget: {itinerary.budget}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Interests: {itinerary.interests.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center py-4"> 
          <p>No itineraries found</p>
        </div>
      )}
    </div>
  );
}

export default ItineraryList;