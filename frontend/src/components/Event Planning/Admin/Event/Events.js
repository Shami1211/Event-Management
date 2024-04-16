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

  const Event = ({ event }) => {
    const { _id, name, image, venue, date, artist, about, time, price } = event;
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
      calculateRemainingTime();
    }, []);

    const calculateRemainingTime = () => {
      const eventDate = new Date(date);
      const currentTime = new Date();
      const difference = eventDate.getTime() - currentTime.getTime();
      const remainingMinutes = Math.floor(difference / (1000 * 60));
      const days = Math.floor(remainingMinutes / (60 * 24));
      const hours = Math.floor((remainingMinutes % (60 * 24)) / 60);
      const minutes = remainingMinutes % 60;
      setRemainingTime(`${days} days, ${hours} hours, ${minutes} minutes`);
    };

    return (
      <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>
          <img src={image} alt={name} style={{ width: '50px', height: '50px' }} />
        </td>
        <td>{venue}</td>
        <td>{new Date(date).toLocaleDateString()}</td>
        <td>{artist}</td>
        <td>{about}</td>
        <td>{time} minutes</td>
        <td>${price}</td>
        <td>{remainingTime}</td>
        <td>
          <Link to={`/admin-events/${_id}`}>
            <button>View</button>
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Events List</h1>
      {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Artist</th>
            <th>About</th>
            <th>Time</th>
            <th>Price</th>
            <th>Remaining Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
