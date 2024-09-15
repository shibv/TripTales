import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  activities: [{
    day: Number,
    description: String,
    location: String,
  }],
  budget: Number,
  notes: String,
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;