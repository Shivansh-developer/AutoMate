import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Compare from './pages/Compare';
import SellVehicle from './pages/SellVehicle';
import Chatbot from './pages/Chatbot';
import VehicleDetail from './pages/VehicleDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/sell" element={<SellVehicle />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;