import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Food = ({ food, onDelete }) => {
  const { _id, name, image, time, price, tag } = food;


  return (
    <div>
      
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{name}</h3>
      <img src={image} alt={name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
      <p>Preparation Time: {time} minutes</p>
      <p>Price: ${price}</p>
      <p>Tag: {tag}</p>
      <Link to={`/food-details/${_id}`}>
        <button>View</button>
      </Link>
    </div>
    </div>
  );
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/foods');
        setFoods(response.data.foods);
      } catch (error) {
        // Handle error and provide feedback to the user
        console.error('Error fetching foods:', error);
        setAlertMessage('Error fetching food items.'); // Display error message to the user
      }
    };

    fetchFoods();
  }, []);

  

  return (
    <div>
        <Link to="/view-cart">
          <button>View CART</button>
        </Link>
      <h1>Food Items List</h1>
      {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {foods.map((food) => (
          <Food key={food._id} food={food}  />
        ))}
      </div>
    </div>
  );
};

export default Foods;
