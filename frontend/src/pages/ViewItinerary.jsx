import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItinerary } from '../services/Helper';

function ViewItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await getItinerary(id);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{itinerary.name}</h2>
        <p className="text-gray-600 mb-4">Destination: {itinerary.destination}</p>
        <p className="text-gray-600 mb-4">Dates: {itinerary.startDate} - {itinerary.endDate}</p>
        <h3 className="text-2xl font-semibold mb-4">Daily Plan</h3>
        {itinerary.days.map((day, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Day {index + 1}</h4>
            <ul className="list-disc list-inside">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="mb-2">{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewItinerary;