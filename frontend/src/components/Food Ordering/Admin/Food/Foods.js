import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Food = ({ food, onDelete }) => {
  const { _id, name, image, time, price, tag } = food;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/foods/${_id}`);
        onDelete(_id);
        alert('Food item deleted successfully.'); 
        window.location.reload();// Show alert after successful deletion
      } catch (error) {
       
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <img src={image} alt={name} style={{ width: '50px', height: '50px' }} />
      </td>
      <td>{time} minutes</td>
      <td>${price}</td>
      <td>{tag}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
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
       
        setAlertMessage('Error fetching food items.'); // Display error message to the user
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/foods/${id}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      window.location.reload();
    } catch (error) {
     
    }
  };

  return (
    <div>
      <h1>Food Items List</h1>
      {alertMessage && <div style={{ color: 'red' }}>{alertMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Preparation Time</th>
            <th>Price</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <Food key={food._id} food={food} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Foods;
