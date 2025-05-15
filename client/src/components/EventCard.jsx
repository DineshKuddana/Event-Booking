import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{event.title}</h2>
      <p className="text-gray-500">{event.date}</p>
      <p className="mt-2">{event.description}</p>
      <Link to={`/book/${event.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default EventCard;
