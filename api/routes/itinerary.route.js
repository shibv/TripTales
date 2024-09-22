import express from 'express';
import { createItinerary, getItineraries, getItinerary, updateItinerary, deleteItinerary } from '../controllers/itinerary.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.post("/create", verifyToken, createItinerary);
router.get("/all/:id", getItineraries);
router.get("/:id", verifyToken, getItinerary);
router.put("/:id", verifyToken, updateItinerary);
router.delete("/:id", verifyToken, deleteItinerary);

export default router;