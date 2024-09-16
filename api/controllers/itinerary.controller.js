import Itinerary from '../models/itinerary.model.js';
import { errorHandler } from '../utils/error.js';

export const createItinerary = async (req, res, next) => {
  try {
    
    const { destination, startDate, endDate, travelers, interests, budget, specialRequirements } = req.body;
    const newItinerary = new Itinerary({
      destination,
      startDate,
      endDate,
      travelers: Number(travelers),
      interests,
      budget,
      specialRequirements,
      userId: req.user.id
    });

    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    next(error);
  }
};

export const getItineraries = async (req, res, next) => {
  try {
    console.log(req.user , "User")

    const itineraries = await Itinerary.find({ userId: req.user.id }).populate('destination');
    console.log(itineraries , "Itineraries")
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
};

export const getItinerary = async (req, res, next) => {
  try {
    
    const itinerary = await Itinerary.findById(req.params.id).populate('destination');
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
  
    if (itinerary.userId.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only view your own itineraries'));
    }
    console.log(itinerary , "Itinerary")
    res.status(200).json(itinerary);
  } catch (error) {
    next(error);
  }
};

export const updateItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
    if (itinerary.user.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only update your own itineraries'));
    }
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItinerary);
  } catch (error) {
    next(error);
  }
};

export const deleteItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
    if (itinerary.user.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only delete your own itineraries'));
    }
    await Itinerary.findByIdAndDelete(req.params.id);
    res.status(200).json('Itinerary has been deleted');
  } catch (error) {
    next(error);
  }
};