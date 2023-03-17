/* eslint-disable import/order */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import LaneContents from 'components/LaneContents';

function Hello() {
  return <LaneContents />;
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
