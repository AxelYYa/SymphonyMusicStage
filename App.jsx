import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './src/Views/login';
import DriverPanel from './src/Views/DriverPanel';
import Tracking from './src/Views/Tracking';
import Catalog from './src/Views/Catalog';
import Register from './src/Views/Register';
import RegisterEmployee from './src/Views/RegisterEmployee';
import ProtectedRoute from './src/Components/ProtectedRoute';
import Home from './src/Views/Home';
import AdminDashboard from './src/Views/Admin/AdminDashboard';
import CreateProductsCategories from './src/Views/Admin/CreateProductsandCategory';
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