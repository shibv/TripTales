import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ItineraryMap from '../components/itinerary/ItineraryMap';
import { createItinerary } from '../services/Helper';
import toast from 'react-hot-toast';
import DestinationSelector from '../components/itinerary/DestinationSelector';
import TripDetails from '../components/itinerary/TripDetails'
import PreferencesForm from '../components/itinerary/PreferencesForm'
import SpecialRequirements from '../components/itinerary/SpecialRequirements'


// Sample locations (this could be fetched from an API)
const allLocationOptions = [
  { value: { lat: 40.7128, lng: -74.0060 }, label: 'New York, USA' },
  { value: { lat: 34.0522, lng: -118.2437 }, label: 'Los Angeles, USA' },
  { value: { lat: 51.5074, lng: -0.1278 }, label: 'London, UK' },
  { value: { lat: 48.8566, lng: 2.3522 }, label: 'Paris, France' },
  { value: { lat: 35.6762, lng: 139.6503 }, label: 'Tokyo, Japan' },
  // Add more locations as needed
];

function CreateItinerary() {
  const [step, setStep] = useState(1);
  const [itineraryData, setItineraryData] = useState({ locations: [], destination: null });
  const [selectedLocations, setSelectedLocations] = useState([]);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions);
    setItineraryData((prevData) => ({
      ...prevData,
      locations: selectedOptions.map(option => ({
        name: option.label,
        location: option.value
      }))
    }));
  };

  const handleSubmit = async (finalData) => {
    try {
      const fullData = {
        ...itineraryData,
        ...finalData,
        travelers: Number(itineraryData.travelers) // Ensure travelers is a number
      };
      console.log("Submitting itinerary data:", fullData);
      const response = await createItinerary(fullData);
      toast.success('Itinerary created successfully!');
      navigate(`/itinerary/${response.data._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create itinerary');
      console.error('Failed to create itinerary', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Itinerary</h2>

        {/* Location Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Locations</label>
          <Select
            options={allLocationOptions}
            isMulti
            onChange={handleLocationChange}
            placeholder="Select multiple locations..."
          />
        </div>

        {/* Destination Selection from Selected Locations */}
        {step === 1 && selectedLocations.length >= 0 && (
          <DestinationSelector 
            selectedLocations={selectedLocations} 
            onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} 
          />
        )}

        {/* Display selected locations on the map */}
        

        {/* Steps for Trip Details, Preferences, and Special Requirements */}
        {step === 2 && <TripDetails onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} onPrev={prevStep} />}
        {step === 3 && <PreferencesForm onNext={(data) => { setItineraryData({ ...itineraryData, ...data }); nextStep(); }} onPrev={prevStep} />}
        {step === 4 && <SpecialRequirements onSubmit={handleSubmit} onPrev={prevStep} />}
        <ItineraryMap destinations={itineraryData.locations} />
      </div>
    </div>
  );
}

export default CreateItinerary;