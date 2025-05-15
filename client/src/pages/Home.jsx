// import React from "react";
import "../styles/Home.css";
import Event from "./BookEvent";

const eventsData = [
  {
    id: 1,
    title: "Tech Summit 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ITYXzTyh2Mw9K9Z7unyh1ZyN5HoQgi-Mfg&s",
    date: "2025-08-10",
    description: "Join the biggest tech event to explore innovation and future trends.",
  },
  {
    id: 2,
    title: "Music Fiesta",
    image: "https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=",
    date: "2025-09-05",
    description: "Experience live performances by top artists from around the world.",
  },
  {
    id: 3,
    title: "Startup Expo",
    image: "https://www.startuphubexpo.com/images/startup-banner-mobile-main.jpg",
    date: "2025-10-20",
    description: "Pitch your ideas, meet investors, and explore new ventures.",
  },
];

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Upcoming Events</h1>
      <div className="events-grid">
        {eventsData.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
