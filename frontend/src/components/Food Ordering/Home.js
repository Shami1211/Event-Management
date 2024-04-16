import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Taste Bite</h1>
      <div>
        <h2>Are you going to Add Food?(ADMIN)</h2>
        <Link to="/add-food">
          <button>Admin</button>
        </Link>
        <h2>Are you going to View foods?(USER)</h2>
        <Link to="/user-foods">
          <button>User</button>
        </Link>
      </div>
    </div>
  );
}
