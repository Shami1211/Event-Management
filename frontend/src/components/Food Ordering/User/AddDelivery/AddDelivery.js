import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddDelivery() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/deliveries/', { location, time });
      alert('Delivery Added Successfully');
      navigate('/user-foods');
    } catch (error) {
      console.error('Error adding delivery:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h2>Add New Delivery</h2>
      <form onSubmit={handleSubmit}>
        <label>Location:</label>
        <input type="text" name="location" value={location} onChange={handleLocationChange} required />

        <label>Time:</label>
        <div>
          <input type="number" name="hours" placeholder="HH" min="0" max="23" onChange={handleTimeChange} required /> :
          <input type="number" name="minutes" placeholder="MM" min="0" max="59" onChange={handleTimeChange} required />
        </div>

        <br />
        <button type="submit">Add Delivery</button>
      </form>
      
    </div>
  );
}

export default AddDelivery;
