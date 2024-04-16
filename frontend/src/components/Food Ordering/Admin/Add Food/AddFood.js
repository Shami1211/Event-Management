import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './AddStock.css'; // Import your CSS file

const AddStock = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    image: '',
    time: '',
    price: '',
    tag: '',
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
      await axios.post('http://localhost:5000/foods/', inputs);
      alert('Food item added successfully.');
      history('/admin-foods'); // Navigate to foods page after successful submission
    } catch (error) {
      console.error('Error submitting food:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div className="food-container">
      <h2 className="food-header">Add New Food Item</h2>
      <form className="food-form" onSubmit={handleSubmit}>
        <div>
          <label className="food-label">Name:</label>
          <input className="food-input" type="text" name="name" value={inputs.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="food-label">Image URL:</label>
          <input className="food-input" type="text" name="image" value={inputs.image} onChange={handleChange} required />
        </div>
        <div>
          <label className="food-label">Preparation Time (minutes):</label>
          <input className="food-input" type="number" name="time" value={inputs.time} onChange={handleChange} required />
        </div>
        <div>
          <label className="food-label">Price:</label>
          <input className="food-input" type="number" name="price" value={inputs.price} onChange={handleChange} required />
        </div>
        <div>
          <label className="food-label">Tag:</label>
          <input className="food-input" type="text" name="tag" value={inputs.tag} onChange={handleChange} required />
        </div>
        {error && <p className="food-error-message">{error}</p>}
        <button className="food-add-btn" type="submit">Add New Food</button>
      </form>
    </div>
  );
};

export default AddStock;
