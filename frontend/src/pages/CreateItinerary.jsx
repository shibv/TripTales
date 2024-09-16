import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationSelector from '../components/itinerary/DestinationSelector';
import TripDetails from '../components/itinerary/TripDetails';
import PreferencesForm from '../components/itinerary/PreferencesForm';
import SpecialRequirements from '../components/itinerary/SpecialRequirements';
import { createItinerary } from '../services/Helper';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function CreateItinerary() {

  const { currentUser } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [itineraryData, setItineraryData] = useState({});
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (finalData) => {
    try {
      const fullData = { 
        ...itineraryData, 
        ...finalData,
        travelers: Number(itineraryData.travelers) // Ensure travelers is a number
      };
      console.log("Submitting itinerary data:", fullData);
      const response = await createItinerary(fullData, currentUser);
      toast.success('Itinerary created successfully!');
      navigate(`/itinerary/${response._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to create itinerary');
      console.error('Failed to create itinerary', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Your Itinerary</h2>
        {step === 1 && <DestinationSelector onNext={(data) => { setItineraryData({...itineraryData, ...data}); nextStep(); }} />}
        {step === 2 && <TripDetails onNext={(data) => { setItineraryData({...itineraryData, ...data}); nextStep(); }} onPrev={prevStep} />}
        {step === 3 && <PreferencesForm onNext={(data) => { setItineraryData({...itineraryData, ...data}); nextStep(); }} onPrev={prevStep} />}
        {step === 4 && <SpecialRequirements onSubmit={handleSubmit} onPrev={prevStep} />}
      </div>
    </div>
  );
}

export default CreateItinerary;