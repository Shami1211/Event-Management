import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/carts/');
        setCarts(response.data.carts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carts:', error);
        setError('Failed to fetch cart details');
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      total += parseFloat(cart.total);
    });
    setTotalAmount(total);
  }, [carts]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/carts/${id}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
      alert('Item removed from cart successfully.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

 

  return (
    <div className="carts-container">
      <h2 className="carts-header">Cart Details</h2>
      <div className="button-container">
        <Link to="/user-foods" className="add-new-button">
          Add New
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="carts-list">
          {carts.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div>
              {carts.map((cart) => (
                <div key={cart._id} className="cart-item">
                  <img src={cart.image} alt={cart.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{cart.name}</h3>
                    <p>Price: ${cart.price}</p>
                    <p>Quantity: {cart.qty}</p>
                    <p>Total: ${cart.total}</p>
                    <div className="cart-item-buttons">
                      <button onClick={() => handleRemoveFromCart(cart._id)}>Remove from Cart</button>
                      <Link to={`/update-cart/${cart._id}`}>
                        <button>Edit</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-amount">
                <h3>You have to pay: ${totalAmount.toFixed(2)}</h3>
              </div>
              <Link to="/add-delivery">
                <button>Checkout</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carts;
