import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaUserCircle, FaPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-center">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function Home() {
  const {currentUser} = useSelector((state) => state.user)

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Your Personal Travel Planner
      </h1>
      <p className="text-xl text-white mb-8">
        Create custom itineraries tailored to your preferences and budget
      </p>

      <Link to={`${currentUser ? "/create-itinerary" : "/login"}`} className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full text-xl font-bold hover:bg-yellow-300 transition duration-300">
        Start Planning
      </Link>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<FaMapMarkedAlt className="text-5xl mb-4 text-yellow-400" />}
          title="Personalized Itineraries"
          description="Get custom travel plans based on your interests and preferences"
        />
        <FeatureCard 
          icon={<FaUserCircle className="text-5xl mb-4 text-yellow-400" />}
          title="User-Friendly Interface"
          description="Easy-to-use platform for seamless trip planning"
        />
        <FeatureCard 
          icon={<FaPlane className="text-5xl mb-4 text-yellow-400" />}
          title="Destination Insights"
          description="Discover hidden gems and popular attractions at your chosen locations"
        />
      </div>
    </div>
  );
}

export default Home;