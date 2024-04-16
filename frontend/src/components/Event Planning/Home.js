import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1></h1>
      <div>
        <h2>Are you going to Add Event?(ADMIN)</h2>
        <Link to="/add-event">
          <button>Admin</button>
        </Link>
        <h2>Are you going to View foods?(USER)</h2>
        <Link to="/user-events">
          <button>User</button>
        </Link>
      </div>
    </div>
  );
}
