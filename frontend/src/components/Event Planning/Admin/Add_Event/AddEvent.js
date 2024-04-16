import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEvent = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    image: '',
    venue: '',
    date: '',
    artist: '',
    about: '',
    time: '',
    price: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/events/', inputs);
      alert('Event added successfully.');
      navigate('/admin-events'); // Navigate to events page after successful submission
    } catch (error) {
      console.error('Error submitting event:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div className="event-container">
      <h2 className="event-header">Add New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label className="event-label">Name:</label>
          <input className="event-input" type="text" name="name" value={inputs.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Image URL:</label>
          <input className="event-input" type="text" name="image" value={inputs.image} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Venue:</label>
          <input className="event-input" type="text" name="venue" value={inputs.venue} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Date:</label>
          <input className="event-input" type="date" name="date" value={inputs.date} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Artist:</label>
          <input className="event-input" type="text" name="artist" value={inputs.artist} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">About:</label>
          <textarea className="event-input" name="about" value={inputs.about} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Time:</label>
          <input className="event-input" type="number" name="time" value={inputs.time} onChange={handleChange} required />
        </div>
        <div>
          <label className="event-label">Price:</label>
          <input className="event-input" type="number" name="price" value={inputs.price} onChange={handleChange} required />
        </div>
        {error && <p className="event-error-message">{error}</p>}
        <button className="event-add-btn" type="submit">Add New Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
