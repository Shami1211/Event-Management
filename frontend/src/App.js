// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//Home
import Home from './components/Event Planning/Home';
// Admin-Event Adding 
import AddEvent from './components/Event Planning/Admin/Add_Event/AddEvent';
import AdminEvents from './components/Event Planning/Admin/Event/Events';
import ViewEvent from './components/Event Planning/Admin/Event/ViewEvent';
import UserEvents from './components/Event Planning/User/Events/ViewEvents';



function App() {
  return (
    <div >
      <Router>
        <Routes>
          {/* Defult Home */}
        <Route exact path="/" element={<Home />} />

          {/* Admin-Event Adding Adding */}
          <Route exact path="/add-event" element={<AddEvent />} />
          <Route exact path="/admin-events" element={<AdminEvents />} />
          <Route exact path="/admin-events/:id" element={<ViewEvent />} />
         

          <Route exact path="/user-events" element={<UserEvents />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
