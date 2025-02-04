import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './src/pages/login';
import DriverPanel from './src/pages/DriverPanel';
import Tracking from './src/pages/Tracking';
import Catalog from './src/pages/Catalog';
import Register from './src/pages/Register';
import RegisterEmployee from './src/pages/RegisterEmployee';
import ProtectedRoute from './src/Components/ProtectedRoute';
import Home from './src/pages/Home';
import AdminDashboard from './src/pages/Admin/AdminDashboard';
import CreateProductsCategories from './src/pages/Admin/CreateProductsandCategory';
import '/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/registroempleado" element={<RegisterEmployee />} />
        <Route path="/repartidor" element={<DriverPanel />} />
        <Route path="/seguimiento" element={<Tracking />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/admin/createproducts" element={<CreateProductsCategories />} />
      </Routes>
    </Router>
  );
}

export default App;