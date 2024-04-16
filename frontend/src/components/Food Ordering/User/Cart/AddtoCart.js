import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const history = useNavigate();
  const location = useLocation();
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
    if (location.state && location.state.food) {
      const { name, image, time, price, tag } = location.state.food;
      setItem({
        ...item,
        name,
        image,
        time,
        price,
        tag,
      });
    }
  }, [location.state.food]);

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
    console.log('Submitting form...');
    try {
      await axios.post('http://localhost:5000/carts/', item);
      alert('Item added to cart successfully.');
      history('/view-cart');
    } catch (error) {
      alert('Error adding item to cart:', error);
     
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add to Cart</h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <div>
          <label className="cart-label">Name:</label>
          <input className="cart-input" type="text" name="name" value={item.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="cart-label">Image URL:</label>
          <input className="cart-input" type="text" name="image" value={item.image} onChange={handleChange} required />
        </div>
        <div>
          <label className="cart-label">Time:</label>
          <input className="cart-input" type="number" name="time" value={item.time} onChange={handleChange} required />
        </div>
        <div>
          <label className="cart-label">Price:</label>
          <input className="cart-input" type="number" name="price" value={item.price} onChange={handleChange} required />
        </div>
        <div>
          <label className="cart-label">Tag:</label>
          <input className="cart-input" type="text" name="tag" value={item.tag} onChange={handleChange} required />
        </div>
        <div>
          <label className="cart-label">Quantity:</label>
          <input className="cart-input" type="number" name="qty" value={item.qty} onChange={handleChange} min="1" required />
        </div>
        <div>
          <label className="cart-label">Total:</label>
          <input className="cart-input" type="text" name="total" value={item.total} readOnly />
        </div>
        {error && <p className="cart-error-message">{error}</p>}
        <button className="cart-add-btn" type="submit">Add to Cart</button>
      </form>
    </div>
  );
};

export default AddToCart;
