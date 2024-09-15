import Itinerary from '../models/itinerary.model.js';
import { errorHandler } from '../utils/error.js';

export const createItinerary = async (req, res, next) => {
  try {
    const newItinerary = new Itinerary({
      ...req.body,
      user: req.user.id,
    });
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    next(error);
  }
};

export const getItineraries = async (req, res, next) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id }).populate('destination');
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
};

export const getItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('destination');
    if (!itinerary) return next(errorHandler(404, 'Itinerary not found'));
    if (itinerary.user.toString() !== req.user.id) {
      return next(errorHandler(401, 'You can only view your own itineraries'));
    }
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