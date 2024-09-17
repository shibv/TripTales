import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItinerary } from '../services/Helper';
import { useSelector } from 'react-redux';
import ItineraryMap from '../components/itinerary/ItineraryMap';

function ViewItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await getItinerary(id, currentUser);
        setItinerary(response.data);
      } catch (err) {
        setError('Failed to load itinerary');
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!itinerary) return <div className="text-center">No itinerary found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{itinerary.destination}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Start Date:</p>
            <p className="font-semibold">{new Date(itinerary.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">End Date:</p>
            <p className="font-semibold">{new Date(itinerary.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Travelers:</p>
            <p className="font-semibold">{itinerary.travelers}</p>
          </div>
          <div>
            <p className="text-gray-600">Budget:</p>
            <p className="font-semibold capitalize">{itinerary.budget}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {itinerary.interests.map((interest, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        {itinerary.specialRequirements && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Special Requirements</h3>
            <p className="text-gray-700">{itinerary.specialRequirements}</p>
          </div>
        )}
        
        {/* You can add more sections here as needed, such as a detailed day-by-day plan if that's part of your itinerary data */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Travel Route</h3>
          <ItineraryMap destinations={itinerary.locations} />
        </div>
      </div>
    </div>
  );
}

export default ViewItinerary;