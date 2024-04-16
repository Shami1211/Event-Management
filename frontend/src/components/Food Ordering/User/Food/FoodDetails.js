import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [food, setFood] = useState(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/foods/${id}`);
        setFood(response.data.food);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Pass food details to AddToCart component
    navigate('/add-to-cart', { state: { food } });
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  const { name, image, time, price, tag } = food;

  return (
    <div>
      <h1>Food Details</h1>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h3>{name}</h3>
        <img src={image} alt={name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
        <p>Preparation Time: {time} minutes</p>
        <p>Price: ${price}</p>
        <p>Tag: {tag}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        {cartMessage && <div>{cartMessage}</div>}
      </div>
    </div>
  );
};

export default FoodDetails;
