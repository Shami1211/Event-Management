import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCartItem = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({
    name: '',
    image: '',
    time: '',
    price: '',
    tag: '',
    qty: 1,
    total: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/carts/${id}`);
        setItem(response.data.cart);
      } catch (error) {
        console.error('Error fetching cart item:', error);
        setError('Failed to fetch cart item details');
      }
    };

    fetchCartItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'qty' || name === 'price') {
      const totalPrice = parseFloat(value) * parseFloat(item.price);
      setItem((prevState) => ({
        ...prevState,
        total: totalPrice.toFixed(2),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/carts/${id}`, item);
      alert('Cart item updated successfully.');
      history('/view-cart');
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError('Failed to update cart item');
    }
  };

  return (
    <div className="edit-cart-item-container">
      <h2>Edit Cart Item</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={item.name} onChange={handleChange} readOnly />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={item.image} onChange={handleChange} readOnly />
        </div>
        <div>
          <label>Time:</label>
          <input type="number" name="time" value={item.time} onChange={handleChange} readOnly />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={item.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Tag:</label>
          <input type="text" name="tag" value={item.tag} onChange={handleChange} readOnly />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="qty" value={item.qty} onChange={handleChange} min="1" required />
        </div>
        <div>
          <label>Total:</label>
          <input type="text" name="total" value={item.total} readOnly />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCartItem;
