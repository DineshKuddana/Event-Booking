const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST: Create new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, seats, eventTitle } = req.body;
    const newBooking = new Booking({ name, email, seats, eventTitle });
    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking", error });
  }
});

// GET: Fetch all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

// DELETE: Delete a booking (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});

module.exports = router;
