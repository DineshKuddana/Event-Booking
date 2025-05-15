import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookings();
    }
  }, [isLoggedIn]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const hardcodedPassword = "admin123"; // change this to your password
    if (passwordInput === hardcodedPassword) {
      setIsLoggedIn(true);
      setPasswordInput("");
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setBookings([]);
  };

  // Extract unique event titles for filter dropdown
  const uniqueEvents = ["all", ...new Set(bookings.map((b) => b.eventTitle))];

  // Filter bookings based on selected event
  const filteredBookings =
    selectedEvent === "all"
      ? bookings
      : bookings.filter((b) => b.eventTitle === selectedEvent);

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {loginError && <p className="error-text">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="dashboard-header">
        <h1 className="admin-heading">Admin Dashboard</h1>

        <select
          className="filter-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          {uniqueEvents.map((event) => (
            <option key={event} value={event}>
              {event === "all" ? "All Events" : event}
            </option>
          ))}
        </select>

        <button className="back-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Name</th>
            <th>Email</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No bookings found.
              </td>
            </tr>
          ) : (
            filteredBookings.map((b) => (
              <tr key={b._id}>
                <td>{b.eventTitle}</td>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.seats}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
