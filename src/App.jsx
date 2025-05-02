import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import TaskPage1 from './tasks/TaskPage1';
import TaskDashboard from './pages/TaskDashboard';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Register />} />
     
      <Route path='/tasks1' element={<TaskPage1 />} />
      <Route path='/dashboard' element={<TaskDashboard />} />

    </Routes>
  </BrowserRouter>
);

export default App;