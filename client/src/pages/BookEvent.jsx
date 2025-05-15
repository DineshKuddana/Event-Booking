import { useState } from "react";
import "../styles/BookEvent.css";

const Event = ({ event }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    seats: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      eventTitle: event.title,
    };

    try {
      const res = await fetch("https://event-booking-pytb.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("Booking successful!");
        setFormData({ name: "", email: "", seats: 1 });
        setShowForm(false);
      } else {
        alert("Error submitting booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <button className="book-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Book Now"}
      </button>

      {showForm && (
        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="number"
            min="1"
            placeholder="Seats"
            required
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
          />
          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default Event;
