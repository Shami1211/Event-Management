import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    venue: '',
    date: '',
    artist: '',
    about: '',
    time: '',
    price: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        setEvent(response.data.event);
        setFormData(response.data.event);
        setLoading(false);
      } catch (error) {
        setError('Error fetching event details.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData, image: event.image };
      await axios.put(`http://localhost:5000/events/${id}`, updatedData);
      alert('Event updated successfully.');
      setEditMode(false);
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${event.name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/events/${id}`);
        alert('Event deleted successfully.');
        window.location.replace('/admin-events');
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  const { name, image, venue, date, artist, about, time, price } = formData;

  return (
    <div>
      <h1>{editMode ? 'Edit Event' : name}</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={handleChange} />
          </div>
          <div>
            <label>Image:</label>
            <input type="text" name="image" value={image} onChange={handleChange} />
          </div>
          <div>
            <label>Venue:</label>
            <input type="text" name="venue" value={venue} onChange={handleChange} />
          </div>
          <div>
            <label>Date:</label>
            <input type="text" name="date" value={date} onChange={handleChange} />
          </div>
          <div>
            <label>Artist:</label>
            <input type="text" name="artist" value={artist} onChange={handleChange} />
          </div>
          <div>
            <label>About:</label>
            <input type="text" name="about" value={about} onChange={handleChange} />
          </div>
          <div>
            <label>Time:</label>
            <input type="text" name="time" value={time} onChange={handleChange} />
          </div>
          <div>
            <label>Price:</label>
            <input type="text" name="price" value={price} onChange={handleChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <img src={image} alt={name} style={{ width: '300px', height: '300px' }} />
          <p>Venue: {venue}</p>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Artist: {artist}</p>
          <p>About: {about}</p>
          <p>Time: {time} minutes</p>
          <p>Price: ${price}</p>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <Link to={`/admin-events`}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEvent;
