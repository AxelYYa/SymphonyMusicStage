import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import DriverPanel from './src/pages/DriverPanel';
import Tracking from './src/pages/Tracking';
import Catalog from './src/pages/Catalog';
import Register from './src/pages/Register';
import RegisterEmployee from './src/pages/RegisterEmployee';
import ProtectedRoute from './src/Components/ProtectedRoute';
import PublicRoute from './src/Components/PublicRoute';
import Home from './src/pages/Home';
import AdminDashboard from './src/pages/Admin/AdminDashboard';
import Cart from './src/Components/Cart';
import '/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/registroempleado" element={<RegisterEmployee />} />
        <Route path="/repartidor" element={<DriverPanel />} />
        <Route path="/seguimiento" element={<Tracking />} />
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;