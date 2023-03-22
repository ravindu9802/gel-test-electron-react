/* eslint-disable import/order */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import Menu from './Menu';

function Hello() {
  return <Menu />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
