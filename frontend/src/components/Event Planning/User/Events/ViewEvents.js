import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data.events);
      } catch (error) {
        setAlertMessage('Error fetching events.'); // Display error message to the user
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events List</h1>
      {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
      {events.map((event) => (
        <div key={event._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{event.name}</h3>
          <img src={event.image} alt={event.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          <p>Venue: {event.venue}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Artist: {event.artist}</p>
          <p>About: {event.about}</p>
          <p>Time: {event.time} minutes</p>
          <p>Price: ${event.price}</p>
          <p>Remaining Time: {calculateRemainingTime(event.date)}</p>
          
        </div>
      ))}
    </div>
  );
};

const calculateRemainingTime = (eventDate) => {
  const currentTime = new Date();
  const difference = new Date(eventDate).getTime() - currentTime.getTime();
  const remainingMinutes = Math.floor(difference / (1000 * 60));
  const days = Math.floor(remainingMinutes / (60 * 24));
  const hours = Math.floor((remainingMinutes % (60 * 24)) / 60);
  const minutes = remainingMinutes % 60;
  return `${days} days, ${hours} hours, ${minutes} minutes`;
};

export default Events;
